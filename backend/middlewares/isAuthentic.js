let jwt=require('jsonwebtoken');
let userSch=require('../models/user')
let isAuthentic=async (req,res,next)=>{
    let {token}=req.cookies;

try {
//    console.log(token);

    if (!token) {
        return res.send({sms:"Authdtication faild please login first"})
    };
    let tokenVarify=await jwt.verify(token,process.env.JWTPAYLOAD);
      
    let user=await userSch.findById(tokenVarify.id);

    if (!user) {
        return res.send({sms:"user not found"})
        
    };
    req.user=user;
    next();
   
    

} catch (error) {
    console.log(error);
    return res.send({sms:"something went wrong",error})

}

};


module.exports=isAuthentic;