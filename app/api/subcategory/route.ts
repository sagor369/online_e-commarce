import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import SubCategory from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await SubCategory.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();
    const result = await SubCategory.find();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET:", error);
    return HandleError(error)
  }
};
