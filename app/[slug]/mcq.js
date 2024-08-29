'use client'
import { useState } from 'react'
import { Askyear } from './qa'
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";

const YourMCQPage = ({ MCQ }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(false)
  const [showExplanation, setShowExplanation] = useState(null)

  const handleOptionSelect = (questionId, option) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: option })
  }

  const handleCheckAnswer = questionId => {
    setShowExplanation(questionId)
  }

  return (
    <div className="box-border w-full text-xl">
      {MCQ.map((mcq) => (
        <div
          key={mcq.id}
          className="border border-solid border-red-500 bg-red-50 rounded-lg my-2  overflow-hidden m-1"
        >
          <div className="flex bg-red-300">
            <span className="mr-1">Q. </span>
            <span dangerouslySetInnerHTML={{ __html: mcq.qu }} />
            <span style={{ display: "flex", justifyContent: "flex-end" }}>
              {/* {qa.Marks.length > 0 ? marks(qa.Marks) : null} */}
              {mcq.Asked_year
                ? mcq.Asked_year.length > 0
                  ? Askyear(mcq.Asked_year)
                  : null
                : null}
            </span>
          </div>

          <form className="ml-3 ">
            <ul className="ml-2">
              {["a", "b", "c", "d"].map((optionKey) => (
                <label style={{ display: "flex" }} key={optionKey}>
                  <input
                    type="radio"
                    name={`answerOptions_${mcq.id}`}
                    value={optionKey}
                    onChange={() => handleOptionSelect(mcq.id, optionKey)}
                    checked={selectedAnswer[mcq.id] === optionKey}
                  />
                  <li
                    style={{ listStyleType: "lower-alpha" }}
                    className="ml-6"
                    dangerouslySetInnerHTML={{ __html: mcq[optionKey] }}
                  />
                </label>
              ))}
            </ul>
            {selectedAnswer[mcq.id] && (
              <p>
                {selectedAnswer[mcq.id] === mcq.ans
                  ? "Correct!"
                  : `Incorrect. Correct Answer: ${mcq.ans}`}
              </p>
            )}
          </form>
          {/* <button onClick={() => handleCheckAnswer(mcq.id)}>Solution</button> */}

          {/* {showExplanation === mcq.id && (
            <div>
              <button onClick={()=>{}}>Solution</button>
              <p className="bg-fuchsia-100 hidden">
                (<span dangerouslySetInnerHTML={{ __html: mcq.ans }} />){" "}
                <span dangerouslySetInnerHTML={{ __html: mcq.sol }} />
              </p>
            </div>
          )} */}
          {SolutionComponent(mcq={mcq})}
        </div>
      ))}
    </div>
  );
}

export default YourMCQPage




function SolutionComponent({ mcq }) {
  // Step 1: Add state to manage visibility
  const [isSolutionVisible, setIsSolutionVisible] = useState(true);

  // Step 2: Toggle the visibility on button click
  const toggleSolution = () => {
    setIsSolutionVisible(!isSolutionVisible);
  };

  return (
    <div>
      <button onClick={toggleSolution}>
        {isSolutionVisible ? <BsEyeSlash /> : <BsEye />}
      </button>
      <p className={`bg-fuchsia-100 ${isSolutionVisible ? "" : "hidden"}`}>
        (<span dangerouslySetInnerHTML={{ __html: mcq.ans }} />){" "}
        <span dangerouslySetInnerHTML={{ __html: mcq.sol }} />
      </p>
    </div>
  );
}

