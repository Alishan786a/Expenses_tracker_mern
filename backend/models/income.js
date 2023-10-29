let mongoose=require('mongoose');
let incomeSch=new mongoose.Schema({
    freelancingIncome:{
        type:Number,
        default:0
    },
    bussinessIncome:{
        type:Number,
        default:0
    },
   govtJobIncome:{
        type:Number,
        default:0
    },
    partnerShipIncome:{
        type:Number,
        default:0
    }, 
    miniIncomeTransection:{
        type:Number,
        default:0
    },
    maxIncomeTransection:{
        type:Number,
        default:0
    },
    otherIncome:{
        type:Number,
        default:0
    }, 
    totalIncome:{
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
module.exports=mongoose.model('income',incomeSch)