const express=require('express');
const mongoose=require('mongoose');
// const ArtContact=require('./modules/contact');
const path=require('path');
const app=express();
const morgan=require('morgan');
//modules
const Order=require('./modules/order');
const User=require('./modules/user');
const authroute=require('./routes/auth');

// const passport=require('passport');
const flash=require('connect-flash');
const session=require('express-session');
const cookieParser=require('cookie-parser');
const validator = require('express-validator');
// var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

const cheerio = require('cheerio');
const axios=require('axios');

require("./db/conn");
// require("./config/passport");
// const User=require('./modules/user');

//body parser middle ware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'mysupersecret', 
    resave: false, 
    saveUninitialized: true,
    // store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { secure:true}
}));

app.use(flash());
const cors = require("cors");

app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));

app.listen(8080,()=>{
    console.log('Listening on port 8080');
});

const { requireAuth,checkUser }=require('./middleware/authMiddleware');

// app.get('*',checkUser);
// app.use('/',authroute);

app.get('/dashboard',(req,res)=>{
    // res.sendFile("./views/index.html",{ root: __dirname});
    // res.locals.user && res.locals.user.isArtist?
    // res.send("hello")
    console.log("hello")
    res.redirect('/')
    // res.render("dashboard")
    // :res.render("index");
})
app.get('/about',(req,res)=>{
    // res.sendFile('./views/about.html',{root:__dirname});
    res.render("about");
})
app.get('/reg',(req,res)=>{
    res.send("hello")
})
const maxAge=3*24*60*60;
const createToken=(id)=>{
    return jwt.sign({ id },'My Super Secret',{
        expiresIn:maxAge
    });
}

const handleError=(err)=>{  
    console.log(err.message);
    let error={email:"",password:""};

    //validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            // console.log(properties);
            error[properties.path]=properties.message;
        });
    }
    return error
}
const jwt=require('jsonwebtoken');
app.post('/register',async (req,res)=>{
    // return req
    console.log(req,res)
    const name=req.body.name;
    const email=req.body.email;
    const isSeller=true;
    let password=req.body.password;
    try{
        // password=await bcrypt.hash(password,10);
        const registerEmployee=new User({
            name:name,
            email:email,
            password:password,
            isSeller:isSeller,
        })
        // console.log(name,password,email);
        const user= await registerEmployee.save();
        // console.log(user);
        const token=createToken(user._id);
        res.set('Access-Control-Allow-Origin', '*');
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json(user)
        // res.redirect('/login');
    }catch(error){
        if(error.code===11000){
            res.json({ststus:"error", error:"You are already registered! Email is already exist"});
        }
        else{
            const err=handleError(error);
            res.status(400);
            throw new Error("User not found");
        }
    }
})

app.post('/login',async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;

    try{
        const user=await User.login(email,password);
        const token=createToken(user._id);
        res.set('Access-Control-Allow-Origin', '*');
        res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(200).json(user)

    }catch(error){
        res.status(401);
        // throw new Error("Invalid Email or Password");
        res.json(error)
    }
})

app.post('/logout',requireAuth,(req,res)=>{
    res.cookie("jwt","",{maxAge:1});
    res.json(null)
    // res.redirect('/');
})
app.get('/test',(req,res)=>{
    res.send("Hello this is for testing purpose!")
})