import { Router } from 'express';
import User from '../models/user.js';
import jsonwebtoken from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log('Error: ', err);
    }
  );

  if (!userWithEmail)
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });

  if (userWithEmail.password !== password)
    return res
      .status(400)
      .json({ message: 'Email or password does not match!' });

  const jwtToken = jsonwebtoken.sign(
    { id: userWithEmail.id, email: userWithEmail.email },
    process.env.JWT_SECRET
  );

  res.json({ message: 'Welcome Back!', token: jwtToken });
});

export default router;
