import mongoose, { Mongoose } from "mongoose";
import { Env } from "./configuration";

const URI = Env.get<string>("MONGO_URI");

export function connectToDatabase(): Promise<Mongoose> {
  console.log(URI);
  return mongoose.connect(URI, {
    serverSelectionTimeoutMS: 10000,
  });
}
