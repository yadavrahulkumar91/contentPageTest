import React from 'react'
import {renderAttributes } from './lessonContent'

function Note ({value}) {
  return (
    <div>
        {value && Array.isArray(value) && value.length > 0
          ? value.map((note, index) => (
              <div
                className='rounded-xl border-black border-2 m-2 overflow-hidden'
                key={index} 
              >
                <div className='bg-red-300 text-2xl'>Note:</div>
                <div className='bg-yellow-200 font-sans'>
                  {renderAttributes(note.data, 1)}
                </div>
              </div>
             ))
          : null}
      </div>
  )
}

export default Note

