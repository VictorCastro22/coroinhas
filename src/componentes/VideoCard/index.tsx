interface VideoCardProps {
    videoUrl: string;
    title: string;
  }
  
  const VideoCard: React.FC<VideoCardProps> = ({ videoUrl, title }) => {
    return (
      <div className="grid place-items-center"> {/* Centraliza o conteúdo */}
        <div className="elementor-post__card border rounded-lg shadow-lg overflow-hidden bg-white w-full max-w-[364px] aspect-[16/9]"> {/* Responsivo e com aspecto de vídeo */}
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
            }}
          />
        </div>
      </div>
    );
  };
  
  export default VideoCard;
  