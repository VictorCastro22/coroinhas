import Destaque from "../Destaque";
import Noticias from "../Noticias"; 

const TelaInicial: React.FC = () => {
  const noticias = [
    {
      id: "1",
      titulo: "Paróquia de Maranguape recebe novo vigário, Pe. Rafael Nascimento Rocha",
      link: "/noticias/1",
      imagem: "/noticia1.jpeg",
      alt: "Novo Vigário de Maranguape",
    },
  ];

  return (
    <div>
      <Destaque />
      <section className="p-6">
        <Noticias noticias={noticias} />
      </section>
    </div>
  );
};

export default TelaInicial;