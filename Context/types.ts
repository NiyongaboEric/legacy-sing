export interface ImusicContextType {
  playlist: object[],
  addPlaylist: (newSong: object) => void,
  playPause: (audioId: string) => void,
};
