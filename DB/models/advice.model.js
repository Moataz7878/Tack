import { model, Schema } from "mongoose";
const adviceSchema = new Schema(
  {
body:String,
title:String,
to:String,
  },
  {
    timestamps: true,
  }
);

const adviceModel = model("advice", adviceSchema);

export default adviceModel;