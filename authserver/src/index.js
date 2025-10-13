import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import corsOptions from "./corsOptions.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.use('/auth', routes);

app.use(cors(corsOptions), (err, req, res, next) =>{
  if(err && err.message === 'CORS origin not allowed'){
    console.log("acceso no autorizado: ", new Date());
    res.writeHead(403, {'Connection': 'close'});
    res.end();
  } else{
    next(err);
  }
});


app.listen(port, () => {
    console.log(`running on port ${port}`);
})