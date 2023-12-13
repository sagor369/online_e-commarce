import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Faq from "@/models/faq";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
    connectMongoDb();
    try {
      const { id } = params;
      const FaqDetails = await Faq.findOne({ _id: id });
      if (!FaqDetails) {
        return NextResponse.json(
          { error: "FaqFaqDetails not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({Faq:FaqDetails }, { status: 200 });
    } catch (error) {
      return HandleError(error);
    }
  };
  
  // deleteFaq
  export const DELETE = async (req: NextRequest, { params }: Params) => {
    connectMongoDb();
  
    try {
      const { id } = params;
      const deletedFaq = await Faq.findByIdAndDelete(id);
      if (!deletedFaq) {
        return NextResponse.json({ error: "Faq not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "FaqFaq deleted successfully" },
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
  
      // const result = await updateUserById(id, updateDoc);
      await Faq.findOneAndUpdate({ _id: id }, updateDoc);
      return NextResponse.json("Updated Successful");
    } catch (error) {
      return HandleError(error);
    }
  };