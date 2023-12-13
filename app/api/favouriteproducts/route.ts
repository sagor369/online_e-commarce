// pages/api/add-favorite.ts
import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import FavouriteProducts from "@/models/favourite_products";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { user_email, products } = await request.json();
    await connectMongoDb();
    await FavouriteProducts.create({ user_email, products });
    return NextResponse.json("FAVOURITE CREATED SUCCESSFUL", { status: 200 });
  } catch (error) {
    console.error("Error in POST:", error);
    return HandleError(error);
  }
}

export const GET = async () => {
  try {
    await connectMongoDb();
    const favourite = await FavouriteProducts.find();
    return NextResponse.json(favourite);
  } catch (error) {
    console.error("Error in GET (FavouriteProducts):", error);
    return HandleError(error);
  }
};
