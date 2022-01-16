export interface ImusicContextType {
  playlist: object[],
  addPlaylist: (newSong: object) => void,
  playPause: (audioId: string) => void,
  changePlayPauseIcon: (audioId: string, icon: string) => void,
};
