import React from 'react';
import {Loader,Error,SongCard,Empty} from "../components"
import { useDispatch, useSelector } from "react-redux";
import { useGetTopLocalChartsQuery } from '../redux/services/shazamCore';
import {genres} from "../assets/constants"
import { createSongCard } from '../utils/helper';
const CountryTracks = () => {
    const dispatch=useDispatch()
    const {data,isFetching,error}=useGetTopLocalChartsQuery('IN','POP')
    const {isPlaying,activeSong,genreListId}=useSelector(state=>state.player)
    const {user}=useSelector(state=>state.user)
    const genreTitle=genres.find(({value})=>value===genreListId)?.title
    const tracks=data?.map(item=>createSongCard({title:item.title,subtitle:item.subtitle,key:item.key,audio:item.ringtone,image:item.photo_url,artistId:item.artist_id}))
    if(isFetching)
    return <Loader/>
   if(error)
    return <Error/>
    if(!tracks || tracks?.length == 0)
    return <Empty/>
   return (
       <>
       <div className="flex flex-col">
           <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
               <h2 className="font-bold text-3xl text-white text-left">
                  Whats happening around you :)
               </h2>
           </div>
           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
             {tracks?.map((song,i)=>
             <SongCard
             key={song.key}
             song={song}
             data={tracks}
             activeSong={activeSong}
             isPlaying={isPlaying}
             i={i}
             email={user.email}
             />)}
           </div>
       </div>
      
   </>)
};

export default CountryTracks;
