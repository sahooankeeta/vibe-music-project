import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import { setLikeSongs } from '../redux/features/SongsLikedSlice';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import PlayPause from './PlayPause';

const SongBar = ({ song, i,data,isPlaying, activeSong,}) => {
  const dispatch=useDispatch()
  const {song_ids}=useSelector(state=>state.songs_liked)
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  
  const handlePlayClick = () => {
    dispatch(setActiveSong({song,data,i}))
    dispatch(playPause(true))
  };
  return (
    <div className={`w-full flex flex-row gap-1 items-center hover:bg-[#4c426e] ${activeSong?.title === song?.title ? 'bg-[#4c426e]' : 'bg-transparent'} py-2 p-4 rounded-lg cursor-pointer mb-2`}>
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.image}
          alt={song?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
            <Link to={`/songs/${song.key}`}>
              <p className="text-xl font-bold text-white">
                {song?.title}
              </p>
            </Link>
          <p className="text-base text-gray-300 mt-1">
            {song?.subtitle}
          </p>
        </div>
      </div>
      
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={() => handlePlayClick({song:song,data, i})}
         />
         <div className='cursor-pointer' onClick={()=>dispatch(setLikeSongs(song))}>
          {song_ids.includes(song.title)? <AiFillHeart fill='pink' size={20}/>:<AiOutlineHeart fill='pink' size={20}/>}
        </div>
    </div>
  );
}

export default SongBar;