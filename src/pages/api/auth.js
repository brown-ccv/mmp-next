const crypto = require("crypto");
const { create } = require("./_lib/oauth2");

const randomString = () => crypto.randomBytes(4).toString(`hex`);

const handler = (req, res) => {
  //const { host } = req.headers;

  const oauth2 = create();

  const url = oauth2.authorizationCode.authorizeURL({
    scope: `repo,user`,
    state: randomString(),
  });

  res.writeHead(301, { Location: url });
  res.end();
};

export default handler;
