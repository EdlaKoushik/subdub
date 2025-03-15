
import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:[true,'User Name is required'],
        trim:true,
        minLength:2,
        maxLength:50,  
    },
    email:{
        type:String,
        required:[true,'User Email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        minLength:5,
        maxLength:255,
        match:[/\S+@\S+\.\S+/,'please fill a valid email address'],

    },
    password:{
        type:String,
        required:[true,'User password is required'],
        minLength:6,
    }
},  {timestamps:true});//to know when the user is created and modifed

const User= mongoose.model('User',userSchema);
export default User;





// User.create({})
// {name:'John Doe','johny@email.com','password@123'}