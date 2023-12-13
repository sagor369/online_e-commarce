// Import necessary modules and types
import HandleError from "@/middleware/handleError";
import connectMongoDb from "@/lib/mongodb";
import Category from "@/models/category";
import SubCategory from "@/models/subCategory";
import { NextRequest, NextResponse } from "next/server";

// Define an async function to handle the MongoDB connection
const fetchData = async () => {
  // Connect to MongoDB
  await connectMongoDb();

  // Fetch categories where isNavItem is true
  const categories = await Category.find({ isNavItem: true });

  // Initialize an array to store navigation data
  const navDataArray: {
    label: string;
    link: string;
    items: { label: string; link: string }[];
  }[] = [];

  // Loop through categories
  for (const category of categories) {
    const navItem = {
      label: category?.name,
      link: category?.name?.toLowerCase(),
      items: [] as { label: string; link: string }[],
    };

    // Fetch subcategories for the current category
    const subCategories = await SubCategory.find({ category: category._id });

    // Loop through subcategories
    for (const subCategory of subCategories) {
      navItem.items.push({
        label: subCategory.name,
        link: subCategory.name.toLowerCase(),
      });
    }

    // Push the current category's navigation data to the array
    navDataArray.push(navItem);
  }

  // Return the navigation data as JSON
  return navDataArray;
};

// Use the correct function signature for GET
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // Call the async function to fetch data
    const data = await fetchData();

    // Return the navigation data as JSON
    return NextResponse.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    return HandleError(error);
  }
};
