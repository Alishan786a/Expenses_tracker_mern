import { ADDEXPENSESREQ, ADDEXPENSESSUCC, ADDINCOMEFAIL, ADDINCOMEREQ, ADDINCOMESUCC, CLEARERRORANDSMS, EDITEXPENSESFAIL, EDITEXPENSESREQ, EDITEXPENSESSUCC, EDITINCOMEFAIL, EDITINCOMEREQ, EDITINCOMESUCC, EMAILVERIFICATIONFAIL, EMAILVERIFICATIONREQ, EMAILVERIFICATIONSUCC, GETALLEXPENSESFAIL, GETALLEXPENSESREQ, GETALLEXPENSESSUCC, GETALLINCOMESFAIL, GETALLINCOMESREQ, GETALLINCOMESSUCC, LOADUSERFAIL, LOADUSERREQ, LOADUSERSUCC, LOGINFAIL, LOGINREQ, LOGINSUCC, LOGOUTUSERFAIL, LOGOUTUSERREQ, LOGOUTUSERSUCC, SIGNUPFAIL, SIGNUPREQ, SIGNUPSUCC } from "./const"

// handle login ,signup and load user action
const initialState = { user: null }
export let userAuthenticate = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOGINREQ:
        case SIGNUPREQ:
        case LOADUSERREQ:
        case LOGOUTUSERREQ:
            
            return { ...state, loading: true };

        case LOGINSUCC:
        case SIGNUPSUCC:
        case LOADUSERSUCC:
     

            return { ...state, sms: payload.sms, user: payload.user, loading: false }
        case LOGINFAIL:
        case SIGNUPFAIL:
        case LOADUSERFAIL:
        case LOGOUTUSERFAIL:

            return { ...state, error: payload.error, loading: false }
            case LOGOUTUSERSUCC:
            return { ...state, sms: payload.sms, user: null, loading: false }

        default:
            return state
    }
}
// EMAIL VERIFICATION CODE
export let emailVerification = (state = {}, { type, payload }) => {
    switch (type) {
        case EMAILVERIFICATIONREQ:
            return { ...state, loading: true }

        case EMAILVERIFICATIONSUCC:
            return { ...state, sms: payload.sms, loading: false };

        case EMAILVERIFICATIONFAIL:
            return { ...state, error: payload.error, loading: false }
        default:
            return state
    }

}


// get all income 
export let getAllIncomeReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GETALLINCOMESREQ:
        case ADDINCOMEREQ:
        case EDITINCOMEREQ:

            return { ...state, loading: true }

        case GETALLINCOMESSUCC:
        case ADDINCOMESUCC:
        case EDITINCOMESUCC:
            return { ...state, sms: payload.sms, income: payload.income, loading: false };

        case GETALLINCOMESFAIL:
        case ADDINCOMEFAIL:
        case EDITINCOMEFAIL:
            return { ...state, error: payload.error, loading: false }

        case CLEARERRORANDSMS:

            return { ...state, error: null, sms: null }
        default:
            return state
    }

}
export let getAllExpensesReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case GETALLEXPENSESREQ:
        case ADDEXPENSESREQ:
        case EDITEXPENSESREQ:
            return { ...state, loading: true }

        case GETALLEXPENSESSUCC:
        case ADDEXPENSESSUCC:
        case EDITEXPENSESSUCC:
            return { ...state, sms: payload.sms, expenses: payload.expenses, loading: false };

        case GETALLEXPENSESFAIL:
        case ADDINCOMEFAIL:
        case EDITEXPENSESFAIL:
            return { ...state, error: payload.error, loading: false }

        case CLEARERRORANDSMS:
            return { ...state, error: null, sms: null }
        default:
            return state
    }

}