import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import ContactUs from "@/models/contactUs";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const ContactUsDetails = await ContactUs.findOne({ _id: id });
    if (!ContactUsDetails) {
      return NextResponse.json(
        { error: "ContactUsDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ContactUs: ContactUsDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedItem = await ContactUs.findByIdAndDelete(id);
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
    await ContactUs.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
