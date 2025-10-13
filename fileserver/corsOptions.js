import dotenv from 'dotenv';
dotenv.config();

const domain1 = process.env.ALLOW_DOMAIN1;
const domain2 = process.env.ALLOW_DOMAIN2;
var allowlist = [domain1, domain2];

const corsOptions = function(req, callback){

  const origin = req.get('Origin');
  const referer = req.get('Referer');

  console.log('origin: ',origin);
  console.log('referer: ',referer);
  const error = new Error('CORS origin not allowed');

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
  // console.log(allowlist);
  if (allowlist.indexOf(originToCheck) !== -1) {
    callback(null, { origin: true});
  } else {
    callback(error, {origin: false});
  }  
}

export default corsOptions;
