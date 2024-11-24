import React from 'react';
import {Form,Button} from 'react-bootstrap';
import { Link} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContent';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
const Login = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("")
  const {logIn,googleSignIn}=useUserAuth();
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError("");
    try{
     await logIn(email,password);
     navigate("/home")
    }catch(err){
     setError(err.message);
    }
 };

const handleGoogleSignIn=async(e)=>{
  try{
     await googleSignIn();
     navigate("/home")
  }
  catch(err){
    setError(err.message)

  }
}

  return (
    <>
   <div className='p-4 box'>
    <h2 className='mb-3'>Firebase Auth Login </h2>
    {error &&<Alert varient="danger">{error}</Alert>}
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId="formBasicEmail">
        <Form.Control
          type="email"
          placeholder="Email Address"
          onChange={(e)=>setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3' controlId="formBasicPassword">
        <Form.Control
          type="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
      </Form.Group>
      <div className='d-grid gap-2'>
        <Button varient="primary" type="submit">Log In</Button>
      </div>
    </Form>
    <hr/>
    <div>
      {/* <GoogleButton
          className="g-btn"
          type="dark"
          onClick={handleGoogleSignIn}
      /> */}
    </div>
   </div>
   <div className='p-4 box mt-4 text-center'>
    Don't have an account?<Link to="/SignUp">Sign Up</Link>
   </div>
   </>

      )
}

export default Login