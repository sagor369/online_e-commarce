import connectMongoDb from "@/lib/mongodb";
import HandleError from "@/middleware/handleError";
import Footer from "@/models/footer";
import { getSession } from "next-auth/react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: Params) => {
  await connectMongoDb(); // Assuming connectMongoDb returns a promise or is asynchronous

  try {
    // const session = await getSession();

    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = params;
    const FooterDetails = await Footer.findOne({ _id: id });

    if (!FooterDetails) {
      return NextResponse.json(
        { error: "FooterDetails not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ Footer: FooterDetails }, { status: 200 });
  } catch (error) {
    return HandleError(error);
  }
};

// delete Footer
export const DELETE = async (req: NextRequest, { params }: Params) => {
  connectMongoDb();

  try {
    const { id } = params;
    const deletedFooter = await Footer.findByIdAndDelete(id);
    if (!deletedFooter) {
      return NextResponse.json({ error: "Footer not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Footer deleted successfully" },
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
    await Footer.findOneAndUpdate({ _id: id }, updateDoc);
    return NextResponse.json("Updated Successful");
  } catch (error) {
    return HandleError(error);
  }
};
