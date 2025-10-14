/* eslint-disable no-console */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import corsOptions from './config/corsConfig.js';
import routes from './routes/routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use((err, req, res, next) => {
  if (err && err.message === 'CORS origin not allowed') {
    console.log('acceso no autorizado: ', new Date());
    res.writeHead(403, { Connection: 'close' });
    res.end();
  } else {
    next(err);
  }
});
app.use(express.static('public'));
app.use(express.json({ limit: '64mb' }));
app.use(express.urlencoded({ extended: true, limit: '64mb' }));

// Middleware para manejar codificación UTF-8
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

app.use('/api', routes);
app.use((req, res) => {
  res.status(404).sendFile('index.html', { root: './public' });
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
