'use client'

import React, { useState, useEffect } from 'react'
import SidebarUnit from './sidebarUnit'
export default function SideBar ({ units, setActiveLesson }) {
 

  let lessonCounter = 1

  return (
    <div>
      <div
        id='booksidebar'
        className='max-h-screen overflow-y-scroll w-[200px] fullscreen'
      >
        <ol className='p-0'>
          {units.map((unit, index) => (
            <>
            <SidebarUnit unit={unit} setActiveLesson={setActiveLesson} lessonCounter={lessonCounter}/>
          <span className='hidden'>{(lessonCounter = lessonCounter + unit.Lesson.length)}</span>
          </>
          ))}
        </ol>
      </div>
    </div>
  )
}
