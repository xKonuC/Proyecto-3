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
  const referer = req.get('Referer');
  
  console.log('Backend CORS - Origin:', origin);
  console.log('Backend CORS - Referer:', referer);
  console.log('Backend CORS - Allowlist:', allowlist);

  // Si no hay origin ni referer (ejemplo: Postman), permitir
  if(!origin && !referer){
    callback(null, { 
      origin: true,
      credentials: true 
    });
    return;
  }
  
  let originToCheck = origin;
  
  if(!origin && referer){
    try {
      const refererUrl = new URL(referer);
      originToCheck = `${refererUrl.protocol}//${refererUrl.host}`;
    } catch (e) {
      console.error('Backend CORS - Error parsing referer:', e);
    }
  }
  
  console.log('Backend CORS - Origin to check:', originToCheck);

  if (allowlist.indexOf(originToCheck) !== -1) {
    console.log('Backend CORS - Origin allowed');
    callback(null, { 
      origin: true,
      credentials: true 
    });
  } else {
    const error = new Error(`CORS origin not allowed: ${originToCheck}`);
    console.error('Backend CORS - ' + error.message);
    callback(error, {origin: false});
  }  

}
export default corsOptions;
