import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import CartModel from "@/models/cart";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const CartDetails = await CartModel.findOne({ _id: id });
    if (!CartDetails) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }
    return NextResponse.json({ CartModel: CartDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

// delete CartModel
export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedOrder = await CartModel.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Cart item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return HandleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const reqBody = await req.json();

    const id = params?.id;
    const updateDoc = { ...reqBody };
    await CartModel.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
