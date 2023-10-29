import React, { useEffect } from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBListGroup, MDBListGroupItem, MDBBadge 
} from 'mdb-react-ui-kit';
import { PieChart } from '@mui/x-charts/PieChart';
import LaunchIcon from '@mui/icons-material/Launch';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {AccountBalance} from '@mui/icons-material'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import  PopupIncomeModal  from './incomeModel';
import { useDispatch, useSelector } from 'react-redux';
import { getAllIncomeAction } from '../redux/actions';
export default React.memo(function IncomeCard() {
  let [GhData,setGhData]=React.useState({freelancing:0,govtJob:0,Bussiness:0,partnership:0,other:0})
let selectOpt=['freelancing','bussiness','Govt Job','partnership','others']
  let {income,loading:incomeLoading} =useSelector((e)=>e.getAllIncomeReducer);
let dispatch = useDispatch();

 useEffect(()=>{
  if(income){
    setGhData({freelancing:income.freelancingIncome,govtJob:income.govtJobIncome,Bussiness:income.bussinessIncome,partnership:income.partnerShipIncome,other:income.otherIncome})
    }
  
 },[income,incomeLoading])
  return (
    <MDBCard className='my-4'>

      <MDBCardHeader className='d-flex justify-content-between'>
        <div>

<AccountBalance className='mb-2'/>
        <h3 className='myclr ms-3  d-inline-block'>Income</h3>
        </div>
        {/* popup incoe button */}
        <PopupIncomeModal titleOpt={selectOpt}/>




      </MDBCardHeader>
      <MDBCardBody>
        <div className="row">

      
      <div className="col-md-6">
      <MDBListGroup style={{ minWidth: '22rem' }} light>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Income transections
        <MDBBadge pill light className='mybgclr'>
        {income? income.transations.length : 0}

        </MDBBadge>
      </MDBListGroupItem>

      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
       Income
        <MDBBadge pill light className='mybgclr'>
        {income? income.totalIncome:0}

        </MDBBadge>
      </MDBListGroupItem>

      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Mini income transection
        <MDBBadge pill light className='mybgclr'>
        {income? income.miniIncomeTransection : 0}

        </MDBBadge>
      </MDBListGroupItem>
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
      Max income transection
        <MDBBadge pill light className='mybgclr'>
        {income? income.maxIncomeTransection : 0}

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
            
            { value: GhData.freelancing, label: 'freelancing' },
            { value: GhData.govtJob, label: 'Govt Job' },
            { value: GhData.Bussiness, label: 'Bussiness' },
            { value: GhData.partnership, label: 'partnership' },
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
      <Link to='/dashboard/income' className='btn mybgclr text-white mt-3'>
  history <LaunchIcon />
</Link>
      </MDBCardBody>
    </MDBCard>
  );
});