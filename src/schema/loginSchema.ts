import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    authentication:{
        password:{type:String,required:true,select:false},
        salt:{type:String,select:false},
        sessionToken:{type:String,select:false},
    }
})
export const  UserModel=mongoose.model('user',userSchema);

export const getUsers=()=>UserModel.find();
export const getUsersByEmail=(email:String)=>UserModel.findOne({email});
export const getUsersBySessionToken=(sessionToken:String)=>UserModel.findOne({
    'authentication.sessionToken':sessionToken,
});
export const getUserById=(id:String)=>UserModel.findById(id);
export const createUsers=(values:Record<string,any>)=>new UserModel(values).save().then((user)=>user.toObject());
export const deleteUserById =(id:String)=>UserModel.findOneAndDelete({ _id:id});
export const updateUserById=(id:string,values:Record<string,any>)=>UserModel.findByIdAndUpdate(id,values);