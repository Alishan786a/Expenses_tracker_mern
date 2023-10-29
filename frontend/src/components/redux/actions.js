import axios from "axios"
import { ADDEXPENSESFAIL, ADDEXPENSESREQ, ADDEXPENSESSUCC, ADDINCOMEFAIL, ADDINCOMEREQ, ADDINCOMESUCC, CLEARERRORANDSMS, EDITEXPENSESFAIL, EDITEXPENSESREQ, EDITEXPENSESSUCC, EDITINCOMEFAIL, EDITINCOMEREQ, EDITINCOMESUCC, EMAILVERIFICATIONFAIL, EMAILVERIFICATIONREQ, EMAILVERIFICATIONSUCC, GETALLEXPENSESREQ, GETALLEXPENSESSUCC, GETALLINCOMESFAIL, GETALLINCOMESREQ, GETALLINCOMESSUCC, LOADUSERFAIL, LOADUSERREQ, LOADUSERSUCC, LOGINFAIL, LOGINREQ, LOGINSUCC, LOGOUTUSERFAIL, LOGOUTUSERREQ, LOGOUTUSERSUCC, SIGNUPFAIL, SIGNUPREQ, SIGNUPSUCC } from "./const"

// login user action
export let loginAction=(formdata)=>async (dispatch)=>{
  
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:LOGINREQ});
        let {data}=await axios.post('http://localhost:3500/user/login',formdata,options)
        dispatch({type:LOGINSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:LOGINFAIL,payload:error})
        
    }

}

export let registerUserAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"multipart/form-data"},
            withCredentials:true
        };

        dispatch({type:SIGNUPREQ});
        let {data}=await axios.post('http://localhost:3500/user/register',formdata,options)
        dispatch({type:SIGNUPSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:SIGNUPFAIL,payload:error})
        
    }

}

// load user 
export let loadUserAction=()=>async (dispatch)=>{
   
    try {
      
        dispatch({type:LOADUSERREQ});
        let {data}=await axios('http://localhost:3500/user/me',{withCredentials:true})
        dispatch({type:LOADUSERSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:LOADUSERFAIL,payload:error})
        
    }

}
// Send email verification code 

export let emailVerificationAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:EMAILVERIFICATIONREQ});
        let {data}=await axios.post('http://localhost:3500/user/email/verification',formdata,options)
        dispatch({type:EMAILVERIFICATIONSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:EMAILVERIFICATIONFAIL,payload:error})
        
    }

}
// add income

export let addIncomeAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:ADDINCOMEREQ});
        let {data}=await axios.post('http://localhost:3500/user/income/transection',formdata,options)
        dispatch({type:ADDINCOMESUCC,payload:data})
        
    } catch (error) {
        dispatch({type:ADDINCOMEFAIL,payload:error})
        
    }

}
// ADD new expenses
export let addExpensesAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:ADDEXPENSESREQ});
        let {data}=await axios.post('http://localhost:3500/user/expenses/transection',formdata,options)
        dispatch({type:ADDEXPENSESSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:ADDEXPENSESFAIL,payload:error})
        
    }

};

export let clearErrorAndSms=()=>(dispatch)=>{
    dispatch({type:CLEARERRORANDSMS})
}
// GET ALL LIST OF INCOME TRANSECTIONS
export let getAllIncomeAction=()=>async (dispatch)=>{
  
    try {
   
        dispatch({type:GETALLINCOMESREQ});
        let {data}=await axios('http://localhost:3500/user/income/transection',{withCredentials:true})
        dispatch({type:GETALLINCOMESSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:GETALLINCOMESFAIL,payload:error})
        
    }

};
export let getAllExpensesAction=()=>async (dispatch)=>{
   
    try {
   
        dispatch({type:GETALLEXPENSESREQ});
        let {data}=await axios('http://localhost:3500/user/expenses/transection',{withCredentials:true})
        dispatch({type:GETALLEXPENSESSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:GETALLINCOMESFAIL,payload:error})
        
    }

};
// edit expenses
export let editExpensesAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:EDITEXPENSESREQ});
        let {data}=await axios.put('http://localhost:3500/user/expenses/transection',formdata,options)
        dispatch({type:EDITEXPENSESSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:EDITEXPENSESFAIL,payload:error})
        
    }

};
export let editIncomeAction=(formdata)=>async (dispatch)=>{
   
    try {
        let options={
            headers:{'Content-type':"application/json"},
            withCredentials:true
        };

        dispatch({type:EDITINCOMEREQ});
        let {data}=await axios.put('http://localhost:3500/user/income/transection',formdata,options)
        dispatch({type:EDITINCOMESUCC,payload:data})
        
    } catch (error) {
        dispatch({type:EDITINCOMEFAIL,payload:error})
        
    }

};

export let logoutAction=()=>async(dispatch)=>{
    try {
        dispatch({type:LOGOUTUSERREQ})
        let {data} =await axios('http://localhost:3500/user/logout',{withCredentials:true})
        dispatch({type:LOGOUTUSERSUCC,payload:data})
        
    } catch (error) {
        dispatch({type:LOGOUTUSERFAIL})
        
    }
}