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
  MDBModalFooter,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { addExpensesAction, addIncomeAction, clearErrorAndSms, getAllIncomeAction, loadUserAction } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default React.memo(function PopupExpensesModal({titleOpt}) {
  const [basicModal, setBasicModal] = useState(false);
  let {sms:addExpenseSms,error:addExpenseError} =useSelector((e)=>e.getAllExpensesReducer)

let dispatch = useDispatch()
  const toggleShow = () => setBasicModal(!basicModal);
let submitHandler=(e)=>{
e.preventDefault();
let inputData=new FormData(e.target);
  dispatch(addExpensesAction(inputData))

}
useEffect(()=>{


    if(addExpenseSms){
      toggleShow();
      dispatch(getAllIncomeAction())
      dispatch(clearErrorAndSms());
      console.log(addExpenseSms);
    
    
    }
    if(addExpenseError){
      dispatch(clearErrorAndSms())

  }
},[addExpenseSms,addExpenseError])
  return (
    <>
      <MDBBtn onClick={toggleShow} className="mybgclr text-white" style={{height:'45px',width:'150px'}}>
      <AddCircleOutlineIcon/>
        add Expenses
        </MDBBtn>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Expenses</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShow}
              ></MDBBtn>
            </MDBModalHeader>
          <form onSubmit={(e)=>submitHandler(e)}>

            <MDBModalBody>
            <Form.Select aria-label="Default select example" name="title">
              {titleOpt.map((e,i)=>{
                return    <option value={e} key={i}>{e}</option>
              })}
   
    </Form.Select>
    <br/>
            <MDBInput label='Number input' id='typeNumber' type='number' name="amount" required/>
            <MDBTextArea label='Message' id='textAreaExample' rows={4} name="description" required/>
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