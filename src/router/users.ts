import express from 'express'
import { getAllUsers , deleteUsers} from '../controllers/users';
import { isAuthenticated } from "../middleware";


const router=express.Router();
export default (router:express.Router)=>{
   router.get('/auth/users',getAllUsers);
   router.get('/users/:id',deleteUsers)
}

