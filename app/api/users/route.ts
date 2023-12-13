import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Users from "@/models/user";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Connect to MongoDB
    await connectMongoDb();

    // Check if the email already exists
    const existingUser = await Users.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create a new user
    const newUser = new Users({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      phoneNumber: body.phoneNumber,
    });

    // Save the user to the database
    const result = await newUser.save();

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error in POST:", error);
    return HandleError(error);
  }
};

// export const GET = async () => {
//   try {
//     // Connect to MongoDB
//     await connectMongoDb();

//     // Fetch all users
//     const users = await Users.find();

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error in GET:", error);
//     return HandleError(error);
//   }
// };

const getUserByEmail = async (email: string) => {
  await connectMongoDb();
  return Users.findOne({ email });
};

export const GET = async (req: Request) => {
  connectMongoDb();
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("email");
  const activeOnly = searchParams.get("active") === "true";
  const newOnly = searchParams.get("new") === "true";
  try {
    if (userEmail) {
      const user = await getUserByEmail(userEmail);
      if (!user) return NextResponse.json({ error: "User not found" });

      return NextResponse.json({ success: true, user });
    }

    let query: any = {};
    if (activeOnly) {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      query.updatedAt = { $gte: thirtyDaysAgo };

      const users = await Users.find(query);

      return NextResponse.json(users, { status: 200 });
    }

    if (newOnly) {
      const twentyFourHoursAgo = new Date();
      twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
      query.createdAt = { $gte: twentyFourHoursAgo };
      const users = await Users.find(query);
      return NextResponse.json(users, {status: 200})
    }


    const user = await Users.find();
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};
