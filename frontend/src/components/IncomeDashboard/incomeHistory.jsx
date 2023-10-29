import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import Edit from '@mui/icons-material/Edit';
import AccountBalance from '@mui/icons-material/AccountBalance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorAndSms, getAllIncomeAction } from '../redux/actions';
import EditPopupIncomeModal from './EditIncomeModel'
import { Link } from 'react-router-dom';
export default React.memo(function IncomeDashboard() {
let dispatch = useDispatch();
let [editIncomeModel,setEditIncomeModel]=React.useState(false)
let [incomeId,setIncomeId]=React.useState('')
let [incomeRowData,setIncomeRowData]=React.useState([])
let {income,sms,error} =useSelector((e)=>e.getAllIncomeReducer);

let OpenIncomePopupModel=(id)=>{
setIncomeId(id)
setEditIncomeModel(true);
}

const columns = [
{ field: 'title', headerName: 'Title', minWidth: 110,flex:1,sortable:false, disableColumnMenu:true },
{
field: 'description',
headerName: 'Description',
minWidth: 250,
sortable:false,
flex:1.5,
disableColumnMenu:true


},
{
field: 'amount',
headerName: 'Amount',
minWidth: 150,
type:'number',
flex:1

},
{
field: 'date',
headerName: 'Date',
type: 'date',
minWidth: 110,
maxWidth:110,
flex:1

},
{
field: 'action',
headerName: 'Action',
description: 'Edit your icome record',
sortable: false,
type:'number',
disableColumnMenu:true,
minWidth: 100,
maxWidth:100,
flex:1,
renderCell: (params) =>{
return <div className='btn btn-outline-myclr' onClick={()=>OpenIncomePopupModel(params.id)}>
  <Edit />
</div>
}
},
];

let rows=incomeRowData;
React.useEffect(()=>{
if(income){
let myincomeData=[];
income.transations.forEach((e,i)=>{
myincomeData.push( { id: e._id,title:e.title, description: e.description, amount: e.amount, date: new Date(e.date) })

})
setIncomeRowData(myincomeData)
}
},[income]);
React.useEffect(()=>{
  if(sms){
  dispatch(clearErrorAndSms())
  
  setEditIncomeModel(false);
  }
  },[sms,error]);
React.useEffect(()=>{
dispatch(getAllIncomeAction())
},[dispatch])
return (
<>
  {editIncomeModel &&
  <EditPopupIncomeModal setEditModel={setEditIncomeModel} incomeId={incomeId} />}

  <div className='container mt-5'>
    <div className="row bg-white my-4 rounded py-3">
      <div className='col'>
        <Link to='/dashboard' className='goBackLink'>
<ArrowBackIcon />
        </Link>
        <AccountBalance className='mb-2' />
        <h3 className='myclr ms-3  d-inline-block'>Here is your Income transection history</h3>
      </div>
    </div>
    <div className="row">


      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid className='bg-white px-2' rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[ 10]}
          autoHeight disableSelectionOnClick />
      </Box>
    </div>

  </div>
</>
);
})