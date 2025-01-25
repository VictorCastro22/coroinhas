const Destaque: React.FC = () => {
    return (
      <div
        className="e-con-inner flex items-center gap-4"
        style={{
          marginTop: "40px",
          marginLeft: "40px",
        }}
      >

        <div
          className="elementor-element elementor-view-framed elementor-shape-circle elementor-widget elementor-widget-icon"
          data-id="3aa82029"
          data-element_type="widget"
          data-widget_type="icon.default"
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
            className="icon icon-tabler icon-tabler-news"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#d8b450"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Ícone de Notícias</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
            <line x1="8" y1="8" x2="12" y2="8" />
            <line x1="8" y1="12" x2="12" y2="12" />
            <line x1="8" y1="16" x2="12" y2="16" />
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
              <a href="/noticias/destaques/">Destaque</a>
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default Destaque;
  