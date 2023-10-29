let express=require('express');
let {sendImg} =require('../controllers/ImgController.js')
let ImgRoute=express.Router();
ImgRoute.route('/:id').get(sendImg)
module.exports=ImgRoute