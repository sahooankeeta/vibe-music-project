import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import {AiFillHeart} from "react-icons/ai"
import { HiOutlineHashtag, HiOutlineHome, HiOutlineMenu, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';
import { RiCloseLine } from 'react-icons/ri';
import { handleLogout } from '../actions';
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
    <button onClick={()=>dispatch(handleLogout())} className='mt-6 bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white w-full'>logout</button>
  </div>
)};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <span className='purple_gradient text-6xl font-bold text-center'>Vibe</span>
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

      <div className={`absolute top-0 h-screen w-2/3 bg-black z-20 p-6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
      <span className='purple_gradient text-3xl font-bold text-center'>Vibe</span>
        <NavLinks handleClick={() => setMobileMenuOpen(false)}/>
      </div>
    </>
  );
};

export default Sidebar;