import React from 'react'
import { Mermaid } from 'mdx-mermaid/Mermaid'

export default function mermaid ({value}) {
// return <div>Hello</div>

    return (value && Array.isArray(value) && value.length > 0) ? (
            value.map((chartObject, index) => {
                const { type, data } = chartObject;

                if (type === 'graph TD' && Array.isArray(data) && data.length > 0) {
                    const mermaidChart = [
                        type,
                        ...data.map((item, i) => `${String.fromCharCode(65 + i)}["${i + 1}) ${item}"]`),
                        ...data.slice(0, -1).map((_, i) => `${String.fromCharCode(65 + i)} --> ${String.fromCharCode(66 + i)}`)
                    ].join('\n');

                    return <Mermaid key={index} chart={mermaidChart} />;
                } 
                else if (Array.isArray(data) && data.length > 0) {
                            const mermaidChart = data.join('\n');
                    return <Mermaid key={index} chart={mermaidChart} />;
                }
            })

        ) : null;
    
}


// 'use client'
// import React from 'react'
// import { Mermaid } from 'mdx-mermaid/Mermaid'

// export default function MermaidCharts ({ value }) {
//   if (!value || !Array.isArray(value) || value.length === 0) {
//     return null
//   }

//   return (
//     <>
//       {value.map((chartObject, index) => {
//         const { type, data } = chartObject

//         if (type === 'graph TD' && Array.isArray(data) && data.length > 0) {
//           const mermaidChart = [
//             type,
//             ...data.map(
//               (item, i) => `${String.fromCharCode(65 + i)}["${i + 1}) ${item}"]`
//             ),
//             ...data
//               .slice(0, -1)
//               .map(
//                 (_, i) =>
//                   `${String.fromCharCode(65 + i)} --> ${String.fromCharCode(
//                     66 + i
//                   )}`
//               )
//           ].join('\n')

//           return <Mermaid key={index} chart={mermaidChart} />
//         } else if (Array.isArray(data) && data.length > 0) {
//           const mermaidChart = data.join('\n')
//           return <Mermaid key={index} chart={mermaidChart} />
//         }

//         return null
//       })}
//     </>
//   )
// }
