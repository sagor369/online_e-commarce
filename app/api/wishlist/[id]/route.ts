import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Wishlist from "@/models/wishlist";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
    connectMongoDb();
    try {
      const { id } = params;
      const WishlistDetails = await Wishlist.findOne({ _id: id });
      if (!WishlistDetails) {
        return NextResponse.json(
          { error: "WishlistDetails not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { Wishlist: WishlistDetails },
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
      const deletedItem = await Wishlist.findByIdAndDelete(id);
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
  
  
  
  export const PATCH = async (req: NextRequest, { params }: Params) => {
      connectMongoDb();
      try {
        const reqBody = await req.json();
    
        const id = params?.id;
        const updateDoc = { ...reqBody };
        await Wishlist.findOneAndUpdate({ _id: id }, updateDoc);
        return NextResponse.json("Updated Successful");
      } catch (error) {
        return HandleError(error);
      }
    };
  