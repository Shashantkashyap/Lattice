import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from"react-router-dom"
import './Registration.css';
import toast, { Toaster } from 'react-hot-toast';


function Signup() {

  
  const navigate = useNavigate();


  const [data, setData] = useState({
    Pemail: '',
    name: '',
    email: '',
    password: '',
    address: '',
    contact: '',
    file:null,
    otp:""
  });

  const getOtp = async()=>{
    const o = await axios.post('http://localhost:3000/api/otp', { email: data.email });
    
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,15}$/;
  if (!passwordRegex.test(data.password)) {
    toast.error("Password must contain one upper character, one lower character, a number, and be between 8 and 15 characters", {
      duration: 5000,
      position: 'top-center'
    });
    return;
  }
    console.log(data);

    const formData = new FormData();
    formData.append('Pemail', data.Pemail);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('address', data.address);
    formData.append('contact', data.contact);
    formData.append('otp', data.otp);
    formData.append('file', data.file);

    try {
      const response = await axios.post('http://localhost:3000/api/registration', formData);
      if(o.request.status===200){
        toast.success("Patient registered successfully",{
          duration:3000,
          position:'top-center'
        })
       }else{
        toast.error("Error in patient registration",{
          duration:3000,
          position:'top-center'
        })
       }
          
      console.log(response);
      navigate("/");
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  

  return (
    <div className="signup-container ">
      <form className="signup-form  " onSubmit={handleSubmit}>
        <h1 className='text-2xl font-bold p-1'>SignUp Form</h1>
        <div>
        <div className="form-group">
          <label htmlFor="Pemail" className=' text-xl font-semibold '>Psychiatrist email</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="Pemail"
            id="Pemail"
            value={data.Pemail}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name" className=' text-xl font-semibold '>Patient's Name</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="name"
            id="name"
            value={data.name}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className=' text-xl font-semibold'>Email</label>
          <input
          className=' p-1 shadow-md'
            type="email"
            name="email"
            id="email"
            value={data.email}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className='flex justify-between mb-5'>
        <label htmlFor="otp" className=' text-xl font-semibold'>OTP</label>
       <div className='flex  gap-8 w-[500px] '>
       <input
          className=' p-1 shadow-md'
            type="text"
            name="otp"
            id="otp"
            value={data.otp}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <button onClick={getOtp} className='  bg-blue-300 hover:bg-blue-500 text-sm font-semibold hover:scale-[1.1] p-1 shadow-lg'>Get OTP</button>
       </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className=' text-xl font-semibold'>Password</label>
          <input
          className=' p-1 shadow-md'
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address" className=' text-xl font-semibold'>Address</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="address"
            id="address"
            value={data.address}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact" className=' text-xl font-semibold'>Contact</label>
          <input
          className=' p-1 shadow-md'
            type="text"
            name="contact"
            id="contact"
            value={data.contact}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file" className=' text-xl font-semibold'>Upload Image</label>
          <input type="file" name="file" id="file" onChange={handleFileChange} />
        </div>

        </div>
            
        <div>
        
            <button type="submit" className=' bg-blue-300 hover:bg-blue-500 text-xl font-semibold hover:scale-[1.02] p-2 shadow-md'>Submit</button>
            
        </div>
      
      </form>
    </div>
  );
}

export default Signup;