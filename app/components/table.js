import React from 'react'

export default function table ({ value }) {
  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((table, tableIndex) => (
            <table key={tableIndex} border='1'>
              <tbody>
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) =>
                      rowIndex === 0 ? (
                        <th key={cellIndex}>{cell}</th>
                      ) : (
                        <td key={cellIndex}>
                          {Array.isArray(cell) ? (
                            <ul>
                              {cell.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
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
