import express from 'express';
import { deleteUserById, getUsers } from '../schema/loginSchema';

export const getAllUsers=async(req:express.Request,res:express.Response)=>{
    try{
        const users=await getUsers();

        return res.status(200).json(users);
    }catch(error){
        console.log(error);
        return res.status(400).json({
            error:error?.message
        });
    }
}

export const deleteUsers=async(req:express.Request,res:express.Response)=>{
    try{
        const {id}=await req.params;
        const deleteUsers=await deleteUserById(id)

        return res.json(deleteUsers);
    }catch(error){
        console.log(error);
        return res.status(400).json({
            error:error?.message
        });
    }
}