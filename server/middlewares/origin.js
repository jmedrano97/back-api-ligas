const checkOrigin = (req, res, next) => {
    const { origin } = req.headers;
    if (origin !== 'http://localhost:3000') {
        res.status(403);
        res.send({ error: 'Origin not allowed' });
        return;
    }
    next();
};
module.exports = { checkOrigin };
//# sourceMappingURL=origin.js.map
