import { Request, Response } from "express";
import config from "config";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  //validate the user's password

  const user = await validatePassword(req.body); // EVERY REQ BODY MUST BE VALIDATED TRHOUGH A SCHEMA BEFORE ACCEPTING IN THE CONTROLLER.

  if (!user) {
    return res.status(401).send("Invalid email or password");
  }

  //create session (since password is correct)

  const session = await createSession(user._id, req.get("user-agent") || "");

  //create access token

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") } //15 mins
  );
  //create refresh token

  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("refreshTokenTtl") } //1 yr
  );

  //return access and refresh tokens

  res.cookie("accessToken", accessToken, {
    maxAge: 900000, //15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, //1 yr
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
