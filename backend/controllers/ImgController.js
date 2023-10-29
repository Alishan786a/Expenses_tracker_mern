
let path=require('path')
let sendImg=(req,res)=>{
   try {
    let {id}=req.params;
let imgPath=path.join(__dirname,'../','avatars',id);
res.sendfile(imgPath)

   } catch (error) {
    res.send({sms:'something went wrong'})
   }
   
};
module.exports={sendImg}