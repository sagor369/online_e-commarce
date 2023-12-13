// FavouriteProducts.js
import mongoose from "mongoose";

const FavouriteProductsSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const FavouriteProducts =
  mongoose.models.FavouriteProducts ||
  mongoose.model("FavouriteProducts", FavouriteProductsSchema);

export default FavouriteProducts;
