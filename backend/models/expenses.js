let mongoose=require('mongoose');
let expensesSch=new mongoose.Schema({
    grouseryExpense:{
        type:Number,
        default:0
    },
    FareExpense:{
        type:Number,
        default:0
    },
   medicianExpense:{
        type:Number,
        default:0
    },
    travelExpense:{
        type:Number,
        default:0
    },  
        othersExpense:{
        type:Number,
        default:0
    },
    educationExpense:{
        type:Number,
        default:0
    },
    miniExpenseTransection:{
        type:Number,
        default:0
    },
    maxExpenseTransection:{
        type:Number,
        default:0
    },
    totalExpense:{
        type:Number,
        default:0
    },
   transations:[
    {
        title:String,
        description:String,
      
        amount:Number,
        date:{
            type: Date,
        default: Date.now
        }
    }
   ]

});
module.exports=mongoose.model('expenses',expensesSch)