import { createContext } from "react";
import { ImusicContextType } from './types'

export const musicContextDefaultValues: ImusicContextType = {
  playlist: [],
  addPlaylist: () => {},
  playPause: () => {},
  changePlayPauseIcon: () => {},
};

export const MusicContext = createContext<ImusicContextType>(
  musicContextDefaultValues
);
