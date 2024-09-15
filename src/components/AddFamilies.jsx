import React, { useState } from "react";
import axios from "axios";

const AddFamilies = ({
  onAddNewMember,
  parentNode,
  setShowAddFamiliesForm,
  familyTreeData,
  familyTreeExist,
  token,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
  });

  //console.log("Parent Node (member_id) from props:", parentNode);
  //console.log("Initial familyTreeData:", familyTreeData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to find the node in the family tree by member_id and add new member
  const findAndAddMember = (data, parentId, newMember) => {
    if (data.member_id === parentId) {
      //console.log(`Found the parent with member_id: ${parentId}`);
      data.children = [...(data.children || []), newMember];
      //console.log("Updated parent's children:", data.children);
      return true;
    }

    if (data.children) {
      for (let i = 0; i < data.children.length; i++) {
        if (findAndAddMember(data.children[i], parentId, newMember)) {
          return true;
        }
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob) {
      //console.log("Form is incomplete");
      return;
    }

    console.log(familyTreeExist);

    if (familyTreeExist) {
      try {
        console.log(familyTreeExist);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        };
        const addChild = async () => {
          const response = await axios.post(
            "http://3.110.209.170:3000/api/families/addChild",
            {
              parent_id: parentNode,
              name: formData.name,
              attributes: { DOB: formData.dob },
            },
            config
          );
          console.log("response is", response);
          if (response.status === 201) {
            console.log("Add child happend successfully:", response.data);
            alert("Family tree saved successfully!");
          } else {
            console.error("Failed to save the family tree:", response.data);
          }
        };
        addChild();
      } catch (e) {
        console.log("adding child error is", e);
      }
    }

    const newMemberData = {
      member_id: familyTreeData
        ? `${parentNode}.${(familyTreeData.children || []).length + 1}`
        : "1", // If there's no data, this will be the root with member_id "1"
      name: formData.name,
      attributes: { DOB: formData.dob },
      children: [],
    };

    //console.log("New member data to add:", newMemberData);

    let familyTreeCopy;

    if (!familyTreeData) {
      // If familyTreeData is null, initialize the tree with the new member as the root
      familyTreeCopy = newMemberData; // New member is the root node
      //console.log("Created new family tree with root member:", familyTreeCopy);
    } else {
      // Copy existing family tree and add the new member under the parent
      familyTreeCopy = JSON.parse(JSON.stringify(familyTreeData));
      const isParentFound = findAndAddMember(
        familyTreeCopy,
        parentNode,
        newMemberData
      );

      if (!isParentFound) {
        //console.log(`Parent with member_id: ${parentNode} not found.`);
      }
    }

    // console.log(
    //   "Updated familyTreeData after adding new member:",
    //   familyTreeCopy
    // );
    onAddNewMember(familyTreeCopy); // Pass the updated family tree data back to the parent

    setFormData({ name: "", dob: "" });
    setShowAddFamiliesForm(false); // Hide the form
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-md relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={() => setShowAddFamiliesForm(false)}
        >
          x
        </button>
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Add Family Member
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-green-300 rounded-md focus:outline-none focus:border-green-500"
          />
          <input
            type="date"
            name="dob"
            placeholder="DOB"
            value={formData.dob}
            onChange={handleInputChange}
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
  );
};

export default AddFamilies;
