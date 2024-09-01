import React from "react";
import TopNavbar from "../components/TopNavbar";
import SidebarAndToolbar from "../components/SidebarAndToolbar";
import FamilyTree from "../components/FamilyTree";

function FamilyTreeMain({ token }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="flex">
        {/* <SidebarAndToolbar /> */}
        <div className="flex-1">
          <FamilyTree token={token} />
        </div>
      </div>
    </div>
  );
}

export default FamilyTreeMain;
