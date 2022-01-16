import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { MusicContext } from '../Context/MusicContext'
import { toBase64 } from '../utils/convert'
import man_With_heaphones_img from '../public/images/man_in_heaphones.png';
import playIcon from '../public/images/play_icon.svg';
import styles from '../styles/Home.module.css'

export const SelectMusic = () => {
  const [defaultColor, setDefaultColor] = useState<Object>({opacity: 1, border: "none"});
  const { addPlaylist } = useContext(MusicContext);
  
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files || [] ;
    for (var i = 0; i < selectedFile.length; i ++ ) {
      const type: string = selectedFile[i].type
      if (type === "audio/mpeg") {
        const base64Format: any = await toBase64(selectedFile[i])
        addPlaylist({
          audioId: uuidv4(),
          audioFile: selectedFile[i],
          isPlaying: false,
          audioInstance: new Audio(base64Format),
          playPauseIcon: playIcon,
          randomColor: Math.random().toString(16).substring(3, 9),
        })
      }
      else {
        return alert("File not supported")
      }
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDefaultColor({opacity: 1, border: "none"})
    const dragedItems: any = e.dataTransfer.items
    const dragedFiles = e.dataTransfer.files
  
    if (dragedItems) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < dragedItems.length; i++) {
        // If dropped items aren't files, reject them
        const kind = dragedItems[i].kind
        const type = dragedItems[i].type
        if (type === "audio/mpeg") {
          toBase64(dragedItems[i].getAsFile())
            .then((res: any) => {
              addPlaylist({
                audioId: uuidv4(),
                audioFile: dragedItems[i] ? dragedItems[i].getAsFile() : dragedFiles[i],
                isPlaying: false,
                audioInstance: new Audio(res),
                playPauseIcon: playIcon,
                randomColor: Math.random().toString(16).substring(3, 9),
              })
            })
        } else {
          return alert("File not supported")
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < dragedFiles.length; i ++ ) {
        const type: string = dragedFiles[i].type
        if (type === "audio/mpeg") {
          console.log(2, i);
          const base64Format: any = await toBase64(dragedFiles[i])
          addPlaylist({
            audioId: uuidv4(),
            audioFile: dragedFiles[i],
            isPlaying: false,
            audioInstance: new Audio(base64Format)
          })
        } else {
          return alert("File not supported")
        }
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDefaultColor({opacity: 0.7, border: "1px dotted yellow"})
  }

  return (
    <section className={styles.heading}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={defaultColor}
    >
      <div className={styles.details}>
        <div className={styles.title}>
          <h1>Upload &amp; Share</h1>
        </div>
        <form className={styles.musicForm}>
          <label htmlFor="fileElem">Upload now</label>
          <span>or drop a file</span>
          <input
            type="file"
            id="fileElem"
            multiple
            accept="audio/mp3"
            onChange={handleChange}
          />
        </form>
      </div>
      <div className={styles.entertainImage}>
        <Image
          src={man_With_heaphones_img.src}
          alt="New DJ"
          width={250}
          height={250}
          />
      </div>
  </section>
  );
};
