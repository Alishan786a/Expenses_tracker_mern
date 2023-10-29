let mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/expensesTracker',{ useNewUrlParser: true, useUnifiedTopology: true });
let conn=mongoose.connection;
conn.once('open',()=>{
    console.log('db connected');
})
conn.on('error',()=>{
    console.log('mongodb connection closed');
})