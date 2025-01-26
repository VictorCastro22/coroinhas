import { useParams } from "react-router-dom";


const NoticiaDetalhe: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const noticias = [
    {
      id: "1",
      titulo: "Paróquia de Maranguape recebe novo vigário, Pe. Rafael Nascimento Rocha",
      conteudo: "Descrição detalhada da notícia 1.",
      imagem: "/noticia1.jpeg",
      alt: "Novo Vigário de Maranguape",
    },
  ];

  const noticia = noticias.find((noticia) => noticia.id === id);

  if (!noticia) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-bold text-red-500">Notícia não encontrada</h1>
        <p className="text-gray-600">A notícia solicitada não existe ou foi removida.</p>
      </div>
    );
  }

  return (
    <div>
      
      <section className="flex items-center justify-center bg-cover bg-center relative w-full h-[221px]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/capa.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="relative z-10 flex flex-col items-center text-white w-full sm:w-[400px]">
          <img
            src="/logo.png"
            alt="Logo da Paróquia"
            className="w-36 h-36 object-contain mb-2"
          />
          <h2 className="text-center font-playfair text-[1.0rem] font-medium uppercase leading-[1.2em] text-shadow-lg text-[#F1DA93]">
            Coroinhas de
          </h2>
          <h1 className="text-center font-playfair text-[1.4rem] font-bold uppercase leading-[1.0em] text-shadow-lg text-[#F1DA93]">
            Maranguape
          </h1>
        </div>
      </section>

      <div className="p-6">
        
        {id === "1" && (
          <div>
            <h1
              style={{ color: "#063265", fontSize: "35.2px" }}
              className="font-bold text-center mb-4"
            >
              {noticia.titulo}
            </h1>
            <p
              style={{ color: "#1D1D1D", fontSize: "19px" }}
              className="mb-6"
            >
              A Paróquia Nossa Senhora da Penha, no Centro de Maranguape, acolherá o Pe. Rafael Nascimento Rocha como novo vigário paroquial. Ordenado presbítero em 22 de dezembro de 2023, o sacerdote tem como lema de vida "Miserando atque eligendo" – <strong>"O olhou com misericórdia e o elegeu" (Mt 9,9)</strong>.
            </p>
            <img
              src={noticia.imagem}
              alt={noticia.alt}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p
              style={{ color: "#1D1D1D", fontSize: "19px" }}
              className="mb-6"
            >
              Natural da Paróquia São José, na Lagoa Redonda, Pe. Rafael trilhou sua formação pastoral em diversas comunidades da Arquidiocese de Fortaleza e dedicou-se ao serviço ao próximo como Ministro Extraordinário da Sagrada Comunhão.
            </p>
            <p
              style={{ color: "#1D1D1D", fontSize: "19px" }}
              className="mb-6"
            >
              A missa de apresentação do novo vigário será celebrada no dia <strong>09 de fevereiro de 2025</strong>, na Igreja Matriz da Paróquia Nossa Senhora da Penha. A comunidade está convidada a participar deste momento especial de acolhida e bênçãos.
            </p>
          </div>
        )}

        
        {id !== "1" && (
          <div>
            <img
              src={noticia.imagem}
              alt={noticia.alt}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-4">{noticia.titulo}</h1>
            <p className="text-gray-800">{noticia.conteudo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticiaDetalhe;