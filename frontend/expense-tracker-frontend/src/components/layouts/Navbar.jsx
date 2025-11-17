import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";
import "../../css/NavBar.css";

const Navbar = ({  openSideMenu, setOpenSideMenu }) => {
  return (
    <div className="navbar">
      <div className="nav-bar-main">
        <button
          className="toggleSideMenu"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="nav-icons" size={25} color="#7d52f4d8" />
          ) : (
            <HiOutlineMenu className="nav-icons" size={25} color="#7C52F4" />
          )}
        </button>
        <h2 className="nav-title">Expense Tracker</h2>
      </div>
      
    </div>
  );
};

export default Navbar;
