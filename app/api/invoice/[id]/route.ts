import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import Invoice from "@/models/invoice";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();
  try {
    const { id } = params;
    const InvoiceDetails = await Invoice.findOne({ _id: id });
    if (!InvoiceDetails) {
      return NextResponse.json(
        { error: "InvoiceDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ Invoice: InvoiceDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

// delete Invoice
export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedOrder = await Invoice.findByIdAndDelete(id);
    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Invoice deleted successfully" },
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
    await Invoice.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
