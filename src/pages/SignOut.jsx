import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { signInFail,signInStart,signInsuccess } from '../redux/user/userslice'
import axios from 'axios'

const SignOut = () => {
  const [formdata,setFormData]=useState([]);
  const { loading, error } = useSelector((state) => state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formdata,
     [e.target.id]:e.target.value

    });
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart());
      const res=await axios.post("http://localhost:3000/signin",formdata,{
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data=res.data;
      console.log(data);
      if(data.success===false){
        dispatch(signInFail(data.message));
        
        return;
      }
      dispatch(signInsuccess(data));
      navigate('/');

    }catch(e){
      dispatch(signInFail(e.message));
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='email'
        placeholder='email'
        className='border p-3 rounded-lg'
        id='email'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        className='border p-3 rounded-lg'
        id='password'
       onChange={handleChange}
      />

      <button
      disabled={loading}
        
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
      >
        {loading ? 'Loading...':'SignIN'}
      </button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Dont have an account?</p>
      <Link to={'/sign-up'}>
        <span className='text-blue-700'>Sign up</span>
      </Link>
    </div>
    {error && <p className='text-red-500 mt-5'>{error}</p>}
    
    
  </div>
  )
}

export default SignOut
