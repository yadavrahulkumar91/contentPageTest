'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import OrgChart, {
  LayoutType,
  NodeContainerRenderContext,
  NodeContainerRenderProps,
  NodeLineRenderProps,
  NodeLineRenderContext,
  Animated,
  ConnectorAlignment
} from 'awesome-react-org-chart'

// Dynamically import the OrgChart component to disable SSR
const DynamicOrgChart = dynamic(() => import('awesome-react-org-chart'), {
  ssr: false
})

export default function Aroc () {
  // Define your orgData
  const orgData = {
    id: 1,
    name: 'CEO',
    title: 'Chief Executive Officer',
    children: [
      {
        id: 2,
        name: 'CTO',
        title: 'Chief Technology Officer',
        children: [
          {
            id: 3,
            name: 'Dev Manager',
            title: 'Development Manager',
            children: [
              {
                id: 4,
                name: 'Lead Developer',
                title: 'Lead Developer'
              },
              {
                id: 5,
                name: 'QA Lead',
                title: 'Quality Assurance Lead'
              }
            ]
          }
        ]
      },
      {
        id: 6,
        name: 'CFO',
        title: 'Chief Financial Officer',
        children: [
          {
            id: 7,
            name: 'Finance Manager',
            title: 'Finance Manager'
          }
        ]
      }
    ]
  }

  // Helper functions
  const isValidNode = node => node !== undefined && node !== null
  const keyGetter = node => node.id
  const renderNode = node => (
    <div className='border-4 mx-6 z-10 bg-white'>
      <strong>{node.name}</strong>
      <p>{node.title}</p>
    </div>
  )
  const childNodesGetter = node => node.children || []

  // Optional styles
  const lineHorizontalStyle = {
    borderTop: '2px solid rgba(60,60,60,1)',
    transition: '800ms transform, 800ms width, 800ms height'
  }
  const lineVerticalStyle = {
    borderLeft: '2px solid rgba(60,60,60,1)',
    transition: '800ms transform, 800ms width, 800ms height'
  }
  const containerStyle = { margin: '', pointerEvents: 'none' }
  const layout = LayoutType.LINEAR //  LINEAR | SMART | FISHBONE_1 | FISHBONE_2 | FISHBONE_3 | FISHBONE_4 | SINGLE_COLUMN_LEFT | SINGLE_COLUMN_RIGHT | STACKERS | ASSISTANTS
  const debug = false // Set to true if you want to see debugging information

  return (
    <DynamicOrgChart
      root={orgData}
      isValidNode={isValidNode}
      keyGetter={keyGetter}
      renderNode={renderNode}
      childNodesGetter={childNodesGetter}
      lineHorizontalStyle={lineHorizontalStyle}
      lineVerticalStyle={lineVerticalStyle}
      measureStrategy='effect'
      connectorThickness={2}
      connectorAlignment={ConnectorAlignment.Center}
      layout={layout}
      containerStyle={containerStyle}
      debug={debug}
    />
  )
}
