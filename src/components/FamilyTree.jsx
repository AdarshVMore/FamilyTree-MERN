import React, { useState } from "react";
import Tree from "react-d3-tree";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

// Sample Family Tree Data
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

// Custom node rendering function to match the UI
const renderCustomNodeElement = ({
  nodeDatum,
  toggleNode,
  onAddMember,
  onViewMember,
}) => {
  const { name, attributes, children } = nodeDatum;
  const dob = attributes?.DOB || "";
  const hasChildren = children && children.length > 0;

  return (
    <g>
      <rect
        width="300"
        height="120"
        x="-150"
        y="-40"
        fill="#C8FF53" // Updated background color to match the neon green
        stroke="none" // No border as per the image
        rx="5"
        ry="5"
        onClick={() => onViewMember(nodeDatum)} // Show member details on click
        style={{ cursor: "pointer" }}
      />
      <text
        fill="#000000" // Black color for the main text
        x="-120"
        y="15"
        textAnchor="right"
        fontSize="30" // Larger font size for the name
        fontWeight="bold"
      >
        {name}
      </text>
      <text fill="#545454" x="-120" y="50" textAnchor="right" fontSize="22">
        {dob}
      </text>
      {/* "+" button to add a family member */}
      <text
        fill="#043500" // Black color for the button
        x="120"
        y="0"
        textAnchor="middle"
        fontSize="40" // Larger font size for the "+"
        fontWeight="middle"
        onClick={onAddMember}
        style={{ cursor: "pointer" }}
      >
        +
      </text>
      {/* Toggle button */}
      {hasChildren && (
        <text
          fill="#043500" // Black color for the button
          x="120"
          y="60"
          textAnchor="middle"
          fontSize="30" // Larger font size for the "+"
          fontWeight="middle"
          onClick={toggleNode}
          style={{ cursor: "pointer" }}
        >
          {nodeDatum.__rd3t.collapsed ? "↓" : "↑"}
        </text>
      )}
    </g>
  );
};

// Family Tree Component
const FamilyTree = () => {
  const [translate] = useState({ x: 400, y: 100 });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Show add form pop-up
  const handleAddMember = () => {
    setShowAddForm(true);
  };

  // Close add form pop-up
  const closeAddForm = () => {
    setShowAddForm(false);
  };

  // Show member info pop-up
  const handleViewMember = (member) => {
    setSelectedMember(member);
    setShowMemberInfo(true);
  };

  // Close member info pop-up
  const closeMemberInfo = () => {
    setShowMemberInfo(false);
    setSelectedMember(null);
  };

  return (
    <div
      id="treeWrapper"
      className="w-full h-screen bg-green-100 overflow-hidden relative"
    >
      {/* Family Tree */}
      <Tree
        data={familyTreeData}
        translate={translate}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={true}
        zoomable={true}
        pan={true}
        zoom={0.8}
        scaleExtent={{ min: 0.1, max: 2 }}
        nodeSize={{ x: 400, y: 200 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNodeElement({
            ...rd3tProps,
            toggleNode: rd3tProps.toggleNode,
            onAddMember: handleAddMember,
            onViewMember: handleViewMember,
          })
        }
        styles={{
          nodes: {
            node: { circle: { fill: "#81c784" } },
            leafNode: { circle: { fill: "#66bb6a" } },
          },
          links: {
            stroke: "#2e7d32",
            strokeWidth: 2,
          },
        }}
      />

      {/* Add Member Form Pop-up */}
      {showAddForm && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeAddForm}
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              Add Family Member
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <input
                type="date"
                placeholder="DOB"
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <input
                type="text"
                placeholder="Relation"
                className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Member Info Pop-up */}
      {showMemberInfo && selectedMember && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
          <div className="bg-white rounded-lg p-6 w-1/3 shadow-md relative">
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={closeMemberInfo}
            >
              x
            </button>
            <h2 className="text-2xl font-bold mb-4 text-green-800">
              {selectedMember.name}
            </h2>
            <p className="text-green-700">
              <strong>DOB:</strong> {selectedMember.attributes?.DOB}
            </p>
            {/* Add more detailed info fields here if needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyTree;
