import React, { useContext } from "react";
import { useState } from "react";
import "../../css/DashboardLayout.css"
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import UserContext from "../../context/UserContext";

export default function DashBoardLayout({ activeMenu, children }) {
  const { user } = useContext(UserContext);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="dashboard">
      <Navbar
        activeMenu={activeMenu}
        openSideMenu={openSideMenu}
        setOpenSideMenu={setOpenSideMenu}
      />
      {user === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          {" "}
          {/* Show the SideMenu outside the Navbar */}
          {openSideMenu && (
            <div className="side-menu-overlay">
              <SideMenu activeMenu={activeMenu} />
            </div>
          )}
          <div className={`dashboard-right-section ${openSideMenu?"with-sidebar": "full-width"}`}>{children}</div>
        </>
      )}
    </div>
  );
}
