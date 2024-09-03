import jwt from 'jsonwebtoken';
// import httpStatus from 'http-status';
export const createToken = (
  jwtPayload: { userId: string; userEmail:string, role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};