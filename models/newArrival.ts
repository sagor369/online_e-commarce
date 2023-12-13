import mongoose, { Document, Schema } from "mongoose";

interface NewArrival extends Document {
  image: string;
  name: string;
  price: {
    min: number;
    max: number;
  };
}

const NewArrivalSchema = new Schema<NewArrival>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    price: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const NewArrival =
  mongoose.models.NewArrival || mongoose.model("NewArrival", NewArrivalSchema);

export default NewArrival;
