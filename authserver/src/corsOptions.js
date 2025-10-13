import dotenv from 'dotenv';
dotenv.config();

const domain1 = process.env.ALLOW_DOMAIN1;
const domain2 = process.env.ALLOW_DOMAIN2;
const domain3 = process.env.ALLOW_DOMAIN3;
var allowlist = [domain1, domain2, domain3];

const corsOptions = function(req, callback){
  // Permitir todas las peticiones temporalmente para debug
  callback(null, { origin: true});
}

export default corsOptions;
