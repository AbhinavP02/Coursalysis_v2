import { get } from "lodash";
import config from "config";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean();
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, update);
};

export const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);
  console.log(decoded);
  if (!decoded || !get(decoded, "session")) return false; // refreshtoken not verified or sessionid is null (session is not valid)

  const session = await SessionModel.findById(get(decoded, "session"));

  if (!session || !session.valid) {
    // if the session is set to isvalid false, we don't want to issue a new access token
    return false;
  }

  const user = await findUser({ _id: session.user });

  if (!user) return false; //if no user

  //now create a new access token

  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get("accessTokenTtl") } //15 mins
  );

  return accessToken;
};
