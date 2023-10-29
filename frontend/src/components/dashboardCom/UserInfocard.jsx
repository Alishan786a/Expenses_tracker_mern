import React, { useCallback, useMemo, useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { MDBListGroup, MDBListGroupItem, MDBBadge } from 'mdb-react-ui-kit';
import UnserInfoChart from './userInfoChart';
import pic from '../../asserts/my.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../redux/actions';
import Card from 'react-bootstrap/Card';
import { useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

export default React.memo(function UserInfoCard() {
  let dispatch = useDispatch();
  let [profit,setProfit]=useState(0);
  let [loss,setLoss]=useState(0);
  let [totalTrans,setTotalTran]=useState(0);
  let [incomestate,setIncomestate]=useState(0);
  let [expensesState,setExpensesState]=useState(0);
  
  let { user } = useSelector((e) => e.userAuthenticate);
  let { expenses } = useSelector((e) => e.getAllExpensesReducer);
  let { income } = useSelector((e) => e.getAllIncomeReducer);

  useEffect(()=>{
    if(income && expenses){
      setTotalTran((income && expenses)? expenses.transations.length+income.transations.length :0)
      setProfit((income && expenses)? income.totalIncome<expenses.totalExpense? 0:income.totalIncome-expenses.totalExpense :0);
      setLoss((income && expenses)?  income.totalIncome>expenses.totalExpense? 0:expenses.totalExpense-income.totalIncome:0)
      setIncomestate(income?income.totalIncome:0);
      setExpensesState(expenses?expenses.totalExpense:0);
    
    }
    
  },[expenses,income])

  let changeDateFormate=useMemo((date)=>{
    let formate=new Date(user.joiningDate);
    return formate.toDateString()
   },[user]);
  return (
    <>
  
    
      <Card>
          <Card.Header>
          
        <div className='container-fluid'>
            <div className="row">
                <div className="col-8">
                    <h3 className='mb-0'>{user? user.name:''}
           
        <LogoutIcon className='fs-5 ms-3 mb-1 myclr' onClick={()=>dispatch(logoutAction())}/>
                   
    </h3>
                    <small>{user? user.email:''}</small><br/>
                    <small>joning date:{changeDateFormate}</small>

                </div>
                <div className="col-4 d-flex flex-column justify-content-center align-items-end">
             
                    <div className='userInfoPic '>

                    <img src={user? `http://localhost:3500/img/${user.avatar}`:pic} alt="" />
                    </div>
                </div>
            </div>

        </div>
          </Card.Header>
          <Card.Body>


    <Row >
        <Col className="col-md-6">

<MDBListGroup style={{ minWidth: '22rem' }} light>
<MDBListGroupItem className='d-flex justify-content-between align-items-center'>
Total transections
<MDBBadge pill light className='mybgclr'>
{totalTrans}
</MDBBadge>
</MDBListGroupItem>

<MDBListGroupItem className='d-flex justify-content-between align-items-center'>
Income
<MDBBadge pill light className='mybgclr'>

{incomestate}

</MDBBadge>
</MDBListGroupItem>

<MDBListGroupItem className='d-flex justify-content-between align-items-center'>
Expenses
<MDBBadge pill light className='mybgclr'>
{expensesState}

</MDBBadge>
</MDBListGroupItem>
<MDBListGroupItem className='d-flex justify-content-between align-items-center'>
Profit
<MDBBadge pill light className='mybgclr'>
  
{profit}
</MDBBadge>
</MDBListGroupItem>
<MDBListGroupItem className='d-flex justify-content-between align-items-center'>
Loss
<MDBBadge pill light className='mybgclr'>
{loss}

</MDBBadge>
</MDBListGroupItem>
</MDBListGroup>
</Col>

<div className="col-md-6 d-flex justify-content-center">
<UnserInfoChart />


 </div>
    </Row>

</Card.Body>
        </Card> 
   
    </>
  );
}
);
