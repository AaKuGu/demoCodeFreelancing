"use client";

import React, { useState } from "react";

const page = () => {
  const [data, setData] = useState([
    { name: "Aadarsh", id: 1 },
    { name: "shivam", id: 2 },
  ]);

  const handleUpdateButton = (i) => {
    console.log("🚀 ~ handleUpdateButton ~ i:", i);
    const targetId = data[i]?.id;
    console.log("🚀 ~ handleUpdateButton ~ targetId:", targetId);
    const tempData = [...data];
    tempData.splice(i, 1, { id: targetId, name: "jhoom" });
    setData(tempData);
  };

  console.log("data : ", data);

  return (
    <div>
      {data.map((d, i) => {
        return (
          <div key={i} onClick={() => handleUpdateButton(i)}>
            {d.name}
          </div>
        );
      })}
    </div>
  );
};

export default page;
