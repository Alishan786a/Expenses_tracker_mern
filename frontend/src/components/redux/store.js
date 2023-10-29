import {applyMiddleware, createStore} from 'redux'
import { combineReducers } from 'redux'
import {userAuthenticate,emailVerification,getAllExpensesReducer,getAllIncomeReducer} from './reducers'
import thunk from 'redux-thunk'

let initialState={}
let allReducers=combineReducers({
    userAuthenticate,
    emailVerification,
 
    getAllExpensesReducer,
    getAllIncomeReducer
})
export let store=createStore(allReducers,initialState,applyMiddleware(thunk))