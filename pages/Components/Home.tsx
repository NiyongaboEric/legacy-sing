import { PlayMusic } from "./PlayMusic";
import { SelectMusic } from "./SelectMusic";
import styles from '../../styles/Home.module.css'

const Home = () => {
  return (
    <main className={styles.main}>
      <SelectMusic />
      <PlayMusic />
    </main>
  )
}

export default Home;
