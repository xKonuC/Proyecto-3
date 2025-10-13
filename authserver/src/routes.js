import express from "express";
import googleRouter from "./google/google.js";
import emailRouter from "./email/email.js";
import tokenRouter from "./token/token.js";
import mailerRouter from "./mailer/mailer.js";
import adminRouter from "./admin/admin.js";
import dencryptdata from "./dencryptdata.js";
import verifyAccess from "./verifyAccess.js";
import cors from "cors";
import corsOptions from "./corsOptions.js";


const router = express.Router();


router.use("/google", googleRouter);
router.use("/email", cors(corsOptions), emailRouter);
router.use("/token", cors(corsOptions), tokenRouter);
router.use("/mailer", cors(corsOptions), mailerRouter);
router.use("/admin", cors(corsOptions), verifyAccess, adminRouter);
router.use("/aux", cors(corsOptions), dencryptdata);

export default router;