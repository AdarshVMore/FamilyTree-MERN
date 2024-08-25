import React from "react";
import TopNavbar from "../components/TopNavbar";
import SidebarAndToolbar from "../components/SidebarAndToolbar";
import FamilyTree from "../components/FamilyTree";

function FamilyTreeMain() {
  return (
    <div>
      <TopNavbar />
      <SidebarAndToolbar />
      <FamilyTree />
    </div>
  );
}

export default FamilyTreeMain;
