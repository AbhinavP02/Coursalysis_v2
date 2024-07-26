import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>, // customises request object to createUserInput type
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.sendStatus(409).send(e.message);
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  return res.send(res.locals.user);
};
