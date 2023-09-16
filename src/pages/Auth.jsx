import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleLogin,handleGoogleAuthentication,handleResetPassword,handleSignup } from '../actions';
import {FcGoogle} from "react-icons/fc"
const Auth = () => {
  const [authType,setAuthType]=useState('login')
  const {isLoading}=useSelector(state=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form,setForm] = useState({
    email:"",
    password:"",
    confirm_password:"",
  })
  const [rememberMe,setRememberMe] = useState(false)
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const handleRememberMe=(e)=>{
    setRememberMe(e.target.checked)
  }
  const handleSubmit=async (e)=>{
    e.preventDefault()
    console.log(form)
    if(authType==='signup')
      dispatch(handleSignup(form))
    if(authType==='login')
      {dispatch(handleLogin(form))
     
      }
    if(authType==='forgot')
     dispatch(handleResetPassword(form.email))
  }
  return (
    <div className='flex w-[100vw] h-[100vh] justify-center items-center bg-svg bg-slate-900'>
      <div className='w-[450px] p-4 rounded-lg bg-slate-900'>
        <h2 className="text-white font-bold text-center text-4xl">{authType=='login' && 'Login to your account'}{authType=='signup' && 'Create account'}</h2>
        <div className="flex gap-2 justify-center text-white px-5 py-2.5 text-sm leading-5  font-semibold cursor-pointer" onClick={()=>setAuthType(authType==='login'?'signup':'login')}>
        <span>{authType==='login' ?"Don't have an account yet ?":"Already have an account ?"}</span>
        <span className=' text-sky-500 hover:text-sky-300'>{authType=='login'? 'Sign up':'Sign In'} </span>
      </div>
      <div className="mt-6">
      <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
      <div className="mt-1">
        <input onChange={handleChange} value={form.email} type="email" name="email" id="email" placeholder='User email' className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400  disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 invalid:border-red-500 invalid:text-red-600 focus:invalid:border-slate-500 focus:invalid:ring-slate-500 disabled:shadow-none" />
      </div>
      </div>
      {authType!=='forgot' &&
      <div className="mt-6">
      <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
      <div className="mt-1">
        <input onChange={handleChange} value={form.password} type="password" name="password" id="password" placeholder="Password" className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none"/>
      </div>
    </div>}
    {authType==='signup' &&
    <div className="mt-6">
      <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-400">Password</label>
      <div className="mt-1">
        <input onChange={handleChange} value={form.confirm_password} type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" className="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 disabled:shadow-none"/>
      </div>
    </div>
}
   {
    authType==='login' && 
    <div className="mt-6 flex justify-between items-center">
    <div className="flex items-center">
          <input
            id="remember-me"
            name="remember_me"
            type="checkbox"
            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
            onChange={handleRememberMe}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-white font-semibold">
            Remember me
          </label>
        </div>
    
      <div className="text-sky-500 hover:text-sky-300 px-5 py-2.5 text-sm leading-5 text-right  font-semibold cursor-pointer" onClick={()=>setAuthType('forgot')}>
        Forgot your password ?
      </div>
    </div>
   }
    <button onClick={handleSubmit} disabled={isLoading} className="mt-6 bg-sky-500 hover:bg-sky-700 disabled:bg-slate-600 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white w-full">
        {authType==='login'?'Login':authType==='signup'?'Sign Up':'Send reset email'} 
      </button>
      <div className="mt-6 font-bold font-xl text-white text-center">OR</div>
      <button onClick={()=>dispatch(handleGoogleAuthentication())} className='mt-6 w-full bg-white hover:bg-slate-300 px-5 py-2.5 font-semibold rounded-lg inline-flex justify-center items-center cursor-pointer text-slate-800' >
        <FcGoogle className='w-6 h-6 mr-2'/>
        <span>Google</span>
      </button>
      </div>
      
    </div>
  )
}

export default Auth