import mongoose, { Schema, Types } from "mongoose";

interface Order {
  user: Types.ObjectId | string;
  product: Types.ObjectId | string;
  description: string;
  deliveryAddress: Object;
  status: "cart" | "create" | "pending" | "shipped" | "completed" | "cancelled";
  image: [String];
}

const OrderSchema: Schema<Order> = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    description: {
      type: String,
      default: "",
    },
    image: [
      {
        url: String,
      },
    ],
    deliveryAddress: {
      pincode: {
        type: String,
        default: "",
      },
      name: {
        type: String,
        default: "",
      },
      phone: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        default: "",
      },
      state: {
        type: String,
        default: "",
      },
      address: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      enum: ["cart", "create", "pending", "shipped", "completed", "cancelled"],
      default: "cart",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);

export default OrderModel;
