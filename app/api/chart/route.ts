import HandleError from '@/middleware/handleError';
import Product, {IProduct} from '@/models/product';
import { NextResponse } from 'next/server';

export const GET = async() => {
  try {
    // Find all products with solded greater than 0
    const soldProducts = await Product.find({ solded: { $gt: 0 } });

    // Calculate the total sold price and count
    let totalSoldPrice = 0;
    let totalSoldCount = 0;

    soldProducts.forEach((product: any) => {
      totalSoldPrice += product.price * product.solded;
      totalSoldCount += product.solded;
    });

    return NextResponse.json({
      soldProducts,
      totalSoldCount,
      totalSoldPrice,
    });
  } catch (error) {
    console.error('Error fetching sold products:', error);
    return HandleError(error)
  }
}
