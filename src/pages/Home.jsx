import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar,Searchbar,MusicPlayer } from '../components'
import { useSelector } from 'react-redux'
const Home = () => {
  const { activeSong } = useSelector((state) => state.player);
  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Outlet/>
          </div>
          </div>
      </div>
          {(activeSong?.title || activeSong?.name) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
          </div>
  )
}

export default Home