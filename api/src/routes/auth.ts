import {Router} from 'express'
export const router = Router();
import {registerUser, loginUser, handleRefreshToken, logoutUser} from '../controllers/auth'

router.post('/user/register', registerUser)
router.post('/user/login', loginUser)
router.get('/user/refresh-token', handleRefreshToken)
router.get('/user/logout', logoutUser)


router.post('/organization/register', () => {})
router.post('/organization/login', () => {})

