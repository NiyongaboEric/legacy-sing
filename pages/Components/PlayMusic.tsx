import { useContext } from 'react';
import styles from '../../styles/Home.module.css'
import { MusicContext } from '../Context/MusicContext';

export const PlayMusic = () => {
  const { playlist } = useContext(MusicContext);
  console.log('PlayMusic playlist', playlist);
  
  return (
    <section className={styles.dragList} >
      <p>Available songs ({[].length})</p>
    </section>
  )
}
