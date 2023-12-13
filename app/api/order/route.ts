import connectMongoDb from "@/lib/mongodb";
import OrderModel from "@/models/order";
import { NextRequest, NextResponse } from "next/server";
import HandleError from "@/middleware/handleError";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await OrderModel.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

// get all order
export const GET = async () => {
  try {
    // Connect to MongoDB
    await connectMongoDb();

    // Fetch all orders
    const result = await OrderModel.find();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET (OrderModel):", error);
    // return ErrorMiddleware(error)
  }
};
