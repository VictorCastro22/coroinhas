const Missas: React.FC = () => {
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
            className="icon icon-tabler icon-tabler-church"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#d8b450"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <title>Ícone de Missas</title>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3v5m-2 -2l2 -2l2 2m-2 2v6l-4 4h8l-4 -4" />
            <path d="M4 20h16" />
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
              <a href="/missas/horarios/">Missas</a>
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default Missas;