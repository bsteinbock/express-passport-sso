import { Router } from 'express';
import { isUserAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.get('/auth/user', isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

export default router;
