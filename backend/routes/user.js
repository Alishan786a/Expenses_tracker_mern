let express=require('express');
let {emailVarification}=require('../controllers/verification.js');
const isAuthentic = require('../middlewares/isAuthentic.js');

let {userRegister,userLogin,loadUser,expenses,income,addExpenses,addIncome,EditExpense, EditIncome,Logout}=require('../controllers/user.js');
const { upload } = require('../config/multerconfig.js');
let userRoute=express.Router();
userRoute.route('/email/verification').post(emailVarification);
userRoute.route('/register').post(upload.single('avatar'),userRegister);
userRoute.route('/login').post(userLogin);
userRoute.route('/logout').get(isAuthentic,Logout);
userRoute.route('/me').get(isAuthentic,loadUser);
userRoute.route('/expenses/transection').get(isAuthentic,expenses).post(isAuthentic,addExpenses).put(isAuthentic,EditExpense);
userRoute.route('/income/transection').get(isAuthentic,income).post(isAuthentic,addIncome).put(isAuthentic,EditIncome);

module.exports=userRoute;