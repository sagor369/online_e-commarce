import connectMongoDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import HandleError from "@/middleware/handleError";
import Footer from "@/models/footer";
import { getSession } from "next-auth/react";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await Footer.create(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();
    // const session = await getSession();

    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const result = await Footer.find();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET (OrderModel):", error);
    return HandleError(error);
  }
};
