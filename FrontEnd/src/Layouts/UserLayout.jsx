import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../Components/UserSidebar"; // create this

const UserLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main content */}
      <div className="flex-1 bg-gray-50 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
