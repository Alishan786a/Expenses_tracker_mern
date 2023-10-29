import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useSelector } from 'react-redux';

export default React.memo(function UnserInfoChart() {
  let {user} =useSelector((e)=>e.userAuthenticate);
  let {expenses} =useSelector((e)=>e.getAllExpensesReducer);
  let {income} =useSelector((e)=>e.getAllIncomeReducer);

  let [GhData,setGhData]=React.useState([0,0,0,0])

React.useEffect(()=>{
if(user && income && expenses){
  let profit=income? income.totalIncome<expenses.totalExpense? 0:income.totalIncome-expenses.totalExpense :0
  let loss=income? income.totalIncome>expenses.totalExpense? 0:expenses.totalExpense-income.totalIncome:0
       
  setGhData([income? income.totalIncome:0, expenses? expenses.totalExpense:0,profit,loss])
}

},[user,income,expenses])
  return (
    <>
  
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['income','expenses','profit','loss'] }]}
      series={[{ data: GhData  }]}
     
      height={300}
      
      
    />
      </>
  );
})