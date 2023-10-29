let app=require('./app');
let PORT=3500;
let env=require('dotenv');


env.config({path:'backend/config/.env'})
app.listen(PORT,()=>{
    console.log(`server is listing on port ${PORT} `);
})