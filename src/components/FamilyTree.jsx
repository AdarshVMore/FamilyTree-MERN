import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import axios from "axios";

const renderCustomNodeElement = ({ nodeDatum }) => {
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
        href={nodeDatum.attributes?.img}
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
        DOB: {nodeDatum.attributes?.DOB}
      </text>
    </g>
  );
};

const FamilyTree = () => {
  const [familyTreeData, setFamilyTreeData] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    relation: "",
    parentId: "",
  });
  const [userId, setUserId] = useState("66cb81f4ce84744020f78195"); // Example user ID
  const fetchFamilyTree = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/families/${userId}`
      );
      setFamilyTreeData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching family tree data:", error);
    }
  };
  useEffect(() => {
    // Fetch family tree data from the backend

    fetchFamilyTree();
  }, [userId]);

  const handleNodeClick = (nodeData) => {
    setSelectedNode(nodeData);
  };

  const handleClosePopup = () => {
    setSelectedNode(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, dob, relation, parentId } = formData; // Destructure formData

    const familyData = {
      name,
      dob,
      relation,
      parentId,
      user_id: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/families",
        familyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        }
      );

      console.log("Family member added:", response.data);
      fetchFamilyTree(); // Refresh family tree after adding a member
    } catch (error) {
      console.error("Error adding family member:", error);
      alert("Error adding family member. Please try again.");
    }
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
      {/* Form to add a new family member */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <h3>Add Family Member</h3>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Relation:</label>
            <input
              type="text"
              name="relation"
              value={formData.relation}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Parent ID (if any):</label>
            <input
              type="text"
              name="parentId"
              value={formData.parentId}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Add Member</button>
        </form>
      </div>

      {familyTreeData && (
        <Tree
          data={familyTreeData}
          translate={translate}
          orientation="vertical"
          pathFunc="elbow"
          collapsible={false}
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
      )}

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
