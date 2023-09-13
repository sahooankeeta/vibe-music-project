import React from 'react';
import {Loader,Error,SongCard,ArtistCard} from "../components"
import { useDispatch, useSelector } from "react-redux";
import { useGetTopLocalChartsQuery } from '../redux/services/shazamCore';
import {genres} from "../assets/constants"
const CountryTracks = () => {
    const dispatch=useDispatch()
    const {data,isFetching,error}=useGetTopLocalChartsQuery('IN','POP')
    const {isPlaying,activeSong,genreListId}=useSelector(state=>state.player)
    const genreTitle=genres.find(({value})=>value===genreListId)?.title
    if(isFetching)
    return <Loader/>
   if(error)
    return <Error/>
   return (
       <>
       <div className="flex flex-col">
           <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
               <h2 className="font-bold text-3xl text-white text-left">
                  Whats happening around you :)
               </h2>
               <select 
               onChange={(e)=>{dispatch(selectGenreListId(e.target.value))}}
               className="bg-black text-gray-300 p-3 text-sm rouded-lg outline-none sm:mt-0 mt-5">
                   {genres.map(genre=><option value={genre.value} key={genre.value}>{genre.title}</option>)}
               </select>
           </div>
           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
             {data?.tracks?.map((song,i)=>
             <SongCard
             key={song.key}
             song={song}
             data={data}
             activeSong={activeSong}
             isPlaying={isPlaying}
             i={i}
             />)}
           </div>
       </div>
       <div className="flex flex-col">
       <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
           <h2 className="font-bold text-3xl text-white text-left">
              Artists
           </h2>
       </div>
       <div className="flex flex-wrap sm:justify-start justify-center gap-8">
         {data?.tracks?.map((song,i)=>
         <ArtistCard
         key={`ss-${song.key}`}
         track={song}
         />)}
       </div>
   </div>
   </>)
};

export default CountryTracks;
