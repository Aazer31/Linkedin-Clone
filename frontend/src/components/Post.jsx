// import React from 'react'
import { useContext, useEffect, useState } from "react";
import db from "../assets/dp.webp";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";
import { BiSolidLike } from "react-icons/bi";
import { LuSendHorizontal } from "react-icons/lu";

function Post({ id, author, like, comment, description, image, createdAt }) {
  let [more, setMore] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData, getPost } = useContext(userDataContext);
  let [likes, setLikes] = useState(like || []);
  let [commentContent, setCommentContent] = useState("");
  let[comments, setComments] = useState(comment || []);
  let [showComment, setShowComment] = useState(false) 

  const handleLike = async () => {
    try {
      let result = await axios.get(serverUrl + `/api/post/like/${id}`, {
        withCredentials: true,
      });
      setLikes(result.data.like);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        serverUrl + `/api/post/comment/${id}`,
        {
          content: commentContent,
        },
        {
          withCredentials: true,
        },
      );
      setComments(result.data.comment);
      setCommentContent("")
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="w-full min-h-[200px] flex flex-col gap-[10px] text-justify bg-white rounded-lg shadow-lg p-[20px]">
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-start gap-[10px] ">
          <div
            className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center 
          cursor-pointer"
          >
            <img src={author.profileImage || db} alt="" className="h-full" />
          </div>

          <div>
            <div className="text-[22px] font-semibold">{`${author.firstname} ${author.lastname}`}</div>
            <div className="text-[16px]">{`${author.headline}`}</div>
            <div className="text-[16px]">{moment(createdAt).fromNow()}</div>
          </div>
        </div>

        <div>{/* Buttons */}</div>
      </div>
      <div
        className={`w-full ${!more ? "max-h-[100px] overflow-hidden" : ""} pl-[50px]`}
      >
        {description}
      </div>
      <div
        className="pl-[50px] cursor-pointer text-[19px] font-semibold"
        onClick={() => setMore((prev) => !prev)}
      >
        {more ? "read less..." : "read more..."}
      </div>
      {image && (
        <div className="w-full h-[300px] overflow-hidden flex justify-center rounded-lg">
          <img src={image} alt="" className="h-full rounded-lg" />
        </div>
      )}

      <div>
        <div className="w-full flex justify-between items-center p-[20px] border-b-2 border-gray-500">
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <BiLike className="text-[#0a66c2] w-[20px] h-[20px]" />
            <span>{likes.length}</span>
          </div>
          <div className="flex items-center justify-center gap-[5px] text-[18px] cursor-pointer" onClick={()=>setShowComment(prev=>!prev)}>
            <span>{comments.length}</span>
            <span>Comment(s)</span>
          </div>
        </div>

        <div className="flex justify-start items-center w-full p-[20px] gap-[20px] ">
          {!likes.includes(userData._id) && (
            <div
              className="flex items-center justify-center gap-[5px] cursor-pointer"
              onClick={handleLike}
            >
              <BiLike className="w-[24px] h-[24px]" />
              <span>Like</span>
            </div>
          )}

          {likes.includes(userData._id) && (
            <div
              className="flex items-center justify-center gap-[5px] cursor-pointer"
              onClick={handleLike}
            >
              <BiSolidLike className="w-[24px] h-[24px] text-[#0a66c2]" />
              <span className="text-[#0a66c2] font-semibold">Liked</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-[5px] cursor-pointer" onClick={()=>setShowComment(prev=>!prev)}>
            <FaRegCommentDots className="w-[24px] h-[24px]" />
            <span>Comment</span>
          </div>
        </div>

          {showComment && <div>
          <form
            className="w-full flex justify-between items-center border-b-2 border-b-gray-500 p-[10px]"
            onSubmit={handleComment}
          >
            <input
              type="text"
              placeholder={"leave a comment"}
              className="outline-none border-none"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <button>
              <LuSendHorizontal className="text-[#0a66c2] w-[22px] h-[22px]" />
            </button>
          </form>
          <div className="flex flex-col gap-[10px]"> 
            {comments.map((com) => (
              <div key={com._id} className="flex flex-col gap-[10px] border-b-2 p-[20px] border-b-gray-300 ">
                <div className="w-full flex justify-start items-center gap-[10px] ">
                  <div
                    className="w-[70px] h-[70px] rounded-full overflow-hidden flex items-center justify-center 
          cursor-pointer"
                  >
                    <img
                      src={com.user.profileImage || db}
                      alt=""
                      className="h-full"
                    />
                  </div>
                  <div >
                   <div className="text-[16px] font-semibold">{`${com.user.firstname} ${com.user.lastname}`}</div>
                   <div> {moment(com.createdAt).fromNow()} </div>
                   </div>
                </div>
                <div className="pl-[50px]">{com.content}</div>
              </div>
            ))}
          </div>
        </div>}

        
      </div>
    </div>
  );
}

export default Post;
