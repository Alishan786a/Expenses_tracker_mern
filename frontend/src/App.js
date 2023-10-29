import React, { Suspense, lazy,useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { loadUserAction } from './components/redux/actions';
import { useDispatch } from 'react-redux';
import Loading from './components/Loading';

let PrivateRoute=lazy(()=>import('./components/PrivateRoute'))
let Dashboard=lazy(()=>import('./components/dashboard'))
let LoginAdnSignupPg=lazy(()=>import('./components/LoginAndSignup'))
let LandingPg=lazy(()=>import('./components/landingPg'))
let IncomeHistory=lazy(()=>import('./components/IncomeDashboard/incomeHistory'))
let ExpensesHistory=lazy(()=>import('./components/expensesComp/ExpensesHistory'))


function App() {
  let dispatch= useDispatch()
  useEffect(()=>{
dispatch(loadUserAction())
},[])
  return (
    <Router>
   
 <Suspense fallback={<Loading/>}>
      <Routes>
    <Route path='/' element={<LandingPg/>}/>
    <Route  Component={PrivateRoute}>
    <Route exect path='/dashboard' element={<Dashboard/>}/>
    <Route exect path='/dashboard/income' element={<IncomeHistory/>}/>
    <Route exect path='/dashboard/expenses' element={<ExpensesHistory/>}/>
    </Route>
    <Route path='/login' element={<LoginAdnSignupPg/>}/>
    


      </Routes>
   
      </Suspense>
   </Router>
  );
}

export default App;
