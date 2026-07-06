import React, { useEffect } from 'react'
import Nav from '../components/Nav'
import db from "../assets/dp.webp";
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { useContext, useRef, useState } from "react";
import { userDataContext } from "../context/UserContext";
import { HiPencil } from "react-icons/hi2";
import EditProfile from "../components/EditProfile";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function Profile() {

    let { userData, setUserData, edit, setEdit, postData, setPostData } =
    useContext(userDataContext);
    let [userConnection, setUserConnection] = useState([])
    let { serverUrl } = useContext(authDataContext);

    const handleGetUserConnection = async()=>{
        try {
            let result = await axios.get(`${serverUrl}/api/connection`, {withCredentials:true})
            setUserConnection(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        handleGetUserConnection()
    },[])

  return (
    <div className='w-full min-h-[100vh] bg-[#f0efe7] flex flex-col items-center pt-[100px]'>
      <Nav />
      {edit && <EditProfile />}
      <div className='w-full max-w-[900px] min-h-[100vh]'>
        <div className='relative bg-[white] pb-[40px] rounded shadow-lg'>
                    <div
                      className="w-[100%] h-[100px] bg-gray-400 rounded overflow-hidden flex
                    items-center justify-center"
                      onClick={() => setEdit(true)}
                    >
                      <img src={userData.coverImage || null} alt="" className="w-full" />
                      <FiCamera className="absolute right-[20px] top-[20px] w-[25px] h-[25px] text-white cursor-pointer " />
                    </div>
                    <div
                      className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center 
                     absolute top-[65px] left-[35px] cursor-pointer"
                      onClick={() => setEdit(true)}
                    >
                      <img src={userData.profileImage || db} alt="" className="h-full" />
                    </div>
                    <div
                      className="w-[20px] h-[20px] bg-[#0a66c2] absolute top-[105px] z-30 left-[90px] 
                      rounded-full flex items-center justify-center"
                    >
                      <FiPlus className="text-white" />
                    </div>
            
                    <div className="mt-[30px] pl-[20px] font-semibold text-gray-700">
                      <div className="text-[22px]">{`${userData.firstname} ${userData.lastname}`}</div>
                      <div className="text-[18px] font-semibold text-gray-600">
                        {userData.headline || ""}
                      </div>
                      <div className="text-[16px] text-gray-500">{userData.location}</div>
                      <div className="text-[16px] text-gray-500">{`${userConnection.length} connection`}</div>
                    </div>
                    <button
                      className="min-w-[150px] h-[40px] my-[20px] rounded-full border-2 ml-[20px]
                       border-[#2dc0ff] text-[#2dc0ff] flex items-center justify-center gap-[10px]"
                      onClick={() => setEdit(true)}
                    >
                      Edit Profile <HiPencil />{" "}
                    </button>
                  </div>
        </div>
      </div>
  )
}

export default Profile
