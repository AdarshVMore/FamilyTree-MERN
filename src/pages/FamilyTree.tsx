import React, { useState } from "react";
import Tree from "react-d3-tree";

const familyTreeData = {
  name: "William Doe",
  attributes: { DOB: "1920-01-15" },
  children: [
    {
      name: "George Doe",
      attributes: { DOB: "1945-09-18" },
      children: [
        {
          name: "Richard Doe",
          attributes: { DOB: "1970-03-12" },
          children: [
            {
              name: "John Doe",
              attributes: { DOB: "1995-10-01" },
              children: [
                { name: "Lucas Doe", attributes: { DOB: "2020-08-14" } },
                { name: "Sophia Doe", attributes: { DOB: "2023-04-27" } },
              ],
            },
            {
              name: "Sarah Doe",
              attributes: { DOB: "1998-02-20" },
              children: [
                { name: "Ella Smith", attributes: { DOB: "2022-09-30" } },
              ],
            },
          ],
        },
        {
          name: "Robert Doe",
          attributes: { DOB: "1973-08-30" },
          children: [
            { name: "James Doe", attributes: { DOB: "2000-04-22" } },
            { name: "Olivia Doe", attributes: { DOB: "2003-07-09" } },
          ],
        },
        {
          name: "Patricia Doe",
          attributes: { DOB: "1976-12-21" },
          children: [
            { name: "Emma Johnson", attributes: { DOB: "2005-05-17" } },
            { name: "Noah Johnson", attributes: { DOB: "2008-11-11" } },
          ],
        },
      ],
    },
    {
      name: "Charles Doe",
      attributes: { DOB: "1948-12-27" },
      children: [
        {
          name: "Henry Doe",
          attributes: { DOB: "1975-09-05" },
          children: [
            { name: "Lily Doe", attributes: { DOB: "2001-02-14" } },
            { name: "Ethan Doe", attributes: { DOB: "2004-10-23" } },
          ],
        },
        {
          name: "Margaret Doe",
          attributes: { DOB: "1978-06-16" },
          children: [{ name: "Zoe Brown", attributes: { DOB: "2006-07-07" } }],
        },
        {
          name: "Thomas Doe",
          attributes: { DOB: "1980-11-01" },
          children: [
            { name: "Daniel Doe", attributes: { DOB: "2010-01-05" } },
            { name: "Grace Doe", attributes: { DOB: "2013-06-22" } },
          ],
        },
      ],
    },
  ],
};

const FamilyTree = () => {
  const [translate] = useState({ x: 400, y: 50 });

  return (
    <div
      id="treeWrapper"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#f0f4f8",
        overflow: "hidden",
      }}
    >
      <Tree
        data={familyTreeData}
        translate={translate}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={true}
        zoomable={true} // Enable zoom
        pan={true} // Enable panning (dragging)
        zoom={0.1} // Initial zoom level
        scaleExtent={{ min: 0.1, max: 2 }} // Zoom limits
        nodeSize={{ x: 100, y: 100 }}
        styles={{
          nodes: {
            node: { circle: { fill: "#ff5722" } },
            leafNode: { circle: { fill: "#4caf50" } },
          },
          links: {
            stroke: "#1a237e",
            strokeWidth: 3,
          },
        }}
      />
    </div>
  );
};

export default FamilyTree;
