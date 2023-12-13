import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import FavouriteProducts from "@/models/favourite_products";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const FavouriteProduct = await FavouriteProducts.findOne({ _id: id });
    if (!FavouriteProduct) {
      return NextResponse.json(
        { error: "FavouriteProducts not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { FavouriteProducts: FavouriteProducts },
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
    const deletedFavouriteProducts = await FavouriteProducts.findByIdAndDelete(
      id
    );
    if (!deletedFavouriteProducts) {
      return NextResponse.json(
        { error: "FavouriteProducts not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "FavouriteProducts deleted successfully" },
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
    await FavouriteProducts.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
