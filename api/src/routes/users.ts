import {Router} from 'express'
export const router = Router();
import {getUsers,getUser,createUser,deleteUser} from '../controllers/users'

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)
