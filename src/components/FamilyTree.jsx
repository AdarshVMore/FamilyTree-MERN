import React, { useState } from "react";
import Tree from "react-d3-tree";
// import { TreeModal } from "./TreeModal"; // Ensure this import is correct or replace with your modal implementation
import TreeModal from "./TreeModal";

const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      <rect
        width="120"
        height="60"
        x="-60"
        y="-30"
        fill="#ffffff"
        stroke="#1a237e"
        strokeWidth="1.5"
      />
      <image
        href={nodeDatum.attributes.img}
        x="-50"
        y="-20"
        width="40"
        height="40"
        clipPath="circle(20px)"
      />
      <text fill="#1a237e" x="0" y="-10" textAnchor="middle" fontSize="14">
        {nodeDatum.name}
      </text>
      <text fill="#4caf50" x="0" y="10" textAnchor="middle" fontSize="12">
        DOB: {nodeDatum.attributes.DOB}
      </text>
      <rect
        width="120"
        height="60"
        x="-60"
        y="-30"
        fill="transparent"
        onClick={() => toggleNode()}
        style={{ cursor: "pointer" }}
      />
    </g>
  );
};

const FamilyTree = () => {
  // Updated family tree data
  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  const handleClosePopup = () => {
    setSelectedNode(null);
  };
  const familyTreeData = {
    user_id: "123456",
    member_id: "1",
    name: "William Doe",
    attributes: { DOB: "1920-01-15" },
    children: [
      {
        member_id: "1.1",
        name: "George Doe",
        attributes: { DOB: "1945-09-18" },
        children: [
          {
            member_id: "1.1.1",
            name: "Richard Doe",
            attributes: { DOB: "1970-03-12" },
            children: [
              {
                member_id: "1.1.1.1",
                name: "John Doe",
                attributes: { DOB: "1995-10-01" },
                children: [
                  {
                    member_id: "1.1.1.1.1",
                    name: "Lucas Doe",
                    attributes: { DOB: "2020-08-14" },
                  },
                  {
                    member_id: "1.1.1.1.2",
                    name: "Sophia Doe",
                    attributes: { DOB: "2023-04-27" },
                  },
                ],
              },
              {
                member_id: "1.1.1.2",
                name: "Sarah Doe",
                attributes: { DOB: "1998-02-20" },
                children: [
                  {
                    member_id: "1.1.1.2.1",
                    name: "Ella Smith",
                    attributes: { DOB: "2022-09-30" },
                  },
                ],
              },
            ],
          },
          {
            member_id: "1.1.2",
            name: "Robert Doe",
            attributes: { DOB: "1973-08-30" },
            children: [
              {
                member_id: "1.1.2.1",
                name: "James Doe",
                attributes: { DOB: "2000-04-22" },
              },
              {
                member_id: "1.1.2.2",
                name: "Olivia Doe",
                attributes: { DOB: "2003-07-09" },
              },
            ],
          },
          {
            member_id: "1.1.3",
            name: "Patricia Doe",
            attributes: { DOB: "1976-12-21" },
            children: [
              {
                member_id: "1.1.3.1",
                name: "Emma Johnson",
                attributes: { DOB: "2005-05-17" },
              },
              {
                member_id: "1.1.3.2",
                name: "Noah Johnson",
                attributes: { DOB: "2008-11-11" },
              },
            ],
          },
        ],
      },
      {
        member_id: "1.2",
        name: "Charles Doe",
        attributes: { DOB: "1948-12-27" },
        children: [
          {
            member_id: "1.2.1",
            name: "Henry Doe",
            attributes: { DOB: "1975-09-05" },
            children: [
              {
                member_id: "1.2.1.1",
                name: "Lily Doe",
                attributes: { DOB: "2001-02-14" },
              },
              {
                member_id: "1.2.1.2",
                name: "Ethan Doe",
                attributes: { DOB: "2004-10-23" },
              },
            ],
          },
          {
            member_id: "1.2.2",
            name: "Margaret Doe",
            attributes: { DOB: "1978-06-16" },
            children: [
              {
                member_id: "1.2.2.1",
                name: "Zoe Brown",
                attributes: { DOB: "2006-07-07" },
              },
            ],
          },
          {
            member_id: "1.2.3",
            name: "Thomas Doe",
            attributes: { DOB: "1980-11-01" },
            children: [
              {
                member_id: "1.2.3.1",
                name: "Daniel Doe",
                attributes: { DOB: "2010-01-05" },
              },
              {
                member_id: "1.2.3.2",
                name: "Grace Doe",
                attributes: { DOB: "2013-06-22" },
              },
            ],
          },
        ],
      },
    ],
  };

  const [translate] = useState({ x: 400, y: 100 });

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
        zoomable={true}
        pan={true}
        zoom={0.1}
        scaleExtent={{ min: 0.1, max: 2 }}
        nodeSize={{ x: 200, y: 100 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNodeElement({
            ...rd3tProps,
            toggleNode: () => handleNodeClick(rd3tProps.nodeDatum),
          })
        }
        styles={{
          links: {
            stroke: "#1a237e",
            strokeWidth: 3,
          },
        }}
      />

      {/* Popup for node details */}
      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            zIndex: 10,
          }}
        >
          <h2>{selectedNode.name}</h2>
          <p>DOB: {selectedNode.attributes.DOB}</p>
          {/* Add more details here */}
          <button
            onClick={handleClosePopup}
            style={{ marginTop: "10px", padding: "5px 10px" }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
