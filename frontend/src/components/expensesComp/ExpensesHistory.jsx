import * as React from 'react';
import Box from '@mui/material/Box';
import  {DataGrid}  from '@mui/x-data-grid';
import Edit from '@mui/icons-material/Edit';
import AccountBalance from '@mui/icons-material/AccountBalance';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrorAndSms, getAllExpensesAction } from '../redux/actions';
import EditPopupExpensesModal from './EditExpensesPopup'
import { Link } from 'react-router-dom';

export default React.memo(function ExpensesHistory() {
let {expenses,sms,error} =useSelector((e)=>e.getAllExpensesReducer);
let [rowsData,setRowsData]=React.useState([])
let [expenseId,setExpenseId]=React.useState('')
let [editModel,setEditModel]=React.useState(false)
let dispatch = useDispatch();

let OpenPopupModel=(id)=>{
setExpenseId(id)
setEditModel(true);
}


const columns = [
{ field: 'title', headerName: 'Title', minWidth: 100,maxWidth: 110,flex:1,sortable:false, disableColumnMenu:true },
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
maxWidth: 110,
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
flex:1,
renderCell: (params) =>{
return <div className='btn btn-outline-myclr' onClick={()=>OpenPopupModel(params.id)}>
  <Edit />
</div>
}
},
];
const rows=rowsData;
React.useEffect(()=>{
if(expenses){
let myRowsdata=[]
expenses.transations.forEach((e,i)=> {
myRowsdata.push( { id: e._id,title:e.title, description: e.description, amount: e.amount, date:new Date(e.date) })
});
setRowsData(myRowsdata)
}


},[expenses]);

React.useEffect(()=>{
if(sms){
dispatch(clearErrorAndSms())

setEditModel(false);
}
},[sms,error]);

React.useEffect(()=>{
if(sms){
dispatch(clearErrorAndSms())

setEditModel(false);
}
dispatch(getAllExpensesAction())
},[dispatch])
return (
<>
  {editModel &&
  <EditPopupExpensesModal setEditModel={setEditModel} expenseId={expenseId} />}

  <div className='container mt-5'>
    <div className="row bg-white my-4 rounded py-3">
      <div className='col'>
      <Link to='/dashboard' className='goBackLink'>
<ArrowBackIcon />
        </Link>
        <AccountBalance className='mb-2' />
        <h3 className='myclr ms-3  d-inline-block'>Here is your Expenses transection history</h3>
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