import React from 'react'
import { renderAttributes } from './lessonContent'

export default function Table ({ value }) {
  return (
    <div>
      {value && Array.isArray(value) && value.length > 0
        ? value.map((table, tableIndex) => (
            <table className="m-2 " key={tableIndex} border="1">
              {table.caption ? (
                <caption className="text-base">
                  <span> Table: </span>
                  <span
                    dangerouslySetInnerHTML={{ __html: table.caption }}
                  />
                </caption>
              ) : null}

              <tbody>
                {table.data.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) =>
                      rowIndex === 0 ? (
                        <th
                          className="border border-blue-600 bg-blue-300"
                          key={cellIndex}
                        >
                          {renderAttributes(cell, table.level ?? 2)}
                        </th>
                      ) : (
                        <td
                          className="border border-blue-400 bg-blue-50"
                          key={cellIndex}
                        >
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
  );
}
