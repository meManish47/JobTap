import jwt from "jsonwebtoken";
export function createToken({ id }: { id: string }) {
  //@ts-ignore
  const token = jwt.sign(id, process.env.JWT_SECRET_KEY);
  return token;
}
