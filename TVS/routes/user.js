const express = require('express');
const router = express.Router();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const checkAuth = require('../middleware/checkAuth');

router.get('/', (req, res) => {
    res.send("HI");
});
router.get('/login', (req, res) => {
    res.render('../views/login');
});

router.post('/login', (req, res) => {
    const token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
    }
    verify().then(() => {
        res.cookie('session-token', token);
        res.send('success');
    }).catch(console.error);
});

router.get('/profile', checkAuth, (req, res) => {
    const user = req.user;
    console.log(user);
    res.render('dash', { user });
})

router.get('/logout', (req, res) => {
    res.clearCookie('session-token');
    res.redirect('/user/login');
})

module.exports = router;