import React, { useState } from 'react';
import {Form,Button, Alert} from 'react-bootstrap';
import { Link,useNavigate} from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContent';

const SignUp = () => {
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("")
  const {signUp}=useUserAuth();
  const navigate=useNavigate();
  const handleSubmit=async (e)=>{
     e.preventDefault();
     setError("");
     try{
      await signUp(email,password);
      navigate("/")
     }catch(err){
      setError(err.message);
     }
  };
  return (
    <>
   <div className='p-4 box'>
    <h2 className='mb-3'>Firebase Auth SignUp</h2>
    {error && <Alert variant='danger'>{error}</Alert>}
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
        <Button varient="primary" type="submit">Sign Up</Button>
      </div>
    </Form>
    <hr/>
   </div>
   <div className='p-4 box mt-4 text-center '>
    Already You Have Sign Up <Link to="/">Log in</Link>
   </div>
   </>

      )
}

export default SignUp