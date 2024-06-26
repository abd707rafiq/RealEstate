import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

const Header = () => {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <header className='bg-black shadow-md'>
        <div className='flex justify-between items-center max-w-6xl max-auto p-3'>
            <Link to={'/'}>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-yellow-400'>Real</span>
            <span className='text-slate-200'>Estate</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-3g flex items-center'>
            <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64'
            
            
            
            />
            <FaSearch/>
            
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='hidden sm:inline text-slate-100 hover:underline font-bold'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='hidden sm:inline text-slate-100 hover:underline font-bold'>
              About
            </li>
          </Link>
          <Link to={currentUser ? '/profile' : '/sign-In'}>
            {currentUser ? (
              <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
            ) : 
            (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>

        </ul>

        </div>
       
    </header>
  )
}

export default Header
