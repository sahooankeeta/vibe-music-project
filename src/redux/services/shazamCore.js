import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const shazamCoreApi=createApi({
    reducerPath:'shazamCoreApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://shazam-core7.p.rapidapi.com/',
        prepareHeaders:(headers)=>{
            headers.set('x-rapidapi-host',import.meta.env.VITE_SHAZAM_HOST)
            headers.set('x-rapidapi-key',import.meta.env.VITE_SHAZAM_KEY)
            return headers
        }
    }),
    endpoints:(builder)=>({
        getTopCharts: builder.query({ query:(genre='POP')=>`/charts/get-top-songs-in_world_by_genre?genre=${genre}`}),
        getTopLocalCharts: builder.query({ query:(code='IN',genre='POP')=>`/charts/get-top-songs-in-country?country_code=${code}&limit=20`}),
        getArtistDetails: builder.query({ query:(id)=>`/artist/get-details?id=${id}`}),
        getArtistTopTracks: builder.query({ query:(id)=>`/artist/get-top-songs?id=${id}`}),
        getSongsBySearch: builder.query({ query:(query)=>`/search?term=${query}`})
    })
})
export const {
    useGetTopChartsQuery,
    useGetTopLocalChartsQuery,
    useGetArtistDetailsQuery,
    useGetArtistTopTracksQuery,
    useGetSongsBySearchQuery
}=shazamCoreApi