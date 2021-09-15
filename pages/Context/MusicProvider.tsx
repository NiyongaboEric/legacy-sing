import { FC, ReactNode, useState } from "react";
import { MusicContext, musicContextDefaultValues } from './MusicContext';
import { ImusicContextType } from './types';



export const MusicProvider: FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<object[]>(musicContextDefaultValues.playlist)
  const addPlaylist = (newSong: object) => {
    return setPlaylist((playlist) => [...playlist, newSong]);
  }
  
  const value: ImusicContextType = {
    playlist,
    addPlaylist
  } 
  
  return (
    <>
      <MusicContext.Provider value={value}>
        {children}
      </MusicContext.Provider>
    </>
  )
}
