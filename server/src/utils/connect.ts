import mongoose from "mongoose";
import config from "config";
import logger from "./logger";

const connect = async () => {
  const dburi = config.get<string>("dburi");

  try {
    await mongoose.connect(dburi);
    logger.info("DB connected");
  } catch (error) {
    logger.error("error connecting to the database");
    process.exit(1);
  }
};

export default connect;
