import { createContext } from "react";
import { ImusicContextType } from './types'

export const musicContextDefaultValues: ImusicContextType = {
  playlist: [],
  addPlaylist: () => {},
  playPause: () => {},
};

export const MusicContext = createContext<ImusicContextType>(
  musicContextDefaultValues
);
