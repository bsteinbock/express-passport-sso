import passport from 'passport';
import { ExtractJwt as _ExtractJwt, Strategy } from 'passport-jwt';
const ExtractJwt = _ExtractJwt;
const StrategyJwt = Strategy;
import User from '../models/user.js';

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload, done) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
