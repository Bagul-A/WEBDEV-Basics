const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
module.exports = (req, res, next) => {
    const token = req.cookies['session-token'];
    console.log(token);
    const user = {};
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID
        });
        console.log(1);
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
    }
    verify().then(() => {
        req.user = user;
        next();
    }).catch(error => {
        console.log(error);
        res.redirect('/user/login');
    });
}