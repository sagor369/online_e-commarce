const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    deliveryAddress: [
      {
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
          default: ""
        },
      },
    ],
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    photoURL: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      trim: true,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.models.User || mongoose.model("User", usersSchema);

export default Users;
