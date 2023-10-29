let nodemailer=require('nodemailer');


exports.sendEmail=(mess,token,email)=>{
    // mess can be any message that we want to send and can be token can be reset password token or email verification
    try {
        
  
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      
        service: 'gmail', // Replace with your email service provider
      auth: {
        user: process.env.EMAIL, // Your email address
        pass:process.env.EMAILPASS,  // Your email password or app password (if using 2-step verification)
      },
      });
      const mailOptions = {
        from: 'alishanwd3@gmail.com', // Sender address
        to: email, // List of recipients
        subject: mess, // Subject line
        text: token // Plain text body
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error
        } else {
            
            return true
        }
      });
    } catch (error) {
        console.log(error);
        return;
    }
}

// send cookie
exports.sendcookies=async (req,res,user,sms)=>{
try {
    let token=await user.jwtToken();
   res.cookie("token",token,{expires:new Date(Date.now()+7*24*60*60*1000), httpOnly:true}).send({
    user,acknowledge:true
   })
  

} catch (error) {
    console.log(error);
}
}