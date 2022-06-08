import {Router} from 'express'
export const router = Router();
import {registerUser, loginUser, handleRefreshToken} from '../controllers/auth'

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/refresh-token', handleRefreshToken)


router.post('/organization/register', () => {})
router.post('/organization/login', () => {})

