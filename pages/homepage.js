import {useEffect, useState} from 'react';

import Nav from '../components/nav';
import Activity from '../components/activity';
import Header from '../components/Header';


const HomePage = () => {

  const [ showUploadMusic, setShowUploadMusic ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ musicUrl, setMusicUrl ] = useState('');
  const [ songs, setSongs ] = useState([]);

  console.log(showUploadMusic)

  return (
    <div className='flex'>
      <Nav />

      <div className='w-full'>
        <Header setShowUploadMusic={setShowUploadMusic}/>
        {/* <Playlist /> */}
        {/* <PlayerControls /> */}
      </div>
      <Activity />
    </div>
  )
}

export default HomePage
