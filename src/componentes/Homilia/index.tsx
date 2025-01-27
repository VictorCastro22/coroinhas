import VideoCard from "../VideoCard"; // Certifique-se de ajustar o caminho de importação

const Homilia: React.FC = () => {
  return (
    <div
      className="e-con-inner flex flex-col gap-6"
      style={{
        marginTop: "40px",
        marginLeft: "40px",
      }}
    >
      {/* Cabeçalho com ícone e título */}
      <div className="flex items-center gap-4">
        <div
          className="elementor-element elementor-view-framed elementor-shape-circle elementor-widget elementor-widget-icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            border: "2px solid #d8b450",
            backgroundColor: "transparent",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-book-2"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#d8b450"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Ícone de Bíblia</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2" />
            <path d="M18 6a2 2 0 0 1 2 2v12" />
            <path d="M12 8v10" />
            <path d="M9 10h6" />
          </svg>
        </div>

        <div
          className="elementor-element elementor-widget elementor-widget-heading"
          data-id="7b91e243"
          data-element_type="widget"
          data-widget_type="heading.default"
        >
          <div className="elementor-widget-container">
            <h2
              className="elementor-heading-title elementor-size-default"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "30px",
                color: "#535043",
                fontWeight: 600,
              }}
            >
              Homilia Diária
            </h2>
          </div>
        </div>
      </div>

      {/* Card do vídeo */}
      <VideoCard 
        videoUrl="https://www.youtube.com/embed/1fZuGMmGfUU" 
        title="Homilia Diária" 
      />
    </div>
  );
};

export default Homilia;