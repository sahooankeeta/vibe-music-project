import defaultImage from "../assets/default-song-image.jpg"
export const createSongCard=({title,subtitle,image,key,audio,artistId})=>{
    return {title,subtitle,image:(image && image?.length>0)?image:defaultImage,key:key?key:"",audio,artistId}
}