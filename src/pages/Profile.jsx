import React from 'react'
import {useSelector} from 'react-redux'
import { updateFail,updateStart,updateSucces } from '../redux/user/userslice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Profile = () => {
  const {currentUser ,loading, error} = useSelector((state) => state.user)
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost:3000/update${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFail(data.message));
        return;
      }

      dispatch(updateSucces(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateFail(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2' />
        <input onChange={handleChange} type="text" placeholder='username' id='username' className='border p-3 rounded-lg' defaultValue={currentUser.username}  />
        <input onChange={handleChange} type="email" placeholder='email' id='email' className='border p-3 rounded-lg' defaultValue={currentUser.email}  />
        <input  onChange={handleChange} type="password" placeholder='password' id='password' className='border p-3 rounded-lg'  />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={"/create"}>
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete account</span>
        <span className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  )
}

export default Profile
