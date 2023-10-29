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

export default React.memo(function PopupIncomeModal({titleOpt}) {
  const [basicModalIncome, setBasicModalIncome] = useState(false);
  let {sms:addExpenseSms,error:addExpenseError} =useSelector((e)=>e.getAllIncomeReducer)

let dispatch = useDispatch()
  const toggleShowIncome = () => setBasicModalIncome(!basicModalIncome);
let submitIncomeHandler=(e)=>{
e.preventDefault();
let inputData=new FormData(e.target);
  dispatch(addIncomeAction(inputData));

}
useEffect(()=>{

  
 
if(addExpenseSms){
  toggleShowIncome();
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
      <MDBBtn onClick={toggleShowIncome} className="mybgclr text-white" style={{height:'45px',width:'135px'}}>
      <AddCircleOutlineIcon/>
        add Income
        </MDBBtn>
      <MDBModal show={basicModalIncome} setShow={setBasicModalIncome} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Add Income</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={toggleShowIncome}
              ></MDBBtn>
            </MDBModalHeader>
          <form onSubmit={(e)=>submitIncomeHandler(e)}>

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