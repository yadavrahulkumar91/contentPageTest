import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'
import styled from 'styled-components'
import { renderAttributes } from './lessonContent'

const StyledNode = styled.div`
  overflow: hidden;
  border-radius: 8px;
  display: inline-block;
  border: 3px solid green;
`

const StyledTreeExample = ({ value }) => {
  return value && Array.isArray(value) && value.length > 0
    ? value.map((item, index) => (
        <div className='w-6' key={index}>
          <OrgChart item={item.data} />
          <div className=''><span>Fig. </span>{item.caption ? item.caption : null}</div>
        </div>
      ))
    : null
}

export default StyledTreeExample

function OrgChart ({ item }) {
  const renderTree = node => {
    if (!node.children || node.children.length === 0) {
      return (
        <TreeNode
          label={
            <StyledNode>
              <div className='text-xl font-semibold bg-green-300 px-2'>
                {node.name}
              </div>
              <div>
                {' '}
                {node.about
                  ? renderAttributes(node.about, node.level ?? 2)
                  : null}
              </div>
            </StyledNode>
          }
        />
      )
    }

    return (
      <TreeNode
        label={
          <StyledNode>
            <div className='text-[22px] font-semibold bg-green-300 px-1'>
              {node.name}
            </div>
            <div>
              {' '}
              {node.about
                ? renderAttributes(node.about, node.level ?? 2)
                : null}
            </div>
          </StyledNode>
        }
      >
        {node.children.map((child, index) => (
          <React.Fragment key={index}>{renderTree(child)}</React.Fragment>
        ))}
      </TreeNode>
    )
  }

  return (
    <Tree
      lineWidth={'2px'}
      lineColor={'green'}
      lineBorderRadius={'10px'}
      label={
        <StyledNode>
          <div className='text-2xl font-bold bg-green-300 px-1'>
            {item.name}
          </div>
          <div>
            {item.about ? renderAttributes(item.about, item.level ?? 2) : null}
          </div>
        </StyledNode>
      }
    >
      {item.children &&
        item.children.map((child, index) => (
          <React.Fragment key={index}>{renderTree(child)}</React.Fragment>
        ))}
    </Tree>
  )
}
