import React from 'react'
import {renderAttributes } from './lessonContent'

function Note ({value}) {
  return (
    <div>
        {value && Array.isArray(value) && value.length > 0
          ? value.map((note, index) => (
              <div
                className='rounded-md border-yellow-600 border m-2 overflow-hidden'
                key={index} 
              >
                <div className='bg-yellow-200 text-xl'>Note:</div>
                <div className='bg-yellow-50 font-sans'>
                  {renderAttributes(note.data, note.level?note.level: 1)}
                </div>
              </div>
             ))
          : null}
      </div>
  )
}

export default Note

