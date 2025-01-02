import mongoose from "mongoose";

export class ConnectMongo {
  private databaseUrl: string;
  constructor() {
    if (!process.env.MONGODB_CONNECTION_STRING) {
      throw new Error(
        "MONGODB_CONNECTION_STRING is not defined in the environment variables."
      );
    }
    this.databaseUrl = process.env.MONGODB_CONNECTION_STRING;
  }
  connectDB() {
    mongoose
      .connect(this.databaseUrl)
      .then(() => console.log("database connected successfully."))
      .catch((err) => console.error(err));
  }
}
