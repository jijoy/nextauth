import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../../lib/prismadb";
export default async function signupHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  switch (method) {
    case "POST":
      const { name, email, password } = body;
      const user = await client.user.create({
        data: {
          name: name,
          email: email,
          password: password,
        },
      });
      res.status(201).json({ user: user });
    default:
      res.status(405).json({ message: "Unsupported Operation" });
  }
}
