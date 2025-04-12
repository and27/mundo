"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import "../styles/customAudioStyles.css";

interface Props {
  src: string;
}

const CustomAudioPlayer = ({ src }: Props) => {
  return (
    <div className="my-6 px-4">
      <AudioPlayer
        src={src}
        autoPlay
        showJumpControls={false}
        layout="horizontal"
        customAdditionalControls={[]}
        customVolumeControls={[]}
        className="custom-audio-player"
      />
    </div>
  );
};

export default CustomAudioPlayer;
