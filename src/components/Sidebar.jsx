import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import {AiFillHeart} from "react-icons/ai"
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { signOut } from 'firebase/auth';
import {auth} from "../firebase"
import { setUser } from '../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { logo } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: HiOutlineHome },
  { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
  { name: 'Liked songs', to: '/liked', icon: AiFillHeart}
];

const NavLinks = ({ handleClick }) => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleLogout = async()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
          dispatch(setUser(null))
      }).catch((error) => {
       console.log(error)
      });
  }
  return (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
    <button onClick={handleLogout} className='mt-6 bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white w-full'>logout</button>
  </div>
)};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>

      {/* Mobile sidebar */}
      <div className="absolute md:hidden block top-6 right-3">
        {!mobileMenuOpen ? (
          <HiOutlineMenu className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(true)} />
        ) : (
          <RiCloseLine className="w-6 h-6 mr-2 text-white" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>

      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  );
};

export default Sidebar;