import {Router} from 'express'
export const router = Router();
import { checkOrigin } from '../middlewares/checkOrigin';
import {getUsers,getUser,createUser,deleteUser} from '../controllers/users'

router.get('/', checkOrigin, getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
