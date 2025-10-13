import {google} from 'googleapis';

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
    process.env.NODEMAILER_CLIENT_ID,
    process.env.NODEMAILER_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});
let accessToken = undefined;
accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token)=> {      
        if(err){
            reject();
        }
        resolve(token);   
    });
}).catch(e =>{
    console.log("Error al obtener access token");
});


export default accessToken;