import mongoose, { Schema } from "mongoose";

interface NavDataItem {
  label: string;
  link: string;
}

interface NavData extends Document {
  label?: string;
  link?: string;
  items?: NavDataItem[];
}

const navDataSchema = new Schema<NavData>({
  label: { type: String },
  link: { type: String },
  items: [
    {
      label: { type: String },
      link: { type: String },
    },
  ],
});
const NavDataModel =
  mongoose.models.NavData || mongoose.model("NavData", navDataSchema);

export default NavDataModel;
