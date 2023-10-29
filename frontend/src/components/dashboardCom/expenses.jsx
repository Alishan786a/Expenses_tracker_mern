import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBListGroup, MDBListGroupItem, MDBBadge 
} from 'mdb-react-ui-kit';
import { PieChart } from '@mui/x-charts/PieChart';
import LaunchIcon from '@mui/icons-material/Launch';

import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PopupExpensesModal from './expensesModel';

export default React.memo(function ExpensesCard() {


  let dispatch=useDispatch()
  let {expenses,loading:expensesLoading} =useSelector((e)=>e.getAllExpensesReducer);

  let selectExpensesOpt=['grocery','medicine','fare','travel','education','other']
  let [GhData,setGhData]=React.useState({Grocery:0,Medicine:0,Education:0,Travel:0,Fare:0,other:0})


useEffect(()=>{
  if (expenses) {
    
    setGhData({Grocery:expenses.grouseryExpense,Medicine:expenses.medicianExpense,Education:expenses.educationExpense,Travel:expenses.travelExpense,Fare:expenses.FareExpense,other:expenses.othersExpense})
  }

},[expenses,expensesLoading])

  return (
    <>
   
   { <MDBCard className='my-4'>
  

   <MDBCardHeader className='d-flex justify-content-between'>
        <div>

<CalculateOutlinedIcon className='mb-2'/>
        <h3 className='myclr ms-3  d-inline-block'>Expenses</h3>
        </div>
            {/* popup expenses button */}
            <PopupExpensesModal titleOpt={selectExpensesOpt} />



      </MDBCardHeader>
      <MDBCardBody>
        <div className="row">

      
      <div className="col-md-6">
      <MDBListGroup style={{ minWidth: '22rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Expenses transections
        <MDBBadge pill light className='mybgclr'>
          {expenses? expenses.transations.length : 0}
        </MDBBadge>
      </MDBListGroupItem>

      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Expenses
        <MDBBadge pill light className='mybgclr'>
        {expenses? expenses.totalExpense:0}
          
        </MDBBadge>
      </MDBListGroupItem>

      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Mini Expenses transection
        <MDBBadge pill light className='mybgclr'>
        { expenses? expenses.miniExpenseTransection : 0}

        </MDBBadge>
      </MDBListGroupItem>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Max Expenses transection
        <MDBBadge pill light className='mybgclr'>
        {expenses? expenses.maxExpenseTransection : 0}
          
        </MDBBadge>
      </MDBListGroupItem>
    </MDBListGroup>
   
      </div>
      <div className="col-md-6">

      <PieChart
      height={280}
  series={[
    {
        data:[
            { value: GhData.Grocery, label: 'Grocery' },
            { value: GhData.Medicine, label: 'Medicine' },
            { value: GhData.Education, label: 'Education' },
            { value: GhData.Travel, label: 'Travel' },
            { value: GhData.Fare, label: 'Fare' },
            { value: GhData.other, label: 'other' }
          ],
      innerRadius: 15,
      outerRadius: 110,
      paddingAngle: 2,
      cornerRadius: 5,
      startAngle: -90,
      endAngle: 360,
      cx: 150,
      cy: 150,
    }]}
/>


      </div>
      </div>
   
<Link to='/dashboard/expenses' className='btn mybgclr text-white mt-3'>
  history <LaunchIcon />
</Link>

      </MDBCardBody>
      
    </MDBCard>}
    </>
  );
});