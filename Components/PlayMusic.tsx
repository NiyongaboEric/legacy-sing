/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import moment from 'moment';
import { FC, useContext } from 'react';
import { MusicContext } from '../Context/MusicContext';
import emptyIcon from '../public/images/music-note.svg';
import playIcon from '../public/images/play_icon.svg';
import pauseIcon from '../public/images/pause_icon.svg';
import styles from '../styles/Home.module.css'

interface ItemType {
  audioFile: File;
  audioId: any;
  audioInstance: {
    pause: Function,
    play: Function
  };
  isPlaying: Boolean;
}

const EmptyPlaylist: FC = () => {
  return (
    <div className={styles.emptyList}>
      <img src={emptyIcon.src} alt="Empty music" />
      <p>No Playlist available</p>
      <div style={{display: "none"}}>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  )
}

const AllPlaylist: FC = () => {
  const { playlist, playPause, changePlayPauseIcon } = useContext(MusicContext);
  const fileSize = (sizeInBytes:number) => (sizeInBytes / (1024*1024)).toFixed(2);
  const fileTimeStamp = (lastModified: string) => (moment(lastModified).fromNow(true));
  console.log(playlist);
  

  const handlePlayPause = (item: ItemType) => {
    if (item.isPlaying) {
      item.audioInstance.pause();
      changePlayPauseIcon(item.audioId, playIcon);
    } else {
      item.audioInstance.play();
      changePlayPauseIcon(item.audioId, pauseIcon);
    }
    playPause(item.audioId)
  }
  
  return (
    <>
      <p className={styles.playlistTitle}>My Playlist</p>
      <div className={styles.category}>
        <section className={styles.dragList}> 
          {
            playlist.map((item: any) => (
              <div className={styles.playlist} key={item.audioId} style={{ border: `1px solid #${item.randomColor}` }}>
                <div className={styles.songColor} style={{ backgroundColor: `#${item.randomColor}` }}>
                  <span>{item.audioFile.name[0].toUpperCase()}</span>
                </div>
                <div className={styles.songDetails}>
                  <span>{item.audioFile.name}</span>
                  <span>{fileTimeStamp(item.audioFile.lastModified)} Ago</span>
                  <span>{fileSize(item.audioFile.size)} MB</span>
                </div>
                <div className={styles.playPause}>
                  <button onClick={() => handlePlayPause(item)}>
                    <Image
                      src={item.playPauseIcon}
                      alt="Play pause icon"
                      width="20px"
                      height="20px"
                    />
                  </button>
                </div>
              </div>
              )
            )
          }
      </section>
      </div>
    </>
  );
};

export const PlayMusic: FC = () => {
  const { playlist } = useContext(MusicContext);
  return (
    <>      
      {
        playlist.length === 0 ? <EmptyPlaylist /> : <AllPlaylist />
      }
    </>
  )
}
