import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import ContactUs from "@/models/contactUs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
     await ContactUs.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();
    const result = await ContactUs.find();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET (ContactUs):", error);
    return HandleError(error);
  }
};
