import express from 'express';
import expressSession from 'express-session';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';

import './auth/passport.js';
import './auth/passportGoogleSSO.js';

import './models/user.js';

import { notFound, errorHandler } from './middlewares.js';
import api from './api/index.js';
import passport from 'passport';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
