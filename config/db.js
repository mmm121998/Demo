import mongoose from "mongoose";
import colors from "colors";
console.log(process.env.MONGO_URL);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    //const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to mongodb database ${conn.connection.host}`.bgRed.white);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`.bgCyan.white);
  }
};
export default connectDB;
