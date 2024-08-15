import React from 'react'
import {renderAttributes } from '../render'

function Note ({ key, value, isArray, isObject, level }) {
  return (
    <div>
        {value && Array.isArray(value) && value.length > 0
          ? value.map((note, index) => (
              <div
                className='border-r-2 border-black border-2'
                key={index} // Ensure unique key for each item
              >
                <div className='bg-red-500 text-2xl'>Note:</div>
                <div className='bg-yellow-300 font-sans'>
                  {renderAttributes(note.data, 1)}
                </div>
              </div>
             ))
          : null}
      </div>
  )
}

export default Note

