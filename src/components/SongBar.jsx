import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { handleLikeSongs } from '../actions';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import PlayPause from './PlayPause';

const SongBar = ({ song, i,data,isPlaying, activeSong,email}) => {
  const dispatch=useDispatch()
  const {song_ids=[]}=useSelector(state=>state.user)
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  
  const handlePlayClick = () => {
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true))
  };
  return (
    <div className={`w-full grid grid-cols-[min-content_1fr_min-content] items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex flex-row justify-between items-center overflow-hidden">
      <div className="relative h-20 w-20 group cursor-pointer rounded-lg">
        <div className={`absolute inset-0 justify-center items-center rounded-lg bg-black bg-opacity-50 group-hover:flex ${activeSong?.key === song.key ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img alt="song_img" src={song.image} className="w-full h-full rounded-lg" />
      </div>
        <div className="flex-1 flex flex-col justify-center mx-3 overflow-hidden">
           
              <div className="text-xl font-bold text-white truncate ">
                {song?.title}
              </div>
          <div className="text-base text-gray-300 mt-1 truncate ">
            {song?.subtitle}
          </div>
        </div>
      </div>
      
         <div className='cursor-pointer' onClick={()=>dispatch(handleLikeSongs({song,email}))}>
          {song_ids?.includes(song.title)? <AiFillHeart fill='pink' size={20}/>:<AiOutlineHeart fill='pink' size={20}/>}
        </div>
    </div>
  );
}

export default SongBar;