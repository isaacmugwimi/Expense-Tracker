import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA } from "../../utils/data";
import "../../css/SideBar.css";

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const [deleteModal, setDeleteModal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (route) => {
    if (route === "/logout") {
      // handleLogout();
      setDeleteModal(true);
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="main-side-bar">
      <div className="profile-pic-menu">
        {user?.profile_image_url ? (
          <img
            src={user?.profile_image_url || ""}
            alt={user?.full_name || "Profile Image"}
            className="profile-img"
          />
        ) : (
          <></>
        )}
        {/* means “render the React component stored in item.icon” */}
        <h5 className="profile-pic-name">Hello {user?.full_name || "Guest"}</h5>
      </div>
      <div className="side-bar-menu">
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            onClick={() => handleClick(item.path)}
            className={`side-menu-buttons ${
              location.pathname === item.path ? "active-menu" : ""
            }`}
          >
            <div className="inside-button-div">
              {" "}
              <item.icon className="item-icon" />{" "}
              {/* means “render the React component stored in item.icon” */}
              {item.label}
            </div>
          </button>
        ))}
      </div>

      {/* // add a modal for log out */}
      {deleteModal ? (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Are you sure {user?.full_name || ""} you want to logout?</h4>
            <div className="delete-btns">
              <button onClick={() => handleLogout()} className="logout">
                Logout
              </button>
              <button className="cancel" onClick={() => setDeleteModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SideMenu;
