const mongoose=require('mongoose');
const { isEmail }=require('validator');
const bcrypt=require('bcrypt');


const sellerSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: [isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        minlength:[4,'Minimum password length is 4 characters']
    },
    isSeller:{
        type:Boolean,
        required:true,
    }
})
// sellerSchema.methods.encryptPassword= (password)=>{
//     return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
// }
// sellerSchema.methods.validPassword=(password)=>{
//     return bcrypt.compareSync(password,this.password);
// }

// sellerSchema.pre('save', async function(next){
//     const salt=await bcrypt.genSalt();
//     this.password=await bcrypt.hash(this.password,salt);
//     next();
// })

// //static method to login user
// sellerSchema.statics.login=async function(email,password){
//     const user=await this.findOne({email});
//     if(user){
//         const auth=bcrypt.compare(password,user.password);
//         if(auth){
//             return user;
//         }
//         throw Error("Incorrect password");
//     }
//     throw Error("Incorrect Email");
// }


const User= new mongoose.model("User",sellerSchema);
module.exports=User;