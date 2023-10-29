import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Lottie from 'lottie-react';
import * as animationData from '../lotiesjson/landingPage.json'
import Button from '@mui/material/Button';
import LaunchIcon from '@mui/icons-material/Launch';
import {TypeAnimation} from 'react-type-animation'
import { Link } from 'react-router-dom';
function LandingPg() {

  return (
    <Container className='mt-5'>
      <Row className='mt-4'>
        <div className='col-md-6 d-flex justify-content-center align-items-center text-white'>
            <div>
{/* typing animation */}
<TypeAnimation
      sequence={[
        'Manage your Income here',
        1500, 
        'Manage your Expenses here',
        1500
        
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />


        <h1>The <span className='text-warning'> Expenses tracker</span> App help you to manage your expenses and income</h1>
        <p>Manage your expenses and income here...</p>
        <Link to='/login'>
        <Button variant="contained" className='bg-warning mt-3 fs-6'  endIcon={<LaunchIcon />}>
  Let's start
</Button>
</Link>
            </div>
        
        </div>
        <div className='col-md-6'>
{/* loties */}
<Lottie animationData={animationData}
              height={300}
              width={415}
              style={{marginTop:'50px'}}
              />
        </div>
      </Row>
   
    </Container>
  );
}

export default React.memo(LandingPg);