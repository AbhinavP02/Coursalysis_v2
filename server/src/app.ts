import express from "express";
import config from "config";
import cors from "cors";
import cookieParser from "cookie-parser";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");
const app = express();

app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(deserializeUser); //checks if jwt token is in the req or not. if there then res.local.user = decoded jwt else, continue

app.listen(port, async () => {
  logger.info(`app is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
