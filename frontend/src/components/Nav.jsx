import React, { useState } from "react";
import axios from "axios";
import logo2 from "../assets/logo2.png";
import { IoSearchSharp } from "react-icons/io5";
import { TiHome } from "react-icons/ti";
import { FaUserGroup } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import db from "../assets/dp.webp";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Nav() {
  let [activeSearch, setActiveSearch] = useState(false);
  let { userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [showPopup, setShowPopup] = useState(false);
  let navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[80px] bg-white fixed top-0 shadow-lg flex justify-between md:justify-around items-center px-[10px] left-0 z-[80]">
      <div className="flex justify-center items-center gap-[10px]">
        <div
          onClick={() => {
            setActiveSearch(false);
          }}
        >
          <img src={logo2} alt="" className="w-[50px]" />
        </div>
        {!activeSearch && (
          <div>
            <IoSearchSharp
              className="w-[23px] h-[23px] text-gray-700 
      lg:hidden"
              onClick={() => setActiveSearch(true)}
            />
          </div>
        )}

        <form
          className={`w-[190px] lg:w-[350px] h-[40px] bg-[#f0efe7] lg:flex items-center gap-[10px] px-[10px] 
        ${!activeSearch ? "hidden" : "flex"} py-[5px] rounded-md`}
        >
          <div>
            <IoSearchSharp className="w-[23px] h-[23px] text-gray-700" />
          </div>
          <input
            type="text"
            className="w-[80%] h-full bg-transparent outline-none border-0"
            placeholder="search users..."
          />
        </form>
      </div>

      <div className="flex justify-center items-center gap-[20px] relative">
        {showPopup && (
          <div
            className="w-[300px] min-h-[300px] bg-white shadow-lg absolute top-[75px] rounded-lg
        flex flex-col items-center p-[20px] gap-[20px]"
          >
            <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
              <img
                src={userData.profileImage || db}
                alt=""
                className="w-full h-full"
              />
            </div>

            <div className="text-[18px] font-semibold text-gray-700">
              {`${userData.firstname} ${userData.lastname}`}
            </div>
            <button
              className="w-[100%] h-[40px] rounded-full border-2
           border-[#2dc0ff] text-[#2dc0ff]"
            >
              View Profile
            </button>
            <div className="w-full h-[1px] bg-gray-700"></div>
            <div className="flex w-full justify-start items-center text-gray-600 gap-[10px] cursor-pointer" onClick={()=>navigate("/network")}>
              <FaUserGroup className="w-[23px] h-[23px] text-gray-600" />
              <div>My Networks</div>
            </div>
            <button
              className="w-[100%] h-[40px] rounded-full border-2
           border-[#ec4545] text-[#ec4545]"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}

        <div className="lg:flex flex-col justify-center items-center text-gray-600 cursor-pointer hidden">
          <TiHome className="w-[23px] h-[23px] text-gray-600" />
          <div>Home</div>
        </div>

        <div
          className="md:flex flex-col justify-center items-center text-gray-600 cursor-pointer hidden"
          onClick={() => navigate("/network")}
        >
          <FaUserGroup className="w-[23px] h-[23px] text-gray-600" />
          <div>My Networks</div>
        </div>

        <div className="flex flex-col justify-center items-center text-gray-600 cursor-pointer">
          <IoNotificationsSharp className="w-[23px] h-[23px] text-gray-600" />
          <div className="hidden md:block">Notifications</div>
        </div>

        <div
          className="w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
          onClick={() => {
            setShowPopup((prev) => !prev);
          }}
        >
          <img src={userData.profileImage || db} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Nav;
