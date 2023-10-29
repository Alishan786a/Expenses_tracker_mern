const { sendEmail } = require("../utils/commanfn");
let session=require('express-session');

let emailVarification=async (req,res)=>{
let {email}=req.body;

if (!email) 
 return res.send({sms:"please enter email"})
  
let verificationToken=Math.round((Math.random()*1000)+10000);
// create randome token for email verification
req.session.emailCode=verificationToken;//store token in session untill emaill verified
req.session.email=email
// console.log(verificationToken);
let sentEmail=await sendEmail('please verify your email address',verificationToken,email)
  if (sentEmail) {
    
    res.send({sms:'Token sent to your email address',acknowledge:true})
  }else{
    res.send({sms:'there is an error while sending email',acknowledge:false})
  }
// res.send({verificationToken})
};

module.exports={emailVarification}