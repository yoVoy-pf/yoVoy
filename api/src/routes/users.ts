import {Router} from 'express'
export const router = Router();
import { authenticateToken } from '../middlewares/authenticateToken';
import {getUsers,getUser,createUser,deleteUser} from '../controllers/users'

router.get('/getTest', getUsers)
router.get('/', authenticateToken, getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
