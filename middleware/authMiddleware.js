const jwt =require('jsonwebtoken');
const User = require('../modules/user');

const requireAuth=async (req,res,next)=>{
    const token=req.cookies.jwt;

    if(token){
        jwt.verify(token,"My Super Secret",(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
            else{
                console.log(decodedToken);
                // let user=await User.findById(decodedToken.id);
                // res.locals.user=user;
                next();
            }
        })
    }
    else{
        res.status(401);
        throw new Error("Not authorized, token failed");
    }
}

const checkUser=(req,res,next)=>{
    const token=req.cookies.jwt;
    if(token){
        jwt.verify(token,"My Super Secret",async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                res.locals.user=null;
                next();
            }
            else{
                console.log(decodedToken);
                let user=await User.findById(decodedToken.id);
                res.locals.user=user;
                next();
            }
        })
    }
    else{
        res.locals.user=null;
        next();
    }
}
module.exports={ requireAuth,checkUser };