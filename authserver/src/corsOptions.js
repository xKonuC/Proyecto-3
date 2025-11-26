import dotenv from 'dotenv';
dotenv.config();

const domain1 = process.env.ALLOW_DOMAIN1;
const domain2 = process.env.ALLOW_DOMAIN2;
const domain3 = process.env.ALLOW_DOMAIN3;
var allowlist = [domain1, domain2, domain3];

const corsOptions = function(req, callback){
  const origin = req.get('Origin');
  const referer = req.get('Referer');
  
  console.log('CORS - Origin:', origin);
  console.log('CORS - Referer:', referer);
  console.log('CORS - Allowlist:', allowlist);
  
  // Si no hay origin ni referer (ejemplo: Postman), permitir
  if (!origin && !referer) {
    callback(null, { 
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin']
    });
    return;
  }
  
  // Verificar el origin
  let originToCheck = origin;
  
  // Si no hay origin pero hay referer, extraer el origin del referer
  if (!origin && referer) {
    try {
      const refererUrl = new URL(referer);
      originToCheck = `${refererUrl.protocol}//${refererUrl.host}`;
    } catch (e) {
      console.error('Error parsing referer:', e);
    }
  }
  
  console.log('CORS - Origin to check:', originToCheck);
  
  // Verificar si el origin está en la allowlist
  if (allowlist.indexOf(originToCheck) !== -1) {
    callback(null, { 
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Origin']
    });
  } else {
    const error = new Error(`CORS origin not allowed: ${originToCheck}`);
    console.error(error.message);
    callback(error, { origin: false });
  }
}

export default corsOptions;
