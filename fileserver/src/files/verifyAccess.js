import verifyToken from "../../functions/verifyToken.js";

const verifyAccess = (req, res, next) =>{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token not provied" });
    if(!verifyToken(token)) return res.status(402).json({ message: "Token not valid" });
    next();
}
export default verifyAccess;