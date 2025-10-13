import express from "express";
import transporter from "../transport.js";
import pool from '../database/dbConnection.js';
import pool2 from '../database/dbConnection2.js';
import mjml2html from "mjml";
import { hashSync } from 'bcrypt';
import jwt from "jsonwebtoken";
import verifyAccess from "../verifyAccess.js";
import dotenv from 'dotenv';
dotenv.config();


const mailerRouter = express.Router();

mailerRouter.post("/invite", async (req, res) => {
    try {
        const { rut, 
            firstName, 
            secondName, 
            surname1, 
            surname2, 
            sex, 
            civilStatus, 
            birthday, 
            address, 
            email, 
            personalEmail,
            phone, 
            entry, 
            workPlace, 
            phoneWork, 
            job, 
            articulation, 
            group } = req.body;
        const connection = await pool.getConnection();
        const connection2 = await pool2.getConnection();
        const [existingUser] = await connection.execute(`
        SELECT id FROM userAccount WHERE email = ?
    `, [email]);
        if (existingUser.length > 0) {
            connection.release();
            connection2.release();
            return res.json({ message: "Email already registered" });
        }
        const [existingUser2] = await connection2.execute(`
        SELECT userID FROM user WHERE rut = ?
    `, [rut]);
        if (existingUser2.length > 0) {
            connection.release();
            connection2.release();
            return res.json({ message: "Rut already registered" });
        }

        // Generar contraseña por defecto
        const defaultPassword = 'Password123!';
        const hashedPassword = hashSync(defaultPassword, 10);
        console.log('Default password:', defaultPassword);
        console.log('Hashed password:', hashedPassword);
        
        const [result] = await connection.execute(`
    INSERT INTO userAccount (name, email, provider, password)
    VALUES (?,?,?,?)
    `, [`${firstName} ${secondName} ${surname1} ${surname2}`, email, "Email", hashedPassword]);
        console.log('UserAccount insert result:', result);
        const [result2] = await connection2.execute(`
    INSERT INTO user (userID, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, \`group\`)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `, [result.insertId, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, email, personalEmail, phone, entry, workPlace, phoneWork, job, articulation, group]);

        connection.release();

        if (result.affectedRows > 0 && result2.affectedRows > 0) {
            const id = result.insertId;
            const payload = {
                id, rut, firstName, email
            }
            const otpToken = jwt.sign(payload, process.env.SECRET_OTP_TOKEN, {expiresIn: '10h'});
            const [result3] = await connection2.execute(`
            INSERT INTO otpToken (email, token)
            VALUES (?,?)
            `, [email, otpToken]);
            connection2.release();
        
            const mjmlContent = `
            <mjml>
                <mj-body>
                    <mj-container>
                        <mj-section>
                            <mj-column>
                                <mj-divider border-color="#000000" />
                                <mj-image src="${process.env.ICON_URL}" alt="Checkmark" width="250px" />
                                <mj-text font-size="20px" color="#000000">Bienvenido ${firstName} ${secondName} ${surname1} ${surname2},</mj-text>
                                <mj-text color="#000000">Has sido invitado a registrarte al sistema.</mj-text>

                                <mj-button background-color="#000000" color="#ffffff" href="${process.env.FRONTEND_URL}/ChangePassword?otp=${otpToken}">Registrar ahora</mj-button>
                            </mj-column>
                        </mj-section>
                        <mj-section>
                            <mj-column>
                                <mj-divider border-color="#000000" />
                                <mj-text color="#000000">
                                    Has recibido este correo porque has sido seleccionado para participar en nuestro sistema de gestión de admisión de alumnos. Este sistema te permitirá completar fácilmente el proceso de registro y presentar la documentación necesaria para tu admisión.
                                </mj-text>
                                <mj-text color="#000000">
                                    Nos emociona darte la bienvenida y esperamos que esta plataforma simplifique y agilice tu experiencia de registro. Si tienes alguna pregunta o necesitas asistencia, no dudes en ponerte en contacto con nosotros.
                                </mj-text>
                            </mj-column>
                        </mj-section>
                    </mj-container>
                </mj-body>
            </mjml>
        `;
            const { html } = mjml2html(mjmlContent);
            let mailOptions = {
                from: process.env.FROM_MAIL,
                to: email,
                subject: "Invitación al sistema de Magister",
                html
            };
            try {
                const info = await transporter.sendMail(mailOptions);
                console.log("Response: ", info.response);
                console.log("Sending response with id:", id);
                res.json({ message: "User created successfully and email sent", id });
            } catch (emailError) {
                console.log("Email sending failed, but user was created:", emailError.message);
                console.log("Sending response with id:", id);
                res.json({ message: "User created successfully, but email could not be sent", id });
            }
        } else {
            res.json({ message: "Failed to register user" });
        }
    } catch (error) {
        console.log("Error: ", error);
        res.json({ message: "Error sending email", error: error.message });
    }

});
mailerRouter.post("/addPassword", verifyAccess, async (req, res) => {
    try {
        const { password} = req.body;
        const { id } = req.payload;
        const connection = await pool.getConnection();
        const updateQuery = "UPDATE userAccount SET password = ? WHERE id = ?";
        await connection.execute(updateQuery, [hashSync(password, 10), id]);
        connection.release();
        res.json({ message: "Password added" });
    } catch (error) {
        console.log("Error: " + error.message);
        res.json({ message: "Error" });
    }
});

mailerRouter.post("/restorePassword", async (req, res) => {
    try {
        const { email } = req.body;
        const connection = await pool.getConnection();
        const connection2 = await pool2.getConnection();
        const [existingUser] = await connection.execute(`
            SELECT * FROM userAccount WHERE email = ?
        `, [email]);
        const [existingUser2] = await connection2.execute(`
            SELECT * FROM user WHERE email = ?
        `, [email]);
        connection.release();
        if (existingUser.length > 0 && existingUser2.length > 0) {
            const user = existingUser2[0];
            const payload = {
                id: user.userID, rut: user.rut, firstName: user.firstName, email: user.email
            }
            const otpToken = jwt.sign(payload, process.env.SECRET_OTP_TOKEN, {expiresIn: '10m'});

            const [result] = await connection2.execute(`
            INSERT INTO otpToken (email, token)
            VALUES (?,?)
            `, [email, otpToken]);
            connection2.release();

            const mjmlContent = `
            <mjml>
                <mj-body>
                    <mj-container>
                        <mj-section>
                            <mj-column>
                                <mj-divider border-color="#000000" />
                                <mj-image src="${process.env.ICON_URL}" alt="Checkmark" width="250px" />
                                <mj-text font-size="20px" color="#000000">Hola! Bienvenido ${user.firstName} ${user.secondName} ${user.surname1} ${user.surname2},</mj-text>
                                <mj-text color="#000000">Has sido invitado a restablecer la contraseña de tu cuenta en nuestro sistema.</mj-text>
                                <mj-button background-color="#000000" color="#ffffff" href="${process.env.FRONTEND_URL}/ChangePassword?otp=${otpToken}">Restaurar contraseña</mj-button>
                            </mj-column>
                        </mj-section>
                        <mj-section>
                        <mj-column>
                        <mj-divider border-color="#000000" />
                        <mj-text color="#000000">
                            Has recibido este correo porque has solicitado restablecer la contraseña de tu cuenta. Sigue el enlace anterior para completar el proceso de restablecimiento.
                        </mj-text>
                        <mj-text color="#000000">
                            Si no has solicitado restablecer la contraseña, puedes ignorar este correo electrónico.
                        </mj-text>
                    </mj-column>                        </mj-section>
                    </mj-container>
                </mj-body>
            </mjml>
        `;
            const { html } = mjml2html(mjmlContent);
            let mailOptions = {
                from: process.env.FROM_MAIL,
                to: email,
                subject: "Restablecimiento de contraseña del sistema de Magister",
                html
            };
            connection.release();
            const info = await transporter.sendMail(mailOptions);
            console.log("Response: ", info.response);
            return res.json({ message: info.response , accepted: info.accepted});
        } else {
            res.json({ message: "User not founded." })
        }
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
});

export default mailerRouter;