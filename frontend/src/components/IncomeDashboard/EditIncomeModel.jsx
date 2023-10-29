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
import { editExpensesAction, editIncomeAction} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
let selectIncomeOpt=['freelancing','bussiness','Govt Job','partnership','others']


export default React.memo(function EditPopupIncomeModal({setEditModel,incomeId}) {

  const [title, setTitle] = useState('grocery');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');

  let {income} =useSelector((e)=>e.getAllIncomeReducer);



let dispatch = useDispatch()
  const toggleShow = () => setEditModel(false);
let submitHandler=(e)=>{
e.preventDefault();
let inputData=new FormData(e.target);
inputData.append('id',incomeId)
  dispatch(editIncomeAction(inputData))

};

useEffect(()=>{
let findincome=income.transations.find((e)=>e._id===incomeId);
setTitle(findincome.title)
setAmount(findincome.amount)
setDescription(findincome.description)

},[incomeId])

  return (
    <>
   
   
      <MDBModal show={true} setShow={setEditModel} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Edit Income</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
          <form onSubmit={(e)=>submitHandler(e)}>

            <MDBModalBody>
            <Form.Select aria-label="Default select example" value={title} onChange={(e)=>setTitle(e.target.value)} name="title">
              {selectIncomeOpt.map((e,i)=>{
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