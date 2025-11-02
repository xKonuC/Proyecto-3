import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.ALLOW_DOMAIN;
var allowlist = [domain];

const corsOptions = function(req, callback){

  const origin = req.get('Origin');
  const referer = req.get('Referrer');
  const error = new Error(`ORS origin not allowed ${origin} ${referer}`);
  let originToCheck = origin;  

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
