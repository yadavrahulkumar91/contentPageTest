'use client'
import React from 'react'
import MathJax from 'react-mathjax'
// import { Chart } from 'react-google-charts'
import Mermaid from './mermaid'
import Image from './image'
import Table from './table'
import Html from './html'
import Note from './note'

const LessonContent = ({ lessonContent }) => {
  // const jsonLessonContent = JSON.parse(lessonContent)
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

  return <div className='ml-[-30px]'>{renderAttributes(lessonContent)}</div>
}
export default LessonContent

export const renderAttributes = (attributes, level = 0) => {
  if (!attributes) {
    return null
  }

  if (Array.isArray(attributes)) {
    return <div>{renderArray(attributes, level)}</div>
  } else if (typeof attributes == 'object') {
    return Object.entries(attributes).map(([key, value]) => {
      return (
        <div key={key} className='ml-[30px]'>
          {renderObject(key, value, level)}
        </div>
      )
    })
  } else {
    return <div>{attributes}</div>
  }
}

function renderArray (attributes, level) {
  return (
    <ol className='ml-8'>
      {attributes.map((value, i) => {
        if (Array.isArray(value)) {
          return renderArray(value)
        } else if (typeof value == 'object') {
          return renderAttributes(value, level)
        } else {
          return (
            <li className='list-decimal list-inside ' key={i}>
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
    <div
      key={key}
      // style={{ marginLeft: `${30}px` }}
      className=''
    >
      {renderKey(key, level)}
      {typeof value === 'object' ? (
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
        backgroundColor: level === 0 ? 'lightgrey' : null,
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
