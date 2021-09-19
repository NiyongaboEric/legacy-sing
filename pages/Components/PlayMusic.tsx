import { FC, useContext } from 'react';
import { MusicContext } from '../Context/MusicContext';
import emptyIcon from '../../public/images/music-note.svg';
import styles from '../../styles/Home.module.css'

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
  const { playlist, playPause } = useContext(MusicContext);

  const handlePlayPause = (item) => {
    if (item.isPlaying) {
      item.audioInstance.pause()
    } else {
      item.audioInstance.play()
    }    
    playPause(item.audioId)
  }

  return (
    <section className={styles.dragList}> 
      <p>Playlist</p>
      {
        playlist.map((item) => (
        <div key={item.audioId}>
          <button onClick={() => handlePlayPause(item)}>Play | Pause</button>
        </div>
        ))
      }
   </section>
  )
}

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
