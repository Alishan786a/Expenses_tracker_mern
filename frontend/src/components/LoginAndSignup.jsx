import React, { useRef, useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput
} from 'mdb-react-ui-kit';

import Lottie from 'lottie-react';
import * as animationData from '../lotiesjson/loginLoties.json'
import { emailVerificationAction, loginAction, registerUserAction } from './redux/actions';
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

function LoginAdnSignupPg() {
  let dispatch = useDispatch()
  let { user } = useSelector((e) => e.userAuthenticate)
  
  let emailRef = useRef()
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  let loginHandler = (e) => {
    e.preventDefault();
    let formInputs = new FormData(e.target)

    dispatch(loginAction(formInputs))
  }
  
  // send email verification code
  let sendCode = (e) => {
    e.preventDefault();
    let emailVal = emailRef.current.value
    if (!emailVal || emailVal === '' || !emailVal.includes('@')) {
      return console.log("please enter email");
    }
    dispatch(emailVerificationAction({ email: emailVal }))
  }
  let signupHandler = (e) => {
    e.preventDefault();
    let formInputs = new FormData(e.target)
    dispatch(registerUserAction(formInputs))

  }

  return (
    <div className='container mt-4 ' >
      {user && <Navigate to='/dashboard' />}

      <div className="row justify-content-evenly">


        {/* loties */}
        <Lottie animationData={animationData}

          className='col-md-6 d-flex justify-content-center'
          style={{ marginTop: '50px', height: "400px", width: "400px" }}
        />

        {/* login and signup */}

        <MDBContainer className=" p-3 my-5 d-flex flex-column  col-md-6 mx-0" id='LoginAndSignUpContainer'>

          <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
            <MDBTabsItem>
              <MDBTabsLink className='myActiveCle myclr' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                Login
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className='myActiveCle myclr' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                Register
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>

          <MDBTabsContent className='mt-3'>
            {/* login */}
            <MDBTabsPane show={justifyActive === 'tab1'}>
              <form onSubmit={(e) => loginHandler(e)}>
                <MDBInput wrapperClass='my-3' label='Email address' name='email' id='loginEmail' type='email' required />
                <MDBInput wrapperClass='my-3' label='Password' name='password' id='loginPassword' type='password' required />

                <MDBBtn className="mb-4 w-100 mybgclr border-0" style={{width:'326px',height:'36px'}} type='submit'>Login</MDBBtn>
              </form>
            </MDBTabsPane>


            {/* signup */}
            <MDBTabsPane show={justifyActive === 'tab2'}>

              <form action="" onSubmit={(e) => signupHandler(e)}>

                <MDBInput wrapperClass='mb-3' label='Name' name='name' id='signupName' type='text' required />

                <MDBInput wrapperClass='mb-1' label='Email' name='email' id='signupEmail' ref={emailRef} type='email' required />
                <MDBBtn rounded style={{height:'29px',width:'75px'}} size='sm' className='mb-3 mybgclr border-0' onClick={(e) => sendCode(e)}>get code </MDBBtn>
                <MDBInput wrapperClass='mb-3' label='Email verification token' name='code' id='signupEmailCode' type='number' required />
                <MDBInput wrapperClass='mb-3' label='Password' name='password' id='signupPassword' type='password' required />
                <MDBInput wrapperClass='mb-3' label='Avatar' name='avatar' id='signupImg' type='file' required />


                <MDBBtn className="mb-4 w-100 mybgclr border-0" style={{width:'326px',height:'36px'}} type='submit'>Sign up</MDBBtn>
              </form>
            </MDBTabsPane>

          </MDBTabsContent>

        </MDBContainer>
      </div>
    </div>
  );
}

export default React.memo(LoginAdnSignupPg)