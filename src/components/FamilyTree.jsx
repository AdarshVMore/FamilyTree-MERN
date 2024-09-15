import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import axios from "axios";
import AddFamilies from "./AddFamilies";

// Custom node rendering function to match the UI
const renderCustomNodeElement = ({
  nodeDatum,
  toggleNode,
  onAddMember,
  onViewMember,
  setSelectedParentNode, // Function to set the selected parent node
}) => {
  if (!nodeDatum) return null;

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
        fill="#C8FF53"
        stroke="none"
        rx="5"
        ry="5"
        onClick={() => onViewMember(nodeDatum)}
        style={{ cursor: "pointer" }}
      />
      <text
        fill="#000000"
        x="-120"
        y="15"
        textAnchor="right"
        fontSize="30"
        fontWeight="bold"
      >
        {name}
      </text>
      <text fill="#545454" x="-120" y="50" textAnchor="right" fontSize="22">
        {dob}
      </text>
      <text
        fill="#043500"
        x="120"
        y="0"
        textAnchor="middle"
        fontSize="40"
        fontWeight="middle"
        onClick={() => {
          onAddMember(nodeDatum);
          setSelectedParentNode(nodeDatum.member_id); // Set the selected parent node // Open the add member form
        }}
        style={{ cursor: "pointer" }}
      >
        +
      </text>
      {hasChildren && (
        <text
          fill="#043500"
          x="120"
          y="60"
          textAnchor="middle"
          fontSize="30"
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
const FamilyTree = ({ token }) => {
  const [translate] = useState({ x: 400, y: 100 });
  const [familyTreeData, setFamilyTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedParentNode, setSelectedParentNode] = useState(null); // Track selected parent node
  const [showAddFamiliesForm, setShowAddFamiliesForm] = useState(false); // Track form visibility
  const [familyTreeExist, setFamilyTreeExist] = useState(false);
  // const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchFamilyTreeData = async () => {
      //console.log("Fetching family tree data with token:", token);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        const response = await axios.get(
          "http://3.110.209.170:3000/api/families",
          config
        );
        //console.log("Fetched family tree data:", response.data);
        setFamilyTreeData(response.data);
        setFamilyTreeExist(true);
      } catch (error) {
        setSelectedParentNode("1");
        if (!familyTreeData) {
          setShowAddFamiliesForm(true);
        }
        console.error("Error fetching family tree data:", error);
        setError("Failed to fetch family tree data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyTreeData();
  }, [token]);

  useEffect(() => {
    if (familyTreeData) {
      //console.log("Family tree data updated:", familyTreeData);
    }
  }, [familyTreeData]);

  const handleAddMember = (parentNode) => {
    setSelectedParentNode(parentNode.member_id);
    //console.log(parentNode.member_id);
    setShowAddFamiliesForm(true); // Show the form
  };

  const handleAddNewMember = (newMember) => {
    //console.log("New member is:", newMember);

    // const updateTree = (node) => {
    //   if (selectedParentNode) {
    //     if (node.member_id === selectedParentNode.member_id) {
    //       //console.log("Adding new member to parent:", node);
    //       node.children = [...(node.children || []), newMember];
    //       //console.log("Updated children:", node.children);
    //     }
    //   } else if (node.children) {
    //     node.children.forEach(updateTree);
    //   }
    // };

    setFamilyTreeData(() => {
      // Create a deep copy of the family tree data
      const newData = JSON.parse(JSON.stringify(newMember));
      // Update the tree
      setFamilyTreeData(newData);
      //console.log("Updated familyTreeData before setting state:", newData);
      return newData;
    });

    setShowAddFamiliesForm(false);
    setSelectedParentNode(null);
  };

  const saveFamilyTree = async () => {
    if (!familyTreeData) {
      console.error("No family tree data to save.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.post(
        "http://3.110.209.170:3000/api/families",
        familyTreeData,
        config
      );

      if (response.status === 201) {
        //console.log("Family tree saved successfully:", response.data);
        alert("Family tree saved successfully!");
      } else {
        console.error("Failed to save the family tree:", response.data);
      }
    } catch (error) {
      console.error("Error saving the family tree:", error);
      alert("An error occurred while saving the family tree.");
    }
  };

  const handleViewMember = (nodeDatum) => {
    // Logic for viewing member details (perhaps open a modal with member data)
    //console.log("Viewing member:", nodeDatum);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div
      id="treeWrapper"
      className="w-full h-screen bg-green-100 overflow-hidden relative"
    >
      {familyTreeData && (
        <Tree
          data={familyTreeData} // This should re-render when familyTreeData changes
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
              setSelectedParentNode, // Pass the function to set the selected parent node
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
      )}

      {showAddFamiliesForm && (
        <AddFamilies
          onAddNewMember={handleAddNewMember}
          parentNode={selectedParentNode}
          setShowAddFamiliesForm={setShowAddFamiliesForm}
          familyTreeData={familyTreeData}
          familyTreeExist={familyTreeExist}
          token={token}
        />
      )}

      <button className="fixed top-20 right-5" onClick={saveFamilyTree}>
        Save
      </button>
    </div>
  );
};

export default FamilyTree;
