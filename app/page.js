"use client";

import UserCard from "@/components/UserCard";
import React, { useState } from "react";
import toast from "react-hot-toast";

const generateUniqueId = () => {
  const length = 8;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const Page = () => {
  const [showCreateUpdate, setShowCreateUpdate] = useState(false);
  const [fullName, setFullName] = useState("");
  console.log("🚀 ~ Page ~ fullName:", fullName);
  const [age, setAge] = useState("");
  console.log("🚀 ~ Page ~ age:", age);
  const [gender, setGender] = useState("");
  console.log("🚀 ~ Page ~ gender:", gender);
  const [userData, setUserData] = useState([]);
  const [targetUserId, setTargetUserId] = useState();

  const handleSave = () => {
    if (fullName != "" && age != "" && gender != "") {
      if (targetUserId) {
        // it means , we actually have to update the data
        const targetIndex = userData.findIndex(
          (item) => item.uniqueId === targetUserId
        );
        // console.log("🚀 ~ handleSave ~ targetIndex:", targetIndex);

        if (targetIndex !== -1) {
          const targetData = userData.find(
            (data) => data.uniqueId === targetUserId
          );

          const dataToUpdate = { ...targetData, fullName, gender, age };
          console.log("🚀 ~ handleSave ~ dataToUpdate:", dataToUpdate);

          //creating the copy of the main user data;
          const data = [...userData];

          data.splice(targetIndex, 1, dataToUpdate);

          setUserData(data);

          setTargetUserId(null);
          setAge("");
          setFullName("");
          setGender("");
        } else {
          toast.error("User does not exist");
        }
      } else {
        const uniqueId = generateUniqueId();
        const userObject = { fullName, age, gender, uniqueId };
        setUserData((prevUserData) => [...prevUserData, userObject]);
        setAge("");
        setFullName("");
        setGender("");
      }
    } else {
      toast.error("Please fill out all the details");
    }
  };

  const handleDelete = (uniqueId) => {
    setUserData((prevUserData) =>
      prevUserData.filter((user) => user.uniqueId !== uniqueId)
    );
  };

  const handleCardClick = (user) => {
    setTargetUserId(user?.uniqueId);
    setShowCreateUpdate(true);
    setFullName(user.fullName);
    setAge(user.age);
    setGender(user.gender);
  };

  console.log("userData : ", userData);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full h-[400px] border rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-start justify-center w-[50%] h-full">
          <div
            aria-label="header"
            className="flex px-5 items-center justify-between w-full gap-5 border py-2"
          >
            <div>List</div>
            <button
              type="button"
              className="bg-blue-500 w-[100px]"
              onClick={() => {
                setShowCreateUpdate(true);
                setFullName("");
                setAge("");
                setGender("");
                setTargetUserId(null);
              }}
            >
              Add
            </button>
          </div>
          <div
            aria-label="main"
            className="h-full border w-full flex flex-col gap-5 "
          >
            {userData.map((d, i) => {
              return (
                <UserCard
                  d={d}
                  handleCardClick={handleCardClick}
                  handleDelete={handleDelete}
                  setFullName={setFullName}
                  setAge={setAge}
                  setGender={setGender}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  w-[50%] h-full gap-5">
          {showCreateUpdate && (
            <div className="flex flex-col items-center justify-center  w-full h-full gap-5 ">
              <div aria-label="title" className="text-3xl w-full text-center">
                Details
              </div>
              {/* <div aria-label="add details bg-green-500"> */}
              <div className="h-full w-full flex flex-col items-center justify-center gap-2  ">
                <div className="flex items-center justify-start px-5  w-full">
                  <label htmlFor="fullName" className={`${""} w-[200px]`}>
                    Full Name :{" "}
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`${""} text-black`}
                  />
                </div>
                <div className="flex items-center justify-start px-5 w-full">
                  <label htmlFor="age" className={`${""} w-[200px]`}>
                    Age :{" "}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`${""} text-black`}
                  />
                </div>
                <div className="flex items-center justify-start px-5 w-full">
                  <div className="flex items-center justify-start w-full ">
                    <label htmlFor="gender" className={`${""} w-[200px] `}>
                      Gender:
                    </label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className={`${""} text-black`}
                    />
                    Male
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className={`${""} text-black`}
                    />
                    Female
                  </div>
                </div>
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
