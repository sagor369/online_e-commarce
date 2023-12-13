import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Faq from "@/models/faq";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    const result = await Faq.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();
    const result = await Faq.find();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET (Faq):", error);
    return HandleError(error);
  }
};
