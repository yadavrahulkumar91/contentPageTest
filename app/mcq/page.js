"use client"

import React from "react";
import data from "./data"

export default function Home() {
  
  const handleButtonClick = async ()=>{
     const response = await fetch("/api/insertMcqs", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ data }),
     });

     if (response.ok) {
       console.log("MCQs inserted successfully");
       alert("MCQs inserted successfully");
     } else {
       console.error("Failed to insert MCQs");
       alert("Failed to insert MCQs");
     }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Insert MCQs
      </button>
  
    </div>
  );
}
