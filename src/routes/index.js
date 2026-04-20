import { Router } from 'express';
import authRoutes from './auth.router.js';

const router = Router();

router.use('/auth', authRoutes);

export default router;
