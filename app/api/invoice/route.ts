import connectMongoDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import HandleError from "@/middleware/handleError";
import Invoice from "@/models/invoice";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await Invoice.create(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();
    const result = await Invoice.find().sort({ createdAt: 1 });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET (Invoice):", error);
    return HandleError(error);
  }
};
