import { useState } from "react";
import CareerVista from "./CareerVista.png";
import { FaBars,FaUser} from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { FaTimes } from "react-icons/fa";

const NavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userId, userType, logout } = useAuth();
  console.log(userType);

  const onsubmit = () => {
    if (userId) {
      navigate("/postajob");
    } else {
      navigate("/login");
    }
  };
  const onupdateprofile=()=>{
    if(userType ==="1"){
      navigate("/jobseeker",{state: userId});
    }else{
      navigate("/companyProfile",{state: userId});
    }
  }


  const navitems = [
    { link: "Home", path: "" },
    { link: "Category", path: "Catagories" },
    { link: "Jobs", path: "jobs" },
    { link: "Company", path: "company" },
    { link: "my Job List", path: "userjoblist" },
  ];

  // const [data] = useState(navitems);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };
  return (
    <nav className="bg-white shadow-container md:px-14 p-4 max-w-screen-2x1 mx-auto text-primary">
      <div className="text-lg mx-auto flex items-center justify-between">
        <a href="/" className="text-2xl font-semibold items-center">
          <img
            src={CareerVista}
            alt="CareerVista"
            className="w-28 inline-block"
          />
        </a>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-primary lg:flex items-center hover:text-primary hover:font-bold"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
        <div className="hidden md:flex space-x-12 items-center flex-grow justify-center">
          {navitems.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.path}`}
              className="block hover:font-bold hover:text-primary"
            >
              {item.link}
            </NavLink>
          ))}
        </div>
        <div className="hidden md:flex space-x-12 items-center">
          {userId ? (
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="text-primary lg:flex items-center hover:text-primary hover:font-bold"
              >
                {isMenuOpen ? (
                  <FaTimes className="w-6 h-6" />
                ) : (
                  <FaUser className="w-6 h-6" />
                )}
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg z-40 w-48 h-30">
                  <button
                    onClick={onupdateprofile}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-primary lg:flex items-center hover:text-primary hover:font-bold"
            >
              Login
            </NavLink>
          )}
          {(!userId || (userId && userType === "2")) && (
            <button
              onClick={onsubmit}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-indigo-800"
            >
              Post a Job
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
