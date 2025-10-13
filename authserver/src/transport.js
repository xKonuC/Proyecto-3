import nodemailer from "nodemailer";
import accessToken from "./accessToken.js";

console.log(accessToken);
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.NODEMAILER_USER,
        pass: "",
        accessToken,
        clientId: process.env.NODEMAILER_CLIENT_ID,
        clientSecret: process.env.NODEMAILER_CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
});
transporter.verify(function (error, success) {
    try {
        if (error) {
            throw new Error(error);
        } 
            console.log("servicio OAuth conectado");   
    } catch (error) {
        throw new Error(error);
    }
});    

export default transporter;