import React from 'react';

interface YoutubeProps {
  url: string;
}

const YoutubeVideo: React.FC<YoutubeProps> = ({ url }) => {
  // Extrai o ID do vídeo do URL do YouTube
  const videoId = url.split('v=')[1];

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubeVideo;
