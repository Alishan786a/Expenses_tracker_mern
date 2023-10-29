const expensesSch = require("../models/expenses");
const userSch = require("../models/user");
const incomeSch = require("../models/income");
const { sendcookies } = require("../utils/commanfn");

let userRegister = async (req, res) => {
try {
    

    let { name, email, password, code } = req.body;
   
    if (!name || !email || !password || !code) {
        return res.send({ sms: 'please complete all required fields first' })
    };
    // email verifiaction code
    let verificationCode = req.session.emailCode == code;
    let verificationEmail = req.session.email == email;

    if (!verificationCode) {
        return res.send({ sms: 'email verification code wrong' })

    }
    if (!verificationEmail) {
        return res.send({ sms: 'code does not match with your email' })

    }
    // check whatever user exist with email 
    let isExist=await userSch.findOne({email})
    if (isExist) {
        return res.send({ sms: 'user exist with this email' })
 
    }
    // expenses create for user
    let expensesId = await expensesSch.create({ transations: [] });
    if (!expensesId._id) {
        return res.send({ sms: 'please try again' })
    }
    // income create for user
    let incomeId = await incomeSch.create({ transations: [] });
    if (!incomeId._id) {
        return res.send({ sms: 'please try again' })
    }
    let user = await userSch.create({ email, password, name, expenses: expensesId._id, income: incomeId._id ,avatar:req.file.filename})
user.password=null
    sendcookies(req, res, user)
} catch (error) {
    return res.send({ sms: 'something went wrong' })
    
}
};


// login user 
let userLogin = async (req, res) => {
    let { email, password } = req.body;
    // console.log(email,password);
    try {
        if (!email || !password) {
            return res.send({ sms: "please enter email and password" })
        }

        let user = await userSch.findOne({ email }).select('+password');
        if (!user) {
            return res.send({ sms: "user not found" })
        }
        let verifyPass = await user.verifyPass(password);
        if (!verifyPass) {

            return res.send({ sms: "wrong password" });
        }
        user.password=null;
        sendcookies(req, res, user,)

    } catch (error) {

    }
}

//load user 
let loadUser = (req, res) => {

    res.send({ user: req.user })
};

// get all expenses transetions of single user
let expenses = async (req, res) => {
    let expensesId = req.user.expenses;
    try {
        let expenses = await expensesSch.findById(expensesId);
        if (!expenses) {
            return res.send({ sms: "expenses not found" });
        }
        res.send({  expenses })
    } catch (error) {
        return res.send({ sms: "somtthing went wrong" });

    }
}
// get all income transetions of single user
let income = async (req, res) => {
    let incomeId = req.user.income;
    try {
        let income = await incomeSch.findById(incomeId);
        if (!income) {
            return res.send({ sms: "expenses not found" });
        }
        res.send({ income })
    } catch (error) {
        return res.send({ sms: "somtthing went wrong" });

    }
}
// add addExpenses
let addExpenses = async (req, res) => {
    let { title, description, amount } = req.body;
    amount=Number(amount);
  
    let amountsOfAllTransection = []
    let expensesId = req.user.expenses;
  

    try {
        let expenses = await expensesSch.findById(expensesId);
        if (!expenses) {
            return res.send({ sms: "expenses not found" });
        }
        expenses.transations.push({ title, description, amount });

        expenses.transations.forEach((e) => {
            amountsOfAllTransection.push(e.amount)
        })
        switch (title) {
            case 'grocery':
                expenses.grouseryExpense += amount
                break;
            case 'medicine':
                expenses.medicianExpense += amount
                break;
            case 'fare':
                expenses.FareExpense += amount
                break;
            case 'travel':
                expenses.travelExpense += amount
                break;
            case 'education':
                expenses.educationExpense += amount
                break;
            default:
                expenses.othersExpense+=amount;
                break;
        }
        // console.log(expenses.transations);
        expenses.totalExpense+=amount;
        expenses.miniExpenseTransection = Math.min(...amountsOfAllTransection);
        expenses.maxExpenseTransection = Math.max(...amountsOfAllTransection);

        await expenses.save();
     
  
        return res.send({ sms: 'record added',expenses })
    } catch (error) {
        return res.send({ sms: 'something went wrong' })

    }

}
// add addIncome
let addIncome = async (req, res) => {
    let { title, description, amount } = req.body;
    amount=Number(amount);

    let amountsOfAllTransection = []
    let incomeId = req.user.income;
 

    try {
        let income = await incomeSch.findById(incomeId);

        if (!income) {
            return res.send({ sms: "expenses not found" });
        };

        income.transations.push({ title, description, amount });
        income.transations.forEach((e) => {
            amountsOfAllTransection.push(e.amount)
        });
        // type of income
        switch (title) {
            case 'freelancing':
                income.freelancingIncome += amount
                break;
            case 'bussiness':
                income.bussinessIncome += amount
                break;
            case 'Govt Job':
                income.govtJobIncome += amount
                break;
            case 'partnership':
                income.partnerShipIncome += amount
                break;
          
            default:
                income.otherIncome+=amount;
                break;
        }
        // total income
        income.totalIncome+=amount;
        income.miniIncomeTransection = Math.min(...amountsOfAllTransection);
        income.maxIncomeTransection = Math.max(...amountsOfAllTransection);

        // console.log(expenses.transations);
        await income.save();
        return res.send({ sms: 'record added' ,income})
    } catch (error) {
        return res.send({ sms: 'something went wrong' })

    }

}
// edit expense
let EditExpense = async (req, res) => {
    let { title, description, amount,id } = req.body;
    amount=Number(amount);
  
    let amountsOfAllTransection = []
    let expensesId = req.user.expenses;


    try {
        let expenses = await expensesSch.findById(expensesId);
        if (!expenses) {
            return res.send({ sms: "expenses not found" });
        }
    let indexOfEditTrans= expenses.transations.findIndex((e)=>e._id==id);
    let findedExpense= expenses.transations.find((e)=>e._id==id);
    // console.log(indexOfEditTrans);
         expenses.transations.splice(indexOfEditTrans,1,{ title, description, amount });

        expenses.transations.forEach((e) => {
            amountsOfAllTransection.push(e.amount)
        })
        switch (title) {
            case 'grocery':
                expenses.grouseryExpense -= findedExpense.amount
                expenses.grouseryExpense += amount
                break;
            case 'medicine':
                expenses.grouseryExpense -= findedExpense.amount

                expenses.medicianExpense += amount
                break;
            case 'fare':
                expenses.grouseryExpense -= findedExpense.amount

                expenses.FareExpense += amount
                break;
            case 'travel':
                expenses.grouseryExpense -= findedExpense.amount

                expenses.travelExpense += amount
                break;
            case 'education':
                expenses.grouseryExpense -= findedExpense.amount

                expenses.educationExpense += amount
                break;
            default:
                expenses.grouseryExpense -= findedExpense.amount

                expenses.othersExpense+=amount;
                break;
        }
        // console.log(expenses.transations);

        expenses.totalExpense-=findedExpense.amount;
        expenses.totalExpense+=amount;
        expenses.miniExpenseTransection = Math.min(...amountsOfAllTransection);
        expenses.maxExpenseTransection = Math.max(...amountsOfAllTransection);

        await expenses.save();
     
  
        return res.send({ sms: 'record added',expenses })
    } catch (error) {
        return res.send({ sms: 'something went wrong' })

    }

}
// EDIT INCOME 
let EditIncome = async (req, res) => {
    let { title, description, amount,id } = req.body;
   
    amount=Number(amount);
  
    let amountsOfAllTransection = []
    let incomeId = req.user.income;


    try {
        let income = await incomeSch.findById(incomeId);
        // console.log(income);
        if (!income) {
            return res.send({ sms: "expenses not found" });
        }
    let indexOfEditTrans= income.transations.findIndex((e)=>e._id==id);
    let findedIncome= income.transations.find((e)=>e._id==id);

         income.transations.splice(indexOfEditTrans,1,{ title, description, amount });

        income.transations.forEach((e) => {
            amountsOfAllTransection.push(e.amount)
        })
        switch (title) {
            case 'freelancing':
                income.freelancingIncome -= findedIncome.amount
                income.freelancingIncome += amount
                break;
            case 'bussiness':
                income.bussinessIncome -= findedIncome.amount
                income.bussinessIncome += amount
                break;
            case 'Govt Job':
                income.govtJobIncome -= findedIncome.amount
                income.govtJobIncome += amount
                break;
            case 'partnership':
                income.partnerShipIncome -= findedIncome.amount
                income.partnerShipIncome += amount
                break;
          
            default:
                income.otherIncome -= findedIncome.amount
                income.otherIncome+=amount;
              
        }


      
        // console.log(expenses.transations);

        income.totalIncome-=findedIncome.amount;
        income.totalIncome+=amount;
        income.miniIncomeTransection = Math.min(...amountsOfAllTransection);
        income.maxIncomeTransection = Math.max(...amountsOfAllTransection);
        await income.save();
     
  
        return res.send({ sms: 'record added',income })
    } catch (error) {
        return res.send({ sms: 'something went wrong' })

    }

};
let Logout=async (req,res)=>{
    try {
        res.clearCookie('token');
        return res.send({ sms: 'logout successfuly' })
        
    } catch (error) {
        return res.send({ sms: 'Could not logout' })
        
    }

}
module.exports = { userRegister, userLogin, loadUser, expenses, income, addExpenses, addIncome,EditExpense,EditIncome ,Logout}