import { PlayMusic } from "./PlayMusic";
import { SelectMusic } from "./SelectMusic";
import styles from '../styles/Home.module.css';
import Heading from './Heading';

const Home = () => {
  return (
    <main className={styles.main}>
      <Heading />
      <SelectMusic />
      <PlayMusic />
    </main>
  )
}

export default Home;
