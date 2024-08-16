import React from 'react'

export default function table ({ value }) {
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
                        <th className='border-4' key={cellIndex}>{cell}</th>
                      ) : (
                        <td className='border' key={cellIndex}>
                          {Array.isArray(cell) ? (
                            <ul>
                              {cell.map((item, itemIndex) => (
                                <li className='list-decimal ml-10' key={itemIndex}>{item}</li>
                              ))}
                            </ul>
                          ) : (
                            cell
                          )}
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
