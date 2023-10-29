import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

import { editExpensesAction} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
let selectExpensesOpt=['grocery','medicine','fare','travel','education','other']

export default React.memo(function EditPopupExpensesModal({setEditModel,expenseId}) {
 

  const [title, setTitle] = useState('grocery');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  let {expenses} =useSelector((e)=>e.getAllExpensesReducer)


let dispatch = useDispatch()
const toggleShow = () => setEditModel(false);
let submitHandler=(e)=>{
e.preventDefault();
let inputData=new FormData(e.target);
inputData.append('id',expenseId)
  dispatch(editExpensesAction(inputData))

};

useEffect(()=>{
let findExpense=expenses.transations.find((e)=>e._id===expenseId);

setTitle(findExpense.title)
setAmount(findExpense.amount)
setDescription(findExpense.description)

},[expenseId])

  return (
    <>
     
   
      <MDBModal show={true} setShow={setEditModel} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Expenses</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
          <form onSubmit={(e)=>submitHandler(e)}>

            <MDBModalBody>
            <Form.Select aria-label="Default select example" value={title} onChange={(e)=>setTitle(e.target.value)} name="title">
              {selectExpensesOpt.map((e,i)=>{
                return    <option value={e} key={i}>{e}</option>
              })}
   
    </Form.Select>
    <br/>
            <MDBInput label='Number input' id='typeNumber' value={amount} onChange={(e)=>setAmount(e.target.value)} type='number' name="amount" required/>
            <MDBTextArea label='Message' id='textAreaExample' value={description} onChange={(e)=>setDescription(e.target.value)} rows={4} name="description" required/>
            <div className="d-flex justify-content-end">

            <MDBBtn type="submit" className="mybgclr text-white" style={{height:'45px',width:'135px'}}> Save changes</MDBBtn>
            </div>

            </MDBModalBody>

            </form>

          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
});