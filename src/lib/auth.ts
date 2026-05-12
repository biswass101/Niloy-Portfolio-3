import jwt from "jsonwebtoken";

export const CMS_AUTH_COOKIE = "portfolio_cms_token";
const JWT_EXPIRES_IN = "7d";

export type JwtPayload = {
  sub: string;
  email: string;
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Missing JWT_SECRET in environment variables");
  }
  return secret;
};

export const signCmsToken = (payload: JwtPayload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export const verifyCmsToken = (token: string) => {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
};
