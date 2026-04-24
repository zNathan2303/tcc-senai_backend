import { Router } from 'express';
import authRoutes from './auth.router.js';
import usuarioRoutes from './usuario.router.js';

const router = Router();

router.use(authRoutes);
router.use(usuarioRoutes);

export default router;
