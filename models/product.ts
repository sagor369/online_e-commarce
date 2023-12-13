import { Document, Schema, model, models } from "mongoose";

export interface IImage {
  url: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  promoPrice: number;
  images: IImage[];
  category: Schema.Types.ObjectId;
  subCategory: string;
  size: string[];
  inStock: boolean;
  isTrending: boolean;
  isPhotoGift: boolean;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
  deliveryFee: string;
  solded: Number;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: String,
    },
    promoPrice: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [
        {
          url: String,
        },
      ],
      default: [],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: String,
      ref: "SubCategory",
    },
    size: {
      type: [String], // Assuming size is an array of strings
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    solded: {
      type: Number,
      default: 0,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isPhotoGift: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    logo: String,
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model<IProduct>("Product", productSchema);

export default Product;
