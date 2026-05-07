const crypto = require("crypto");
const { create } = require("./_lib/oauth2");
import { AuthorizationCode } from "simple-oauth2";

const randomString = () => crypto.randomBytes(4).toString(`hex`);

const handler = (req, res) => {
  const client = create();
  const authorizationUri = client.authorizeURL({
    scope: `repo,user`,
    state: randomString(),
  });

  res.redirect(authorizationUri);
};

export default handler;
