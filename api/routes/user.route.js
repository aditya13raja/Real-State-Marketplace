import express from 'express';
import {test, updateUser} from '../controllers/user.controller.js';
import { validUser } from '../utils/validUser.js';

const router = express.Router();

router.get('/test', test);

router.post('/update/:id',validUser, updateUser);

export default router;