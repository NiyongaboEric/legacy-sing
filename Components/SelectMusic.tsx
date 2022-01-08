import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import DJImage from '../public/images/10_dj.png'
import uploadImageIcon from '../public/images/download.svg'
import { MusicContext } from '../Context/MusicContext'
import { toBase64 } from '../utils/convert'
import styles from '../styles/Home.module.css'

export const SelectMusic = () => {
  const [defaultColor, setDefaultColor] = useState<Object>({opacity: 1, border: "none"});
  const { playlist, addPlaylist } = useContext(MusicContext)
  
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
          audioInstance: new Audio(base64Format)
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
          // const base64Format = await toBase64(dragedItems[i].getAsFile())
          toBase64(dragedItems[i].getAsFile())
            .then((res: any) => {
              addPlaylist({
                audioId: uuidv4(),
                audioFile: dragedItems[i] ? dragedItems[i].getAsFile() : dragedFiles[i],
                isPlaying: false,
                audioInstance: new Audio(res)
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
          <h1>The Legacy playlist</h1>
          <p>Listen To The Music</p>
        </div>
        <form className={styles.musicForm}>
          <label htmlFor="fileElem">
            Select Song
            <img src={uploadImageIcon.src} className={styles.uploadIcon} alt="upload image" />
            <div style={{display: "none"}}> Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </label>
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
      <img className={styles.entertainImage} src={DJImage.src} alt="New DJ" />
  </section>
  )
}
