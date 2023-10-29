import React, { useEffect } from 'react'
import UserInfoCard from './dashboardCom/UserInfocard'
import IncomeCard from './dashboardCom/incomeCard'
import ExpensesCard from './dashboardCom/expenses'
import { getAllExpensesAction, getAllIncomeAction } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux'
export default React.memo(function Dashboard() {
let dispatch = useDispatch();
 let { expenses } = useSelector((e) => e.getAllExpensesReducer);
 let { income } = useSelector((e) => e.getAllIncomeReducer);
useEffect(()=>{
dispatch(getAllExpensesAction())
dispatch(getAllIncomeAction());

},[dispatch])


return (
<div className='container' style={{marginTop:'80px'}}>
  
  <div className="row mt-5">
    <div className="col">
  {((income? Object.keys(income).length!=0:false) && (expenses? Object.keys(expenses).length!=0:false)) && <UserInfoCard />}
    </div>



  </div>
  <div className="row mt-5">
    <div className="col">
      {(income? Object.keys(income).length!=0:false) && <IncomeCard />}
    </div>
  </div>

  <div className="row mt-5">
    <div className="col">
    {(expenses? Object.keys(expenses).length!=0:false) &&<ExpensesCard />}
    </div>



  </div>

</div>



);
})