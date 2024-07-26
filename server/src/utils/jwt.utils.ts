import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

export const signJwt = (
  object: object,
  options?: jwt.SignOptions | undefined
) => {
  //sign jwt with private key
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  //verify with a public key
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: false,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: (e.message = "jwt expired"),
      decoded: null,
    };
  }
};
