import axios from 'axios';
import { setCookie } from 'nookies'
import https from 'https'

export default async (req, res) => {
  const { username, password, email } = req.body;
    console.log(req.body)
  try {
        const agent = new https.Agent({  
        rejectUnauthorized: false
      });
    const response = await axios.post('https://api.dessertcorner.com/api/auth/local/register', {
      username,
      email,
      password,
    },{ httpsAgent: agent })

    console.log("response")

    console.log(response)

    setCookie({ res }, 'jwt', response.data.jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    res.status(200).end();
  } catch (e) {
      console.log(e)
    res.status(400).send(e.response.data.message[0].messages[0]);
  }
}