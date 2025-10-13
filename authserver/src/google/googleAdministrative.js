import express from "express";
import pool from "../database/dbConnection.js";
import pool2 from "../database/dbConnection2.js";
import passport from "passport";
import passportGoogleOauth20 from "passport-google-oauth20";
import jwt from 'jsonwebtoken';
import session from "express-session";
import dotenv from 'dotenv';
import cors from "cors";
import corsOptions from "../corsOptions.js";


dotenv.config();

const GoogleStrategy = passportGoogleOauth20.Strategy;

// passport.use('admin', new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: process.env.CALLBACK_ADMINISTRATIVE_GOOGLE,
//     passReqToCallback: true
// }, async (request, accessToken, refreshToken, profile, done) => {
//     try {
//         const email = profile._json.email;
//         const connection = await pool.getConnection();
//         const connection2 = await pool2.getConnection();
//
//         const [existingUser] = await connection.execute(`
//             SELECT * FROM userAccount WHERE email = ?
//         `, [email]);
//         const [existingUser2] = await connection2.execute(`
//             SELECT * FROM user WHERE email = ?
//         `, [email]);
//
//         const [administrative] = await connection2.execute(`
//             SELECT * FROM administrative WHERE email = ?
//         `, [email]);
//         if(administrative.length === 0){
//             return done(null, false, { message: 'Administrativo inválido'});
//         }
//         connection.release();
//         connection2.release();
//
//         if (!existingUser[0] || !existingUser2[0]) {
//             return done(null, false, { message: 'Correo electrónico no registrado.' });
//         }
//         const payload = {
//             id: existingUser[0].id, ...existingUser2[0]
//         };
//         return done(null, payload);
//     } catch (error) {
//         return done(error, null);
//     }
// }));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

const googleAdministrativeRouter = express.Router();

googleAdministrativeRouter.use((session({
    secret: process.env.GOOGLE_SECRET,
    resave: false,
    saveUninitialized: false
})));
googleAdministrativeRouter.use(passport.initialize());
googleAdministrativeRouter.use(passport.session());

googleAdministrativeRouter.get('/', cors(corsOptions), passport.authenticate('admin', { scope: ['profile', 'email'] }));
googleAdministrativeRouter.get('/callback',
    passport.authenticate('admin', {
        successRedirect: process.env.SUCCESS_ADMINISTRATIVE_REDIRECT,
        failureRedirect: process.env.FAILURE_REDIRECT
    })
);
googleAdministrativeRouter.get('/logged', async (req, res) => {
    const payload = req.user;
    const token = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ counter: 0, ...payload }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: "2d" });
    const data = { token, refreshToken, id: payload.id };
    res.cookie('token', data.token, {
        // httpOnly: true,
        // secure: true,
        sameSite: 'Strict',
        maxAge: 3600000
    });
    res.cookie('refreshToken', data.refreshToken, {
        // httpOnly: true,
        // secure: true,
        sameSite: 'Strict',
        maxAge: 3600000
    });
    res.cookie('id', data.id, {
        // httpOnly: true,
        // secure: true,
        sameSite: 'Strict',
        maxAge: 3600000
    });
    res.redirect(process.env.FRONTEND_AUTH_ADMINISTRATIVE_URL);

});

googleAdministrativeRouter.get('/logout', cors(corsOptions), (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log("Error while destroying session", err);
        } else {
            req.logout(() => {
                console.log("You are logged out");
                res.redirect(process.env.LOGOUT_GOOGLE_REDIRECT);
            });
        }
    });
});
export default googleAdministrativeRouter;