import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import NewArrival from "@/models/newArrival";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const NewArrivalDetails = await NewArrival.findOne({ _id: id });
    if (!NewArrivalDetails) {
      return NextResponse.json(
        { error: "NewArrivalDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { NewArrival: NewArrivalDetails },
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
    const deletedItem = await NewArrival.findByIdAndDelete(id);
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
    await NewArrival.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
