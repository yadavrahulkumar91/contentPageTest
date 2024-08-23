'use client'
import React, { useEffect, useState } from 'react'
import MCQ from './mcq'
import LessonContent from './lessonContent/lessonContent'
import QA from './qa'
import { MdOutlineFullscreen, MdFullscreenExit } from 'react-icons/md'
import { GoSidebarCollapse, GoSidebarExpand } from 'react-icons/go'

const LessonPage = ({ lessons, lessonCounter, unitName }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.MathJax = {
        tex: {
          inlineMath: [
            ['$', '$'],
            ['\\(', '\\)']
          ]
        },
        svg: {
          fontCache: 'global'
        }
      }
      ;(function () {
        var script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js'
        script.async = true
        document.head.appendChild(script)
      })()
    }
  }, [])

  const [toggled, setToggled] = useState(true)

  useEffect(() => {
    const elements = document.querySelectorAll('.fullscreen')

    elements.forEach(element => {
      if (toggled) {
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
    })

    return () => {
      elements.forEach(element => {
        element.style.display = 'none' // Cleanup or reset if needed
      })
    }
  }, [toggled])

  const [toggled1, setToggled1] = useState(true)

  useEffect(() => {
    const element = document.getElementById('booksidebar')
    if (element) {
      if (toggled1) {
        element.style.display = 'block'
      } else {
        element.style.display = 'none'
      }
    }

    return () => {
      // if (element) {
      element.style.display = 'none' // Cleanup or reset if needed
      // }
    }
  }, [toggled1])

  return (
    <>
      {lessons.map((lesson, i) => (
        <div
          key={lesson.id}
          className='lesson p-0 m-0 top-10 overflow-y-scroll w-full'
          style={{
            borderRadius: '1%',
            border: '2px solid black',
            height: '100svh'
          }}
          id={`lesson-${lessonCounter + i}`}
        >
          <div className='h-12 top-0 flex justify-between z-0 backdrop-blur-sm bg-orange-300'>
            <div>
              <button
                className=''
                onClick={() => {
                  setToggled1(!toggled1)
                }}
              >
                {toggled1 ? <GoSidebarExpand /> : <GoSidebarCollapse />}
              </button>
              <span className='text-lg font-semibold ml-2'>{unitName}</span>
            </div>
            <span className='text-center font-bold text-2xl font-sans '>
              {lessonCounter + i}. {lesson.Lesson_name}
            </span>
            <button
              className='mr-2 text-2xl'
              onClick={() => {
                setToggled(!toggled)
              }}
            >
              {toggled ? <MdOutlineFullscreen /> : <MdFullscreenExit />}
            </button>
          </div>
          {lesson.video_url && (
            <iframe
              // width='100%'
              // height='100vh'
              src={lesson.video_url}
              frameBorder='0'
              allowFullScreen
              // style={{ width: '100%', height: '60vh' }}
            ></iframe>
          )}

          {/* <div className='h-full' style={{ width: '100%', overflow: 'scroll' }}> */}
          <LessonContent lessonContent={lesson.lesson_content} />

          <h2 style={{ backgroundColor: 'grey', border: '2px solid black' }}>
            Multiple Choice Questions
          </h2>
          <MCQ MCQ={lesson.MCQ} />

          <h2 style={{ backgroundColor: 'grey', border: '2px solid black' }}>
            Question Answers
          </h2>
          <QA Question_answer={lesson.Question_answer} />
          {/* </div> */}
        </div>
      ))}
    </>
  )
}

export default LessonPage
