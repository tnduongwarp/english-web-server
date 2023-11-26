import jwt from 'jsonwebtoken'


const config = process.env;

const verifyToken = (req, res, next) => {
    let token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "A token is required for authentication"
        });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;

    } catch (err) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized"
        });
    }
    return next();
};
const isUser = (req, res, next) => {

    if (req.user.role === "user") {
        next();
        return;
    }
    else {
        res.status(403).json({ error: true, message: "Required User Role!" });
        return;
    }

}
const authorization = {
    verifyToken,
    isUser
}
export default authorization;