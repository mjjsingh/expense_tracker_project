// verifyToken.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            return true;
        });
    } else {
        res.sendStatus(401);
        return false;
    }
}

module.exports = verifyToken;

