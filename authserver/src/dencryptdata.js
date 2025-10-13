import dencrypt from "./functions/dencrypt.js";

const dencryptdata = (req, res) => {
    try {
        const { decoded } = req.body;
        const data = dencrypt(decoded);
        res.json(data);
    } catch (error) {
        console.log("decrypt Error");
        res.json({ message: "Error al dencriptar" });

    }
}

export default dencryptdata;
