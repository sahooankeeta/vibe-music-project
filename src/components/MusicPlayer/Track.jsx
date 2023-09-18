import React from 'react';
import {AiOutlineHeart,AiFillHeart} from "react-icons/ai"
import { useDispatch } from 'react-redux';
import { handleLikeSongs } from '../../actions';
const Track = ({ isPlaying, isActive, activeSong,user,song_ids }) => {
  const dispatch=useDispatch()
  return (
    <div className="flex items-center justify-start gap-2">
      <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} h-16 w-16`}>
        <img src={activeSong?.image} alt="cover art" className="rounded-full h-full w-full" />
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="truncate text-white font-bold text-lg">
          {activeSong?.title ? activeSong?.title : 'No active Song'}
        </div>
        <div className="truncate  text-gray-300">
          {activeSong?.subtitle ? activeSong?.subtitle : 'No active Song'}
        </div>
      </div>
      <div className='cursor-pointer order-0 md:-order-1' onClick={()=>dispatch(handleLikeSongs({song:activeSong,email:user.email}))}>
            {song_ids?.includes(activeSong.title)? <AiFillHeart fill='pink' size={20}/>:<AiOutlineHeart fill='pink' size={20}/>}
      </div>
    </div>
  );
}

export default Track;
