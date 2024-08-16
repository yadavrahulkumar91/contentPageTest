'use client'
import React from 'react'
import MathJax from 'react-mathjax'
// import { Chart } from 'react-google-charts'
import Mermaid from './components/mermaid'
import Image from './components/image'
import Table from './components/table'
import Html from './components/html'
import Note from './components/note'

const LessonContent = ({ lessonContent }) => {
  //   const pericardiumData1 = JSON.parse(lessonContent)
  return <div>{renderAttributes(lessonContent)}</div>
}
export default LessonContent

export const renderAttributes = (attributes, level = 0) => {
  if (!attributes || typeof attributes !== 'object') {
    return null
  }

  if (Array.isArray(attributes)) {
    return <div>{renderArray(attributes, level)}</div>
  } else if (typeof attributes == 'object') {
    return Object.entries(attributes).map(([key, value]) => {
      return <div key={key}>{renderObject(key, value, level)}</div>
    })
  }
}

function renderArray (attributes, level) {
  return (
    <ol>
      {attributes.map((value, i) => {
        if (Array.isArray(value)) {
          return renderArray(value)
        } else if (typeof value == 'object') {
          return renderAttributes(value, level)
        } else {
          return (
            <li className='list-decimal list-inside ml-8' key={i}>
              <span dangerouslySetInnerHTML={{ __html: value }} />
            </li>
          )
        }
      })}
    </ol>
  )
}

function renderObject (key, value, level) {
  if (/^__image\d*$/.test(key)) {
    return <Image value={value} />
  } else if (/^__table\d*$/.test(key)) {
    return <Table value={value} />
  } else if (/^__mermaid\d*$/.test(key)) {
    return <Mermaid value={value} />
  } else if (key === 'google_chart') {
    return <></>
  } else if (/^__html\d*$/.test(key) || key === 'html') {
    return <Html value={value} />
  } else if (/^__note\d*$/.test(key)) {
    return <Note value={value} />
  } else if (/^__p\d*$/.test(key)) {
    return <p className='text-xl ml-6'>{value}</p>
  } else {
    return elseFunction(key, value, level)
  }
}

function elseFunction (key, value, level) {
  return (
    <div key={key} style={{ marginLeft: `${30}px` }} className=''>
      {renderKey(key, level)}
      {(typeof value === 'object') ? (
        renderAttributes(value, level + 1)
      ) : (
        <span
          key={key}
          style={{ fontSize: '20px' }}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      )}
    </div>
  )
}

function renderKey (key, level) {
  return (
    <span
      style={{
        color: `hsl(330, 50%, ${level * 10}%)`,
        backgroundColor: level === 0 ? 'lightgrey' : null, // Set red background color for level 0
        fontWeight: `${800 - level * 100}`,
        display: level === 0 ? 'block' : null
        // padding: '5px',
      }}
      className={`font-medium text-xl`}
    >
      {formatBulletin(level)} {formatKey(key, level)}
    </span>
  )
}

function formatBulletin (level) {
  if (level === 0) {
    return <span>▢ </span>
  } else if (level === 1) {
    return <span>❖ </span>
  } else if (level === 2) {
    return <span>⟣ </span>
  } else {
    return <span>⬦</span>
  }
}

function formatKey (key, level) {
  let formattedKey = key
  if (level === 0) {
    const style = {
      backgroundcolor: 'red'
    }
    formattedKey = formattedKey.toUpperCase()
  }
  if (key == '') {
    return null
  }
  return <span dangerouslySetInnerHTML={{ __html: formattedKey + ': ' }} />
}
