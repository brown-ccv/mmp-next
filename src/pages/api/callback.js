const { create, renderBody } = require("./_lib/oauth2");

const handler = async (req, res) => {
    const code = req.query.code;
    //const { host } = req.headers;

    const oauth2 = create();

    try {
        const accessToken = await oauth2.authorizationCode.getToken({
            code,
            redirect_uri: `https://mmp.research.brown.edu/api/callback`,
        });
        const { token } = oauth2.accessToken.create(accessToken);

        res.status(200).send(
            renderBody("success", {
                token: token.access_token,
                provider: "github",
            })
        );
    } catch (e) {
        res.status(200).send(renderBody("error", e));
    }
};

export default handler;
