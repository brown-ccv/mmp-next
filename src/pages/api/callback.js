

const { create, renderBody } = require("./_lib/oauth2");
const { client } = require("./auth.js")

const handler = async (req, res) => {
  const client = create()
  const { code } = req.query;
  const options = {
      code,
    };

  try {
      const accessToken = await client.getToken(options);

      console.log('The resulting token: ', accessToken.token);

      res.status(200).send(
        renderBody("success", {
          token: accessToken.token.access_token,
          provider: "github",
        }),
      );
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
  //const { host } = req.headers;


  //   try {
  //     // const accessToken = oauth2.authorizeURL({
  //     //   code,
  //     // });
  //     const { token } = oauth2.getToken(code);

  //     // res.status(200).send(
  //     //   renderBody("success", {
  //     //     token: token.token.access_token,
  //     //     provider: "github",
  //     //   }),
  //     // );
  //     res.status(200).json(token.token)

  //   } catch (e) {
  //     res.status(200).send(renderBody("error", e));
  //   }
};

export default handler;
