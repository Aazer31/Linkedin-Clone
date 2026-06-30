// import React from 'react'
import logo from '../assets/logo.svg'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from "axios"

function Signup() {
  let [show, setShow] = useState(false)
  let navigate=useNavigate()
  let {serverUrl} = useContext(authDataContext)
  let [firstname, setFirstname] = useState("")
  let [lastname, setLastname] = useState("")
  let [username, setUsername] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState()

  const handleSignup = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        firstname,
        lastname,
        username,
        email,
        password
      }, {withCredentials:true})
      console.log(result)
      setErr(false)
      setLoading(false)
      setFirstname("")
      setLastname("")
      setUsername("")
      setEmail("")
      setPassword("")
    }catch(error){
      setErr(error.response.data.message)
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-screen bg-white flex flex-col items-center justify-start gap-[10px]'>
      <div className='p-[30px] lg:p-[35px] w-full'>
        <img src={logo} alt="Logo" className='w-32 h-auto object-contain' />
      </div>
      <form className='w-[90%] max-w-[400px] h-[700px] md:shadow-xl flex flex-col justify-center gap-[20px] p-[15px]' onSubmit={handleSignup}>
        <h1 className='text-gray-800 text-[30px] font-semibold mb-[30px]'> Sign Up</h1>
        <input type="text" placeholder="firstname" required className='w-[100%] h-[50px] border-2
         border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' 
         value = {firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        <input type="text" placeholder="lastname" required className='w-[100%] h-[50px] border-2
         border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' 
         value = {lastname} onChange={(e)=>setLastname(e.target.value)}/>
        <input type="text" placeholder="username" required className='w-[100%] h-[50px] border-2
         border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md'
         value = {username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="email" placeholder="email" required className='w-[100%] h-[50px] border-2
         border-gray-600 text-gray-800 text-[18px] px-[20px] py-[10px] rounded-md' 
         value = {email} onChange={(e)=>setEmail(e.target.value)}/>
        
        <div className='w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 
        text-[18px] rounded-md overflow-hidden relative flex items-center'>
          <input type={show?"text":"password"} placeholder="password" required className='w-full h-full 
          border-none text-gray-800 text-[18px] px-[20px] py-[10px]' 
          value = {password} onChange={(e)=>setPassword(e.target.value)}/>
          <span className='absolute right-[20px] top-[10px] text-[#0a66c2] font-semibold 
          cursor-pointer' onClick={() => setShow(prev=>!prev)}>{show?"hidden":"show"}</span>
        </div>
        {err && <p className='text-center text-red-500'>
          *{err}
          </p>}
        <button type="submit" className="w-[100%] h-[50px] rounded-full bg-[#0a66c2] mt-[40px]
         text-white font-semibold" disabled={loading}>{loading?"Loading...":"Sign Up"}</button>
        <p className="text-center cursor-pointer" onClick={() => navigate("/login")}>Already have an account? <span className="text-[#0a66c2] font-semibold">Sign in</span></p>
      </form>
    </div>
  )
}

export default Signup