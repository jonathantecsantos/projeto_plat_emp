import React, { useState } from 'react';

interface AddYoutubeVideoProps {
  onAdd: (url: string) => void;
}

const AddYoutubeVideo: React.FC<AddYoutubeVideoProps> = ({ onAdd }) => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.target.value);
  };

  const handleAdd = () => {
    onAdd(videoUrl);
    setVideoUrl('');
  };

  return (
    <div>
      <input type="text" value={videoUrl} onChange={handleChange} placeholder="Enter YouTube video URL" />
      <button onClick={handleAdd}>Add Video</button>
    </div>
  );
};

export default AddYoutubeVideo;
