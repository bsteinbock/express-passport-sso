import { Router } from 'express';
import registerApi from './register.js';
import loginApi from './login.js';
import loginWithGoogleApi from './loginWithGoogle.js';
import userApi from './user.js';

const router = Router();

router.use(registerApi);
router.use(loginApi);
router.use(loginWithGoogleApi);
router.use(userApi);

export default router;
