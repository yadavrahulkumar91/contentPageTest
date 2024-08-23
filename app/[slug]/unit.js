'use client'
import React, { useState, useEffect } from 'react'
import LessonPage from './LessonPage'
import Sidebar from './sidebar'

export default function Unit ({ units }) {
  
  let lessonCounter = 1
  const [activeLesson, setActiveLesson] = useState(1)

  useEffect(() => {
    const element = document.getElementById('lesson-' + activeLesson)
    if (element) {
      element.style.display = 'block'
    }
    const element1 = document.getElementById(activeLesson)
    if (element1) {
      element1.style.color = 'red'
    }
    return () => {
      if (element) {
        element.style.display = 'none' // Cleanup or reset if needed
      }
      const element1 = document.getElementById(activeLesson)
      if (element1) {
        element1.style.color = 'black'
      }
    }
  }, [activeLesson])

  return (
    <div className='box-border flex w-full'>
      <Sidebar units={units} setActiveLesson={setActiveLesson} />

      {/* <div style={{ display: 'flex', width: '90%' }}> */}
      <button
        className='text-2xl p-0 border-2 w-5 fullscreen' 
        onClick={() => setActiveLesson(activeLesson - 1)}
        disabled={activeLesson <= 1}
      >
        ⯇
        {/* <span
          className='text-sm'
          style={{
            writingMode: 'vertical-rl', // or 'vertical-lr' if you prefer
            textOrientation: 'upright'
          }}
        >
          {getElementConten`t(activeLesson - 1)}
        </span> */}
      </button>
      <div className='w-full'>
      {units.map(unit => (
        
        <>
          <LessonPage
            key={unit.id}
            lessons={unit.Lesson}
            unitName={unit.Unit_name}
            lessonCounter={lessonCounter}
            />
          <span className='hidden'>
            {(lessonCounter = lessonCounter + unit.Lesson.length)}
          </span>
        </>
      ))}
      </div>
      <button 
        className='text-xl p-0 border-2 w-5 right-0 fullscreen'
        onClick={() => setActiveLesson(activeLesson + 1)}
        disabled={
          activeLesson >=
          units.reduce((sum, unit) => sum + unit.Lesson.length, 0)
        }
      >
        ⯈
        {/* <span
          className='text-sm'
          style={{
            writingMode: 'vertical-rl', // or 'vertical-lr' if you prefer
            textOrientation: 'upright'
          }}
        >
          {getElementContent(activeLesson + 1)}
        </span> */}
      </button>
      {/* </div> */}
    </div>
  )
}

// function getElementContent (id) {
//   const element = document.getElementById(id)
//   return element ? element.innerText : ''
// }
