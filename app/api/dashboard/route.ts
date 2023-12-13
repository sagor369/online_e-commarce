import { NextResponse } from "next/server";
import HandleError from "@/middleware/handleError";
import Users from "@/models/user";
import Products, { IProduct } from "@/models/product";
import OrderModel from "@/models/order";

export const GET = async () => {
  try {
    // Fetch all users
    const users = await Users.find();
    const totalUsers: number = users.length;

    // Fetch all products
    const products: IProduct[] = await Products.find();
    const totalProducts: number = products.length;

    // Get the total quantity of solded products (sum of the 'solded' field)
    const totalSoldedProductsResult = await Products.aggregate([
      { $match: { solded: { $gt: 0 } } }, // Match products with solded quantity greater than 0
      { $group: { _id: null, totalSolded: { $sum: "$solded" } } }, // Sum the 'solded' field
    ]);

    // Extract the totalSolded value from the result
    const totalSolded: number = totalSoldedProductsResult.length > 0 ? totalSoldedProductsResult[0].totalSolded : 0;

    // Return the total number of users, products, and total solded quantity
    const inStockProducts: IProduct[] = products.filter((product) => product.inStock);
    const totalInStockProducts: number = inStockProducts.length;


    const totalOrders: number = await OrderModel.countDocuments();

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalInStockProducts,
      totalSolded,
      totalOrders
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Provide a more detailed error response
    return HandleError(error);
  }
};
