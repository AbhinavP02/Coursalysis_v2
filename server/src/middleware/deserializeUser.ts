import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, "cookies.accessToken") ||
    <string>get(req, "headers.authorization", "").replace(/^Bearer\s/, ""); // authorization header contains access token on each request but, 'bearer' word must be removed from the access token before accessing it

  const refreshToken =
    get(req, "cookies.refreshToken") || <string>get(req, "headers.x-refresh");

  if (!accessToken && !refreshToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if ((expired && refreshToken) || (!accessToken && refreshToken)) {
    //reissue the access token if refresh token is valid (do this in session service)
    // console.log("yaha pohoch gaya");
    const newAccessToken = await reIssueAccessToken({ refreshToken });
    // console.log(newAccessToken);
    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken);

      res.cookie("accessToken", newAccessToken, {
        maxAge: 900000, //15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      });
    }

    const result = verifyJwt(<string>newAccessToken);

    res.locals.user = result.decoded; // if the user sends request with a expired access token, the request flow is gonna continue as if they sent a valid access token, given that the refresh token is valid
    return next();
  }

  return next();
};

export default deserializeUser;
