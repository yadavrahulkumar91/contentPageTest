"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { renderAttributes } from "./lessonContent";

import OrgChart, {
  LayoutType,
  ConnectorAlignment,
} from "awesome-react-org-chart";

// Dynamically import the OrgChart component to disable SSR
const DynamicOrgChart = dynamic(() => import("awesome-react-org-chart"), {
  ssr: false,
});

export default function Aroc({ data, layout_type }) {
  const isValidNode = (node) => node !== undefined && node !== null;

  // Modified keyGetter to generate a unique key based on the node's depth and index
  const generateUniqueKey = (node, parentKey = "0") => {
    const children = node.children || [];
    return {
      ...node,
      key: `${parentKey}-${children.length}`,
      children: children.map((child, index) =>
        generateUniqueKey(child, `${parentKey}-${index}`)
      ),
    };
  };

  const orgDataWithKeys = generateUniqueKey(data);

  const keyGetter = (node) => node.key;
  const renderNode = (node) => (
    <div className="border-[3px] border-[green]  z-10 bg-white">
      <div
        className="text-[20px] leading-[20px]  font-semibold bg-green-300 px-1 whitespace-break-spaces"
        dangerouslySetInnerHTML={{ __html: node.name }}
      />
      <div>
        {/* {node.about ? renderAttributes(node.about, node.level ?? 2) : null} */}
        {node.about ? (
          <span
            className="px-[2px]"
            dangerouslySetInnerHTML={{ __html: node.about }}
          />
        ) : null}
      </div>
    </div>
  );
  const childNodesGetter = (node) => node.children || [];

  // Optional styles
  const lineHorizontalStyle = {
    borderTop: "3px solid  green",
    // transition: '800ms transform, 800ms width, 800ms height'
  };
  const lineVerticalStyle = {
    borderLeft: "3px solid  green",
    // transition: '800ms transform, 800ms width, 800ms height'
  };
  const containerStyle = { margin: "", pointerEvents: "none" };

  // Use layout_type prop instead of hardcoded layout
  const layout = LayoutType[layout_type] || LayoutType.FISHBONE_1;

  const debug = false;

  return (
    <DynamicOrgChart
      root={orgDataWithKeys}
      isValidNode={isValidNode}
      keyGetter={keyGetter}
      renderNode={renderNode}
      childNodesGetter={childNodesGetter}
      lineHorizontalStyle={lineHorizontalStyle}
      lineVerticalStyle={lineVerticalStyle}
      measureStrategy="effect"
      connectorThickness={1}
      connectorAlignment={ConnectorAlignment.Center}
      layout={layout}
      containerStyle={containerStyle}
      debug={debug}
    />
  );
}
