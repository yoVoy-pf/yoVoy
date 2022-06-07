import {Router} from 'express'
export const router = Router();
import {registerUser, loginUser} from '../controllers/auth'

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)


router.post('/organization/register', () => {})
router.post('/organization/login', () => {})

