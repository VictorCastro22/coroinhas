import { Link } from "react-router-dom";

interface Noticia {
  id: string;
  titulo: string;
  link: string;
  imagem: string;
  alt: string;
}

interface NoticiasProps {
  noticias: Noticia[];
}

const Noticias: React.FC<NoticiasProps> = ({ noticias }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {noticias.map((noticia) => (
        <div
          key={noticia.id}
          className="elementor-post__card border rounded-lg shadow-lg overflow-hidden bg-white"
        >
          <Link
            to={
              noticia.id === "3"
                ? "/calendario-missas"
                : noticia.id === "4"
                ? "/calendario-confissoes"
                : noticia.id === "5"
                ? "/festejos-sao-jose"
                : noticia.link
            }
            className="elementor-post__thumbnail__link"
          >
            <div className="elementor-post__thumbnail">
              <img
                src={noticia.imagem}
                alt={noticia.alt || "Imagem da notícia"}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
            </div>
          </Link>
          <div className="elementor-post__text p-4">
            <h3 className="elementor-post__title text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors text-center">
              <Link
                to={
                  noticia.id === "3"
                    ? "/calendario-missas"
                    : noticia.id === "4"
                    ? "/calendario-confissoes"
                    : noticia.id === "5"
                    ? "/festejos-sao-jose"
                    : noticia.link
                }
              >
                {noticia.titulo}
              </Link>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Noticias;
