'use client'
import React, { useState } from 'react'

function SidebarUnit ({ unit, setActiveLesson, lessonCounter }) {
  

  const [open, setOpen] = useState(true)

  return (
    <div key={unit.id} className='pl-2'>
      <h2 className='text-lg font-semibold'>
        {unit.Unit_name}{' '}
        <button onClick={() => setOpen(!open)}>{open ? '-' : '+'}</button>
      </h2>
      {unit.Lesson.map((lesson, i) =>
        open ? (
          <li
            key={i}
            className='cursor-pointer whitespace-nowrap hover:underline  mx-4'
            id={lessonCounter+i}
            onClick={e => setActiveLesson(parseInt(e.target.id, 10))}
          >
          {lessonCounter+i}. {lesson.Lesson_name}
          </li>
        ) : null
      )}
    </div>
  )
}

export default SidebarUnit
