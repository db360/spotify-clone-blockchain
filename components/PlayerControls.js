import React from 'react';
import {useContext} from 'react';

import { SpotifyContext } from '../context/Context';


import Image from 'next/image';

import next from '../assets/next.svg';
import previous from '../assets/previous.svg';
import speaker from '../assets/speaker.svg';
import repeat from '../assets/repeat.svg';
import shuffle from '../assets/shuffle.svg';
import playRounded from '../assets/playRounded.svg';
import pauseIcon from '../assets/pause.svg';



const styles = {
  albumCoverContainer: `w-20 h-20 mr-3`,
  mainControl: `fixed bottom-0 left-2 py-2 p-5 pr-1 w-screen bg-[#242424] z-40 flex items-center justify-between max-h-30`,
  flexCenter: `flex items-center mr-5`,
  controlIcon: `mr-5 cursor-pointer hover:opacity-100 opacity-50`,
  controlIconContainer: `flex items-center justify-center mb-2`,
  playIcon: `mr-5 w-8 cursor-pointer hover:opacity-50`,
  pauseIconStyle: `mt-3 w-10 h-10 cursor-pointer hover:opacity-50`,
  coverPhoto: `object-cover`,
  albumCover: `mr-4`

}

const PlayerControls = ({ songs }) => {

  const {
    currentSong,
    isPlaying,
    volume,
    onVolumeChange,
    timeStamp,
    progress,
    playNext,
    playPrevious,
    isPaused,
    play,
    pause,
    onProgressChange,
  } = useContext(SpotifyContext);

  //  console.log(isPlaying)

  if(!isPlaying) return null; // cierra el reproductor cuando no hay isPlaying

  return (
    <div className={styles.mainControl}>
      <div className={styles.flexCenter}>
        <div className={styles.albumCover}>
          <Image
            src='https://res.cloudinary.com/da-b-martinez/image/upload/v1656618419/op0tebwkr4nvmbcz7myl.png'
            height={200}
            width={200}
            alt='song cover'
            className='bg-black rounded-full '
          />
        </div>
        <div>
          <p>{currentSong?.title}</p>
          <p className="opacity-50">Artist</p>
        </div>
      </div>
      <div>
        <div className={styles.controlIconContainer}>
          <div className={styles.controlIcon}>
            <Image
              src={shuffle}
              alt="shuffle"
            />
          </div>
          <div onClick={e => playPrevious(songs)} className={styles.controlIcon}>
            <Image
              src={previous}
              alt="prev"
            />
          </div>
          {isPaused
          ? <div className={styles.playIcon} onClick={play}><Image src={playRounded} alt="play"/></div>
          : <div className={styles.pauseIconStyle} onClick={pause}><Image src={pauseIcon} alt="pause"/></div>}

          <div onClick={e => playNext(songs)} className={styles.controlIcon}>
            <Image
              src={next}
              alt="next"
            />
          </div>
          <div className={styles.controlIcon}>
            <Image
              src={repeat}
              alt="repeat"
            />
          </div>
        </div>
        <div className={styles.flexCenter}>
          <small>{timeStamp}</small>
          <input
            value={progress}
            type="range"
            onChange={ e => onProgressChange(e)}
            className={styles.range}
          />
          <small>{currentSong.songLength}</small>
        </div>
      </div>
      <div>
        <div className={styles.flexCenter}>
          <Image
            src={speaker}
            alt="speaker"
          />
          <input
            value={volume}
            onChange = {e => onVolumeChange(e)}
            type="range"
            id="volume-range"
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerControls