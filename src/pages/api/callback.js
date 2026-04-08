const { create, renderBody } = require("./_lib/oauth2");
const { client } = require("./auth.js");

const handler = async (req, res) => {
  const client = create();
  const { code } = req.query;
  const options = {
    code,
  };

  try {
    const accessToken = await client.getToken(options);

    res.status(200).send(
      renderBody("success", {
        token: accessToken.token.access_token,
        provider: "github",
      }),
    );
  } catch (error) {
    console.error("Access Token Error", error.message);
    return res.status(500).json("Authentication failed");
  }
};

export default handler;
