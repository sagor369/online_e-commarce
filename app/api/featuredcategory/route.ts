import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectMongoDb();
    const categories = await Category.find({ isFeatured: true });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error in GET operation:", error);
    return HandleError(error);
  }
};
