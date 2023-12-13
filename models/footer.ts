const mongoose = require("mongoose");

const FooterSchema = new mongoose.Schema(
  {
    bio: {
      type: String,
    },
    location: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
    },
    mobilePhone: {
      type: String,
    },
    localPhone: {
      type: String,
    },
    socialLinks: {
      fb: String,
      ins: String,
      twit: String,
      linked: String,
      pin: String,
    },
  },
  {
    timestamps: true,
  }
);

const Footer = mongoose.models.Footer || mongoose.model("Footer", FooterSchema);

export default Footer;
