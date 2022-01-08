import { FC, useState } from "react";
import { MusicContext, musicContextDefaultValues } from './MusicContext';
import { ImusicContextType } from './types';



export const MusicProvider: FC = ({ children }) => {
  const [playlist, setPlaylist]: any = useState<object[]>(musicContextDefaultValues.playlist)

  const addPlaylist = (newSong: object) => {
    return setPlaylist((playlist: any) => [...playlist, newSong]);
  }

  const playPause = (currentAudioId: string) => {
    const AudioIndex = playlist.findIndex(
      ((item: any) => item.audioId === currentAudioId)
    )
    return playlist[AudioIndex].isPlaying = !playlist[AudioIndex].isPlaying
  }

  const value: ImusicContextType = {
    playlist,
    addPlaylist,
    playPause
  } 
  
  return (
    <>
      <MusicContext.Provider value={value}>
        {children}
      </MusicContext.Provider>
    </>
  )
}
