import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from"react-router-dom"
import './Login.css';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {

  
  const navigate = useNavigate();


  const [data, setData] = useState({
    name:"",
    email: '',
    hospitalName:"",
    otp:""
  });

  const getOtp = async()=>{
    const o = await axios.post('https://back-aply.onrender.com/api/otp', { email: data.email });
    console.log(o)
   if(o.request.status===200){
    toast.success("OTP sent successfully",{
      duration:3000,
      position:'top-center'
    })
   }else{
    toast.error("Error in sending OTP",{
      duration:3000,
      position:'top-center'
    })
   }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post('https://server-ki5g.onrender.com/api/login', data);

      if(response.request.status===200){
        toast.success("Psychiatrist login successfully",{
          duration:3000,
          position:'top-center'
        })
      }else{
        toast.error("Error in logging in Psychiatrist",{
          duration:3000,
          position:'top-center'
        })
       }

      

      const token = response.data.token;

      
      localStorage.setItem("token", token);
  
      
      console.log(response);
      navigate("/");
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
    }
  };

  

  return (
    <div className="signup-container">
      <form className="signup-form min-h-[600px]" onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold p-4'>SignUp Form</h1>
        <div>
        <div >
          <label htmlFor="firstName" className=' text-xl font-semibold p-2'> Name</label>
          <input
            className=' p-1 shadow-md'
            type="text"
            name="name"
            id="firstName"
            value={data.name}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
        </div>

        

        <div className="form-group">
          <label htmlFor="email" className=' text-xl font-semibold p-2'>Email</label>
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
        <label htmlFor="otp" className=' text-xl font-semibold p-2'>OTP</label>
       <div className='flex flex-col gap-2' >
       <input
            className=' p-1 shadow-md'
            type="text"
            name="otp"
            id="otp"
            value={data.otp}
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
          />
          <button onClick={getOtp} >Get OTP</button>
       </div>
        </div>


        <div className="form-group">
          <label htmlFor="hName" className=' text-xl font-semibold p-2'>Hospital</label>
          <select name="hospitalName" id="hName" value={data.otp} className=' p-1 shadow-md'
            onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
         >
            <option value="Apollo Hospitals">Apollo Hospitals</option>
            <option value="Jawaharlal Nehru Medical College and Hospital">Jawaharlal Nehru Medical College and Hospital</option>
            <option value="Indira Gandhi Institute of Medical Sciences (IGIMS)">Indira Gandhi Institute of Medical Sciences (IGIMS)</option>
            <option value="AIIMS - All India Institute Of Medical Science">AIIMS - All India Institute Of Medical Science</option>
          </select>
        </div>

                </div>
            
        <div >
        
            <button type="submit" className=' mt-3 w-40% bg-blue-300 hover:bg-blue-500 text-xl font-semibold hover:scale-[1.03] p-3 shadow-md'>Submit</button>
            

        </div>
      
      </form>
    </div>
  );
}

export default Signup;
