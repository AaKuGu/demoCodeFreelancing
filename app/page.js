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
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [userData, setUserData] = useState([]);

  //targetIndex will only be initialzed when we have to update the data
  const [targetIndex, setTargetIndex] = useState();
  console.log("🚀 ~ Page ~ targetIndex:", targetIndex);

  const nullifyCommonFuncs = () => {
    setAge("");
    setFullName("");
    setGender("");
  };

  const handleSave = () => {
    if (fullName !== "" && age !== "" && gender !== "") {
      if (targetIndex !== null && targetIndex >= 0) {
        // targetIndex is having a valid value, hence it's an update call
        console.log("🚀 ~ handleSave ~ targetIndex:", targetIndex);
        const targetData = userData[targetIndex];

        const data = [...userData];
        data.splice(targetIndex, 1, { ...targetData, fullName, gender, age });

        setUserData(data);

        setTargetIndex(null);
        nullifyCommonFuncs();
      } else if (targetIndex === -1) {
        toast.error("User does not exist");
      } else {
        const uniqueId = generateUniqueId();
        const userObject = { fullName, age, gender, uniqueId };
        setUserData((prevUserData) => [...prevUserData, userObject]);
        nullifyCommonFuncs();
      }
    } else {
      toast.error("Please fill out all the details");
    }
  };

  const handleDelete = (i) => {
    const tempData = [...userData];
    tempData.splice(i, 1);
    setUserData(tempData);
    setTargetIndex(null);
    nullifyCommonFuncs();
  };

  const handleCardClick = (d, i) => {
    setTargetIndex(i);
    setShowCreateUpdate(true);
    setFullName(d.fullName);
    setAge(d.age);
    setGender(d.gender);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-5">
      <div className="w-full h-[400px] border rounded-lg flex md:flex-row flex-col items-center justify-center ">
        <div className="flex flex-col items-start justify-center md:w-[50%] w-full h-full">
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
                setTargetIndex(null);
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
                  key={i}
                  d={d}
                  handleCardClick={() => handleCardClick(d, i)}
                  handleDelete={() => handleDelete(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  md:w-[50%] w-full h-full gap-5">
          {showCreateUpdate && (
            <div className="flex flex-col items-center justify-center  w-full h-full gap-5 ">
              <div aria-label="title" className="text-3xl w-full text-center">
                Details
              </div>
              <div className="h-full w-full flex flex-col items-center justify-center gap-2  ">
                <div className="flex md:flex-row flex-col md:items-center items-start justify-start px-5 w-full ">
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
                <div className="flex items-start md:items-center md:flex-row flex-col justify-start px-5 w-full ">
                  <label htmlFor="age" className={`${""} w-[200px] `}>
                    Age :{" "}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className={`${""} text-black `}
                  />
                </div>
                <div className="flex items-start md:items-center md:flex-row flex-col justify-start px-5 w-full ">
                  <label htmlFor="gender" className={`${""} min-w-[200px] `}>
                    Gender:
                  </label>
                  <div
                    aria-label=""
                    className={`${""} radioButtons container flex items-center justify-start gap-5 `}
                  >
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
