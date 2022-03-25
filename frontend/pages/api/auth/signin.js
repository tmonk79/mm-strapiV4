import axios from "axios";
import { setCookie } from "nookies";
import https from "https";

export default async (req, res) => {
  const { password, identifier } = req.body;
  console.log(req.body);
  const agent = new https.Agent({
    rejectUnauthorized: false,
  });

  try {
    const postRes = await axios.post(
      `${process.env.STRAPI_API}/auth/local`,
      {
        identifier,
        password,
      },
      { httpsAgent: agent }
    );

    setCookie({ res }, "jwt", postRes.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).end();
  } catch (e) {
    res.status(400).send(e.response.data.error.message);
  }
};

