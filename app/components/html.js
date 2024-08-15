import React from 'react'

export default function html ({ value }) {
  return value && Array.isArray(value) && value.length > 0
    ? value.map((chartObject, index) => {
        const { data } = chartObject

        if (Array.isArray(data)) {
          const chartContent = data.join('\n')

          // Use dangerouslySetInnerHTML for HTML content
          return (
            <div
              key={index}
              dangerouslySetInnerHTML={{ __html: chartContent }}
            />
          )
        } else {
          // Handle the case where data is not an array (optional)
          console.error(
            `Invalid data format at index ${index}. Expected an array.`
          )
          return null // or handle it in a way that makes sense for your application
        }
      })
    : null
}
