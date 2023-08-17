import mongoose from "mongoose";

export const connectionDB = async () => {
  return await mongoose
    .connect(process.env.DB_LOCAL)
    .then((res) => {
      console.log("DB connection Success");
    })
    .catch((err) => console.log("DB connection fail" ));
};
