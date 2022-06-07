import {Router} from 'express'
export const router = Router();
import {registerUser} from '../controllers/auth'

router.post('/register', registerUser)
router.post('/login', () => {})

