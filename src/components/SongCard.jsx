import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSong,playPause } from '../redux/features/playerSlice';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import PlayPause from './PlayPause';
import { handleLikeSongs } from '../actions';

const SongCard = ({ song, isPlaying, activeSong, data, i,email }) => {
  const dispatch = useDispatch();
 const {song_ids}=useSelector(state=>state.user)
 const handlePauseClick = () => {
  dispatch(playPause(false))
}

const handlePlayClick = () => {
  dispatch(setActiveSong({song,data,i}))
  dispatch(playPause(true))
};

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg ">
      <div className="relative w-full h-56 group cursor-pointer">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
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

      <div className="mt-4 flex gap-1 items-center">
        <div className='flex-1 flex flex-col'>
        <p className="font-semibold text-lg text-white truncate whitespace-break-spaces">
          <Link to={`/songs/${song?.key}`}>
            {song.title}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={song.artistId ? `/artists/${song.artistId}` : '/top-artists'}>
            {song.subtitle}
          </Link>
        </p>
        </div>
        <div className='cursor-pointer' onClick={()=>dispatch(handleLikeSongs({song,email}))}>
          {song_ids.includes(song.title)? <AiFillHeart fill='pink' size={20}/>:<AiOutlineHeart fill='pink' size={20}/>}
        </div>
      </div>
    </div>
  );
};

export default SongCard;