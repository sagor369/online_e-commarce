import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Banner from "@/models/banner";
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
    const bannerDetails = await Banner.findOne({ _id: id });
    if (!bannerDetails) {
      return NextResponse.json(
        { error: "bannerDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ banner: bannerDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedItem = await Banner.findByIdAndDelete(id);
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

// alright 

export const PATCH = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const reqBody = await req.json();

    const id = params?.id;
    console.log(id);
    const updateDoc = { ...reqBody };
    await Banner.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
