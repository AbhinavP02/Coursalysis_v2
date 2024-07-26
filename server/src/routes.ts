import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.controller";
import validate from "./middleware/validateResource";
import { createUserSchema } from "./schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductSchema,
  getProductSchema,
  updateProductSchema,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

const routes = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/api/users", validate(createUserSchema), createUserHandler); // when hitting the create user api, the request payload sent from client to server will have the email id and password written by user (signup?)

  app.get("/api/me", requireUser, getCurrentUser);

  app.post(
    "/api/sessions",
    validate(createSessionSchema),
    createUserSessionHandler
  ); // returns refresh token and access token by creating a session between client and server(you) (log in?)

  app.get("/api/sessions", requireUser, getUserSessionsHandler); // sends all sessions created by user

  app.delete("/api/sessions", requireUser, deleteSessionHandler); //deletes session

  //--------------------------------------------------------------------------------------------------------------------------------------
  app.post(
    "/api/products",
    [requireUser, validate(createProductSchema)],
    createProductHandler
  );

  app.put(
    "/api/products/:productId",
    [requireUser, validate(updateProductSchema)],
    updateProductHandler
  );

  app.get(
    "/api/products/:productId",
    validate(getProductSchema),
    getProductHandler
  );

  app.delete(
    "/api/products/:productId",
    [requireUser, validate(deleteProductSchema)],
    deleteProductHandler
  );
};

export default routes;
