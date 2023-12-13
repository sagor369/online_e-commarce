import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import Product from "@/models/product";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";
type ParamsType = {
  params: {
    id: string;
  };
};
// get indivitual products by id
export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const productDetails = await Product.findOne({ _id: id });
    if (!productDetails) {
      return NextResponse.json(
        { error: "productDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ product: productDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

// delete product
export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return NextResponse.json({ error: "product not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return HandleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
  connectMongoDb();
  try {
    const reqBody = await req.json();

    const id = params?.id;
    const updateDoc = { ...reqBody };

    // const result = await updateUserById(id, updateDoc);
    await Product.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
