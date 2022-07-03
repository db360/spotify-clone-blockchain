import { useContext } from 'react';
import Login from '../components/Login';
import { SpotifyContext } from '../context/Context';

export default function Home() {

  const { updateProgress, updateVolume } = useContext(SpotifyContext);

  return (
    <div>
      <audio
        id='audio-element'
        hidden
        playsInline
        onVolumeChange={e => updateVolume(e)}
        onTimeUpdate={e => updateProgress(e)}
      />
      <Login />
      {/* temporarily render homepage before you build Login */}
    </div>
  )
}
