const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({error: "Authorization token missing or malformed."});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, "arsalan_secret");
        req.userId = decoded.userId;
        // console.log("Decoded:", JSON.stringify(decoded, null, 2));
        next();
    } catch (err) {
        return res.status(403).json({error: "Invalid or expired token."});
    }
};

module.exports = {
    authMiddleware
}