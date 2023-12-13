import mongoose, { Document, Schema } from "mongoose";

interface ContactUs extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactUsSchema: Schema<ContactUs> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },
    message: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const ContactUs =
  mongoose.models.ContactUs ||
  mongoose.model<ContactUs>("ContactUs", ContactUsSchema);

export default ContactUs;
