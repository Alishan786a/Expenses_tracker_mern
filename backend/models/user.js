let mongoose=require('mongoose');
let jwt=require('jsonwebtoken')
let bcryptjs=require('bcryptjs')
let userSch=new mongoose.Schema({
    name:String,
    email:String,
    password:{
        type:String,
        select:false
    },
    avatar:String,
  
    joiningDate:{
        type:Date,
        default:Date.now()
    },
    role:{
        type:String,
        default:'user'
    },
    expenses:{
        type:mongoose.Schema.ObjectId,
        ref:'expenses'
    },
    income:{
        type:mongoose.Schema.ObjectId,
        ref:'income'
    }
});
userSch.methods.jwtToken=async function (){
    
let token=await jwt.sign({id:this.id},process.env.JWTPAYLOAD,{expiresIn:'7 days'});
return token;
}
// compair password
userSch.methods.verifyPass=async function (pass){
let verify=await bcryptjs.compare(pass,this.password);
return verify;
}

userSch.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10)
    }
    next()

});

module.exports=mongoose.model('users',userSch)