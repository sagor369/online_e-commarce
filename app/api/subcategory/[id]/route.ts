import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import SubCategory from "@/models/subCategory";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: {
    id: string;
  };
};
export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const subCategoryDetails = await SubCategory.findOne({ _id: id });
    if (!subCategoryDetails) {
      return NextResponse.json(
        { error: "subCategoryDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { subCategory: subCategoryDetails },
      { status: 200 }
    );
  } catch (error) {
    return HandleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedItem = await SubCategory.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Item deleted successfully" },
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
    await SubCategory.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
