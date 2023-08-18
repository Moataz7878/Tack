import mongoose from "mongoose";

export const connectionDB = async () => {
  return await mongoose
    .connect(process.env.Db_cloud)
    .then((res) => {
      console.log("DB connection Success");
    })
    .catch((err) => console.log("DB connection fail" ));
};
