// import React from 'react'
import { useState } from "react";
import db from "../assets/dp.webp";
import moment from "moment";
import { BiLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa6";

function Post({ id, author, like, comment, description, image, createdAt }) {
  let [more, setMore] = useState(false);
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
            <di className="text-[22px] font-semibold">{`${author.firstname} ${author.lastname}`}</>
            <div className="text-[16px]">{`${author.headline}`}</div>
            <div className="text-[16px]">{moment(createdAt).fromNow()} </div>
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
            <span>{like?.length || 0}</span>
          </div>
          <div className="flex items-center justify-center gap-[5px] text-[18px]">
            <span>{comment?.length || 0}</span>
            <span>Comments</span>
          </div>
        </div>

        <div className="flex justify-start items-center w-full p-[20px] gap-[20px] ">
          <div className="flex items-center justify-center gap-[5px]">
            <BiLike className="w-[24px] h-[24px]" />
            <span>Like</span>
          </div>

          <div className="flex items-center justify-center gap-[5px]">
            <FaRegCommentDots className="w-[24px] h-[24px]" />
            <span>Comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
