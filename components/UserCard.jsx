import React from "react";

const UserCard = ({
  d,
  handleCardClick,
  handleDelete,
  setFullName,
  setAge,
  setGender,
}) => {
  return (
    <div
      aria-label="card"
      key={d.uniqueId}
      className={`${""} w-full flex items-center justify-start border`}
    >
      <div
        aria-label="leftSide"
        className={`${""} flex gap-5 w-[75%]  items-center justify-center px-5 py-2`}
        onClick={() => handleCardClick(d)}
      >
        <div className={`${""} w-[50%]`}>{d.fullName}</div>
        <div className={`${""} w-[25%]`}>{d.age}</div>
        <div className={`${""} w-[25%]`}>{d.gender}</div>
      </div>

      <button
        type="button"
        onClick={() => {
          handleDelete(d.uniqueId);
          setFullName("");
          setAge("");
          setGender("");
        }}
        className={`${""} w-[25%]`}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
