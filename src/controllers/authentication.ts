import express from 'express';

import{getUsersByEmail,createUsers} from '../schema/loginSchema';
import{authentication, random} from '../helpers/index';

export const login=async(req:express.Request,res:express.Response)=>{
    try{
        console.log(req.body);
        
        const {email,password}=req.body;
        if(!email||!password){
            return res.sendStatus(200);
        }
        console.log(email,password)
        const user=await getUsersByEmail(email).select('+authentication.salt +authentication.password')
        if(!user){
            return res.sendStatus(400);
        }
        const expectedHash = authentication(user.authentication.salt,password);
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(400);
        }
        console.log(expectedHash)
        const salt=random();
        user.authentication.sessionToken=authentication(salt,user._id.toString());
        await user.save();
        res.cookie('ANTONIO-AUTH',user.authentication.sessionToken,{domain:'localhost',path:'/'});
        return res.status(200).json(user).end;

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

export const register=async(req:express.Request,res:express.Response)=>{
    try{
        const{email,password,username}=req.body;
        if(!email|| !password|| !username){
            return res.sendStatus(400)
        }
        const existingUser=await getUsersByEmail(email);
        if(existingUser){
                return res.sendStatus(400)
        }
        const salt=await random();
        const user=await createUsers({
            email,
            username,
            authentication:{
                    salt,
                    password:authentication(salt,password)

            }
        });
        return res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}