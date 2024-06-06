import { useState } from "react";
import CareerVista from "./CareerVista.png"
import { FaBars,FaX} from "react-icons/fa6";
import {  NavLink, useNavigate } from "react-router-dom";


const NavBar = () => {
    const navigate = useNavigate();
    const onsubmit=()=>{
        navigate("/postajob");
    }
    const navitems=[
        {link:"Home",path:""},
        {link:"Category",path:"Catagories"},
        {link:"Jobs",path:"jobs"},
        {link:"Company",path:"company"},
        {link:"my Job List",path:"joblist"}
    ]
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [data]=useState(navitems)
    const toggleMenu= () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return (
        <>
        <nav className="bg-white shadow-container md:px-14 p-4 max-w-screen-2x1 mx-auto text-primary ">
            <div className="text-lg mx-auto flex  items-center font-medium justify-between">
                <div className="flex space-x-14 items-center">
                    <a href="/" className=" text-2xl font-semibold items-center ">
                        <img src={CareerVista} alt="loading" className='w-28 inline-block items-center  ' />
                    </a>
                    <div className="md:flex space-x-12 hidden ">
                        {
                            data.map(
                                (items,index) =><NavLink key={index} to={`/${items.path}`} className="block hover:font-bold hover:text-primary">{items.link  }</NavLink>
                            )
                        }
                    </div>

                    
                </div>
                <div className="space-x-12 hidden md:flex items-center ">
                    <NavLink to="/login" className=" text-primary  lg:flex  items-center hover:text-primary hover:font-bold"><span>Login</span></NavLink>
                    <button onClick={onsubmit} className="bg-primary text-forgrount py-2 px-4 transition-all duration-300 rounded hover:text-white hover:bg-indigo-800">Post a job</button>
                </div>

                
            </div>

            <div className="hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none focus:text-grey-500">
                        {
                            isMenuOpen ? (<FaX className="w-6 h-6 text-primary"/>):(<FaBars className="w-6 h-6 text-primary"/>)
                        }

                    </button>

                </div>
            
            
        </nav>

        <div className={`space-y-4 px-4  pt-4 pb-5 bg-primary ${isMenuOpen ? "block fixed top-0 right-0 left-0":"hidden"}`}>
             {
                            navitems.map(({link,path}) =>
                            <NavLink key={link} to={`/${path}`} className="block 
                            hover:font-semibold hover:text-primary">{link}</NavLink>)
                        }
        </div>
        </>
    );
};

export default NavBar;