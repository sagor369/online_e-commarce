import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Users from "@/models/user";
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
    const userDetails = await Users.findOne({ _id: id });
    if (!userDetails) {
      return NextResponse.json(
        { error: "userDetails not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ user: userDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedUser = await Users.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return HandleError(error);
  }
};

export const PATCH = async (req: NextRequest, { params }: ParamsType) => {
  connectMongoDb();
  try {
    // const { id } = params;
    const id = params?.id;
    const reqBody = await req.json();
    const updateDoc = { ...reqBody };
    await Users.findOneAndUpdate({ email: id }, updateDoc);
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};
