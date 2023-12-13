const mongoose = require("mongoose");

const ForgotSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Forgot = mongoose.models.Forgot || mongoose.model("Forgot", ForgotSchema);

export default Forgot;
