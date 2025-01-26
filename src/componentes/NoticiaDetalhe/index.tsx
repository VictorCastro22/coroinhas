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