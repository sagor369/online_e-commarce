import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Category from "@/models/category";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: Request){
//     const {name,price,description,category} = await request.json();
//     await connectMongoDb();
//     const all =  await Category.create({name,price,description,category});
//     return NextResponse.json(all, {status: 200})
// }

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await Category.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const query: Record<string, any> = {};
  const featured = searchParams.get('isFeatured');

  try {
    await connectMongoDb();

    if (featured === 'true') {
      query.isFeatured = { $exists: true, $ne: null };
    }

    // Apply additional filters as needed
    // ...

    const CategoryQuery = Category.find(query).sort({ createdAt: -1 });

    const filteredCategory = await CategoryQuery.exec();
    return NextResponse.json( filteredCategory);
  } catch (error) {
    console.error('Error in GET (Category):', error);
    return HandleError(error);
  }
};
