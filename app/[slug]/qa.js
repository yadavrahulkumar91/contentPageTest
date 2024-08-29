import React from 'react'

export default function QA ({ Question_answer }) {
  return Question_answer.map(qa => (
    <div key={qa.id}>
      <div
        
        id={`qa-${qa.id}`}
        style={{ display: 'flex', backgroundColor: 'lightgrey' }}
      >
        <span>
          <p style={{ marginLeft: ' 5px', marginRight: '5px' }}>Q.</p>
        </span>
        <span dangerouslySetInnerHTML={{ __html: qa.Question }} />
        <span style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {qa.Marks.length > 0 ? marks(qa.Marks) : null}
          {qa.Asked_year.length > 0 ? Askyear(qa.Asked_year) : null}
        </span>
      </div>

      <div style={{ display: 'flex' }}>
        <span>d
          <p style={{ marginLeft: ' 5px', marginRight: '5px' }}>➤</p>{' '}
        </span>
        <span dangerouslySetInnerHTML={{ __html: qa.Answer }} />
      </div>
    </div>
  ))
}

export function Askyear (years) {
  return (
    <p>
      [
      {years.map((year, index) => (
        <span id={`qa-${index}`} key={year.id}>
          {year.Asked_year}
          {index < years.length - 1 && ', '}
        </span>
      ))}
      ]
    </p>
  )
}

function marks (marks) {
  const totalMarks = marks.reduce((sum, mark) => sum + mark.Mark, 0)
  return (
    <p>
      (
      {marks.map((mark, index) => (
        <span key={mark.id}>
          {mark.Mark}
          {index < marks.length - 1 && ' + '}
        </span>
      ))}
      = {totalMarks})
    </p>
  )
}
