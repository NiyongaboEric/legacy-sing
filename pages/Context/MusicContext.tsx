import { createContext, useContext } from "react";
import { ImusicContextType } from './types'

export const musicContextDefaultValues: ImusicContextType = {
  playlist: [],
  addPlaylist: () => {},
};

export const MusicContext = createContext<ImusicContextType>(
  musicContextDefaultValues
);
