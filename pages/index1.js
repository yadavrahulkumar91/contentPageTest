import React from "react";

export default function Home() {
  const handleButtonClick = async () => {
    const lessonId = 70; // Replace with your actual lesson ID
    const response = await fetch("/api/index1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lessonId }),
    });

    if (response.ok) {
      console.log("MCQs inserted successfully");
    } else {
      console.error("Failed to insert MCQs");
    }
  };

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
