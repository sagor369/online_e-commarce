import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/models/product";

export const POST = async (req: NextRequest) => {
  await connectMongoDb();
  const body = await req.json();
  try {
    await Product.create(body);
    return NextResponse.json({success: true}, { status: 201 });
  } catch (error) {
    return HandleError(error);
  }
};


// get all product
// export async function GET(req: Request) {
//   await connectMongoDb();
//   const { searchParams } = new URL(req.url);
//   const name = searchParams.get("name");
//   const description = searchParams.get("description");
//   const category = searchParams.get("category");
//   const subCategory = searchParams.get("subCategory");
//   const sort = searchParams.get("sort");
//   const startPrice = parseFloat(searchParams.get("startPrice") || "0");
//   const endPrice = parseFloat(searchParams.get("endPrice") || "Infinity");
//   const priceSort = searchParams.get("priceSort");
//   const newArrival = searchParams.get("newArrival");
//   const hasPromoPrice = searchParams.get("hasPromoPrice");

//   if (
//     name ||
//     description ||
//     category ||
//     subCategory ||
//     newArrival ||
//     hasPromoPrice
//   ) {
//     const query: Record<string, any> = {};

//     if (name) {
//       query.name = { $regex: new RegExp(name, "i") };
//     }

//     if (description) {
//       query.description = { $regex: new RegExp(description, "i") };
//     }
//     if (category) {
//       query.category = category;
//     }

//     if (subCategory) {
//       query.subCategory = subCategory;
//     }
//     query.price = { $gte: startPrice, $lte: endPrice };

//     // Add new arrival filter
//     if (newArrival === "true") {
//       const currentDate = new Date();
//       const oneWeekAgo = new Date(
//         currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
//       );
//       query.createdAt = { $gte: oneWeekAgo };
//     }

//     // Add promo price filter
//     if (hasPromoPrice === "true") {
//       query.promoPrice = { $exists: true, $ne: null };
//     }

//     const productsQuery = Product.find(query);
//     if (sort === "asc") {
//       productsQuery.sort({ name: 1 });
//     } else if (sort === "desc") {
//       productsQuery.sort({ name: -1 });
//     }

//     if (priceSort === "asc") {
//       productsQuery.sort({ price: 1 });
//     } else if (priceSort === "desc") {
//       productsQuery.sort({ price: -1 });
//     }
//     const filteredProducts = await productsQuery.exec();
//     return NextResponse.json({ success: true, data: filteredProducts });
//   } else {
//     const allProducts = await Product.find();
//     return NextResponse.json(allProducts);
//   }
// }

export const GET = async () => {
  try {
    await connectMongoDb();
    const result = await Product.find();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET:", error);
    return HandleError(error)
  }
};
