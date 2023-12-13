import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import CartModel from "@/models/cart";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await CartModel.create(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async () => {
  try {
    await connectMongoDb();

    const cart = await CartModel.find({});
    console.log(cart);
    // console.log(user);

    return NextResponse.json(cart);
  } catch (error) {
    console.error("Error in GET (CartModel):", error);
    return HandleError(error);
  }
};