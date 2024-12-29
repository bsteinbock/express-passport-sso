import { Router } from 'express';
import passport from 'passport';
import { isUserAuthenticated } from '../middlewares/auth.js';

const router = Router();

const successLoginUrl = 'http://localhost:3001/login/success';
const errorLoginUrl = 'http://localhost:3001/login/error';

router.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureMessage: 'Cannot login to Google, please try again later!',
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  }),
  (req, res) => {
    console.log('User: ', req.user);
    res.send('Thank you for signing in!');
  }
);

router.get('/auth/google/protected', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('----------------------------- req ');
    console.log(req.user);
    const fullName = req.user.fullName;
    const googleId = req.user.googleId;
    const dbId = req.user.id;
    res.send(
      `Hello ${fullName} googleId=(${googleId}) databaseId=(${dbId}) - Thank you for signing in!`
    );
  } else {
    res.status(401).send('You need to login to access this page!');
  }
});

export default router;
