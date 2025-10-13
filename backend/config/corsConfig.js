import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.ALLOW_DOMAIN;
var allowlist = [
  domain,
  'http://localhost:5173', // Vite
  'http://localhost:3000', // React
  'http://localhost',      // genérico
];

const corsOptions = function(req, callback){

  const origin = req.get('Origin');
  const referer = req.get('Referrer');
  const error = new Error(`ORS origin not allowed ${origin} ${referer}`);
  let originToCheck = origin;  

  if(!origin && !referer){
    // Permitir solicitudes sin Origin ni Referer (ejemplo: Postman)
    callback(null, { origin: true });
    return;
  }
  if(!origin){
    if(referer){
      const refererUrl = new URL(referer);
      originToCheck = `${refererUrl.protocol}//${refererUrl.host}`;
    }else{
      callback(error, { origin: false});
      return;
    }
  }

  if (allowlist.indexOf(originToCheck) !== -1) {
    callback(null, { origin: true});
  } else {
    callback(error, {origin: false});
  }  

}
export default corsOptions;
