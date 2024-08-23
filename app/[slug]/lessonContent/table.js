import React from 'react'
import { renderAttributes } from './lessonContent'

export default function Table ({ value }) {
  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((table, tableIndex) => (
            <table className='border m-2' key={tableIndex} border='1'>
              <tbody>
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) =>
                      rowIndex === 0 ? (
                        <th className='border-4' key={cellIndex}>
                          {renderAttributes(cell, table.level ?? 2)}
                        </th>
                      ) : (
                        <td className='border' key={cellIndex}>
                          {renderAttributes(cell, table.level ?? 2)}
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ))
        : null}
    </div>
  )
}
