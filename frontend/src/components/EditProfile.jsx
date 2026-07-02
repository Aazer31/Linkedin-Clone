import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import db from "../assets/dp.webp";
import { FiPlus } from "react-icons/fi";
import { FiCamera } from "react-icons/fi";
import { useRef } from "react";

function EditProfile() {
  let { edit, setEdit, userData, setUserData } = useContext(userDataContext);
  let [firstname, setFirstname] = useState(userData.firstname || "");
  let [lastname, setLastname] = useState(userData.lastname || "");
  let [username, setUsername] = useState(userData.username || "");
  let [headline, setHeadline] = useState(userData.headline || "");
  let [location, setLocation] = useState(userData.location || "");
  let [gender, setGender] = useState(userData.gender || "");
  let [skills, setSkills] = useState(userData.skills || []);
  let [newSkills, setNewSkills] = useState("");
  let [education, setEducation] = useState(userData.education || []);
  let [newEducation, setNewEducation] = useState({
    college: "",
    degree: "",
    fieldOfStudy: "",
  });
  let [experience, setExperience] = useState(userData.experience || []);
  let [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    description: "",
  });

  function addSkill(e) {
    e.preventDefault();
    if (newSkills && !skills.includes(newSkills)) {
      setSkills([...skills, newSkills]);
      //   setNewSkills("");
    }
    setNewSkills("");
  }

  function removeSkill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill));
    }
  }

  function addEducation(e) {
    e.preventDefault();
    if (
      newEducation.college &&
      newEducation.degree &&
      newEducation.fieldOfStudy
    ) {
      setEducation([...education, newEducation]);
    }
    setNewEducation({
      college: "",
      degree: "",
      fieldOfStudy: "",
    });
  }

  function removeEducation(edu) {
    if (education.includes(edu)) {
      setEducation(education.filter((e) => e !== edu));
    }
  }

  function addExperience(e) {
    e.preventDefault();
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.description
    ) {
      setExperience([...experience, newExperience]);
    }
    setNewExperience({
      title: "",
      company: "",
      description: "",
    });
  }

  function removeExperience(exp) {
    if (experience.includes(exp)) {
      setExperience(experience.filter((e) => e !== exp));
    }
  }

  let [frontendProfileImage, setFrontendProfileImage] = useState(
    userData.profileImage || db);
  let [backendProfileImage, setBackendProfileImage] = useState(null);

  let [frontendCoverImage, setFrontendCoverImage] = useState(
    userData.coverImage || null);
  let [backendCoverImage, setBackendCoverImage] = useState(null);

  const profileImage = useRef(null);
  const coverImage = useRef(null);

  function handleProfileImage(e) {
    let file = e.target.files[0];
    if (file) {
      setFrontendProfileImage(URL.createObjectURL(file));
      setBackendProfileImage(file);
    }
  }

  function handleCoverImage(e) {
    let file = e.target.files[0];
    if (file) {
      setFrontendCoverImage(URL.createObjectURL(file));
      setBackendCoverImage(file);
    }
  }

  return (
    <div className="w-full h-[100vh] fixed top-0 z-[100] flex items-center justify-center">
      <input type="file" accept="image/*" hidden ref={profileImage} onChange={handleProfileImage}/>
      <input type="file" accept="image/*" hidden ref={coverImage} onChange={handleCoverImage} />
      <div className="w-full h-full bg-black opacity-[0.5] absolute"></div>
      <div
        className="w-[90%] max-w-[500px] h-[600px] bg-white relative overflow-auto z-[200] 
        shadow-lg rounded-lg p-[10px]"
      >
        <div
          className="absolute top-[20px] right-[20px] cursor-pointer"
          onClick={() => setEdit(false)}
        >
          <RxCross1 className="w-[25px] h-[25px] text-gray-800 font-bold cursor-pointer" />
        </div>

        <div
          className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden cursor-pointer"
          onClick={() => coverImage.current.click()}
        >
          <img src={frontendCoverImage} alt="" className="w-full" />
          <FiCamera className="absolute right-[20px] top-[60px] w-[25px] h-[25px] text-white cursor-pointer " />
        </div>

        <div
          className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[150px] ml-[20px] cursor-pointer"
          onClick={() => profileImage.current.click()}
        >
          <img
            src={frontendProfileImage}
            alt=""
            className="w-full h-full"
          />
        </div>

        <div
          className="w-[20px] h-[20px] bg-[#0a66c2] absolute top-[200px] z-30 left-[90px] 
                  rounded-full flex items-center justify-center"
        >
          <FiPlus className="text-white" />
        </div>

        <div className="w-full flex flex-col items-center justify-center gap-[20px] mt-[50px]">
          <input
            type="text"
            placeholder="First Name"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="text"
            placeholder="UserName"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Headline"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="text"
            placeholder="Gender(Male/Female/Other)"
            className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[18px] border-2 rounded-lg"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Skills</h1>
            {skills && (
              <div className="flex flex-col gap-[10px] w-full">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] 
                  flex justify-between items-center"
                  >
                    <span>{skill}</span>
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="Add newskill"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <button
                className="w-[100%] h-[40px] rounded-full border-2
           border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addSkill}
              >
                Add
              </button>
            </div>
          </div>

          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Education</h1>
            {education && (
              <div className="flex flex-col gap-[10px] w-full">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] 
                  flex justify-between items-center"
                  >
                    <div>
                      <div>College: {edu.college}</div>
                      <div>Degree: {edu.degree}</div>
                      <div>Field of Study: {edu.fieldOfStudy}</div>
                    </div>
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeEducation(edu)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="College"
                value={newEducation.college}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, college: e.target.value })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Degree"
                value={newEducation.degree}
                onChange={(e) =>
                  setNewEducation({ ...newEducation, degree: e.target.value })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Field of Study"
                value={newEducation.fieldOfStudy}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    fieldOfStudy: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <button
                className="w-[100%] h-[40px] rounded-full border-2
           border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addEducation}
              >
                Add
              </button>
            </div>
          </div>

          <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg">
            <h1 className="text-[19px] font-semibold">Experience</h1>
            {experience && (
              <div className="flex flex-col gap-[10px] w-full">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="w-full border-[1px] border-gray-600 bg-gray-200 rounded-lg p-[10px] 
                  flex justify-between items-center"
                  >
                    <div>
                      <div>Company: {exp.company}</div>
                      <div>Title: {exp.title}</div>
                      <div>Description: {exp.description}</div>
                    </div>
                    <RxCross1
                      className="w-[20px] h-[20px] text-gray-800 font-bold cursor-pointer"
                      onClick={() => removeExperience(exp)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-col gap-[10px] items-start">
              <input
                type="text"
                placeholder="Title"
                value={newExperience.title}
                onChange={(e) =>
                  setNewExperience({ ...newExperience, title: e.target.value })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Company"
                value={newExperience.company}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <input
                type="text"
                placeholder="Description"
                value={newExperience.description}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    description: e.target.value,
                  })
                }
                className="w-full h-[50px] outline-none 
            border-gray-600 px-[10px] py-[5px] text-[16px] border-2 rounded-lg"
              />

              <button
                className="w-[100%] h-[40px] rounded-full border-2
           border-[#2dc0ff] text-[#2dc0ff]"
                onClick={addExperience}
              >
                Add
              </button>
            </div>
          </div>

          <button
            className="w-[100%] h-[50px] rounded-full bg-[#0a66c2] mt-[40px]
         text-white "
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
