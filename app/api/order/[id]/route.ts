import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import OrderModel from "@/models/order";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
    connectMongoDb();
    try {
      const { id } = params;
      const OrderModelDetails = await OrderModel.findOne({ _id: id });
      if (!OrderModelDetails) {
        return NextResponse.json(
          { error: "OrderModelDetails not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ OrderModel: OrderModelDetails }, { status: 200 });
    } catch (error) {
      return HandleError(error);
    }
  };
  
  // delete OrderModel
  export const DELETE = async (req: NextRequest, { params }: Params) => {
    connectMongoDb();
  
    try {
      const { id } = params;
      const deletedOrder = await OrderModel.findByIdAndDelete(id);
      if (!deletedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      return NextResponse.json(
        { message: "OrderModel deleted successfully" },
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
      await OrderModel.findOneAndUpdate({ _id: id }, updateDoc);
      return NextResponse.json("Updated Successful");
    } catch (error) {
      return HandleError(error);
    }
  };
  