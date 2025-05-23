const User = require("../models/user.js");

module.exports.renderSignUpForm = (req , res) =>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res) =>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email,username});
        let registeredUser = await User.register(newUser , password);
        req.login(registeredUser , (err)=>{
            if(err){
                next(err);
            }
            req.flash("success" , "Welcome to wanderlust");
            res.redirect("/listings");
        });
        // console.log(registeredUser);
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogInForm = (req,res) =>{
    res.render("users/login.ejs");
};

module.exports.LogIn = async(req,res) =>{
    req.flash("success" , "Welcome Back to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl); 
};

module.exports.LogOut = (req,res,next) =>{
    req.logOut((err) =>{
        if(err){
            next(err);
        }
        req.flash("success" , "You are Logged Out!!");
        res.redirect("/listings");
    });
};