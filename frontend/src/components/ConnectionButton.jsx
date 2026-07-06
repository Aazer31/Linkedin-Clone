// import React from "react";

import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import io from "socket.io-client";
import { useEffect } from "react";
import { userDataContext } from "../context/UserContext";
import { useState } from "react";

const socket = io("http://localhost:8000");
function ConnectionButton({ userId }) {
  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  let [status, setStatus] = useState("")

  const handleSendConnection = async () => {
    try {
      let result = await axios.post(
        `${serverUrl}/api/connection/send/${userId}`,
        {},
        { withCredentials: true },
      );
      console.log(result); 
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStatus = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/connection/getstatus/${userId}`,
        { withCredentials: true },
      );
      console.log(result.data); 
      setStatus(result.data.status)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    socket.emit("register", userData._id);
    handleGetStatus()

    socket.on("statusUpdate", ({updateUserId, newStatus})=>{

        if(updateUserId == userId){
            setStatus(newStatus)
        }

        return ()=>{
            socket.off("statusUpdate")
        }
    })
  }, [userId]);

  return (
    <button
      className="min-w-[100px] h-[40px] rounded-full border-2
           border-[#2dc0ff] text-[#2dc0ff]"
    >
      {status}
    </button>
  );
}

export default ConnectionButton;
