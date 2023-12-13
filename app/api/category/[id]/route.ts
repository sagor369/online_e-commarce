import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Category from "@/models/category";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return NextResponse.json(
        { error: "category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ category: category }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return HandleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    // get update
    const reqBody = await req.json();
    // get id from params
    const id = params?.id;
    const updateDoc = { ...reqBody };
    await Category.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
