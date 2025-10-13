import express from "express";
import filesRouter from "./files/files.js";
import dotenv from 'dotenv'
import corsOptions from "../corsOptions.js";
import cors from "cors";

dotenv.config()

const app = express();
const port = process.env.PORT || 5002;

app.use("/files/files", filesRouter);

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
    console.log(`Running on port ${port}`);
})