import verifyOTPToken from "./functions/verifyOTPToken.js";

const verifyAccess = (req, res, next) =>{
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Las credenciales proporcionadas no son válidas. No tienes permisos para acceder al servidor. Tu actividad está siendo monitoreada y cualquier intento de acceso no autorizado será registrado y puede resultar en acciones legales." });
    const payload = verifyOTPToken(token);
    if(!payload) return res.status(402).json({ message: "Acceso no autorizado. No tienes permisos para acceder al servidor. Tu actividad está siendo monitoreada y cualquier intento de acceso no autorizado será registrado y puede resultar en acciones legales." });
    req.payload = payload;    
    next();
}
export default verifyAccess;