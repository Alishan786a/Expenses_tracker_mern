let express=require('express');
let app=express();
let bodyParser=require('body-parser');
let session=require('express-session')
let cookieParser=require('cookie-parser');
let cors =require('cors')
require('./config/dbConnection')
// middleware
app.use('*',cors({
    origin:true,
    credentials:true
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
    secret: 'expensesTrackerApp',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2*60*1000, // 5 mint in milliseconds
    },
}));
app.use('/user',require('./routes/user'));
app.use('/img',require('./routes/images'));


module.exports=app;