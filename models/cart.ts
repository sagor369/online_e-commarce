// models/Cart.ts

import { Schema, model } from "mongoose";
import { models } from "mongoose";

const CartSchema = new Schema(
  {
    email: {
      type: String,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  },
  { timestamps: true }
);

const CartModel = models.Cart || model("Cart", CartSchema);
export default CartModel;
