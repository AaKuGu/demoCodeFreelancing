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
    <div aria-label="card" className={`${""} border`} key={d.uniqueId}>
      <div
        aria-label="leftSide"
        className={`${""} `}
        onClick={() => handleCardClick(d)}
      >
        <div>{d.fullName}</div>
        <div>{d.age}</div>
        <div>{d.gender}</div>
      </div>

      <button
        type="button"
        onClick={() => {
          handleDelete(d.uniqueId);
          setFullName("");
          setAge("");
          setGender("");
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
