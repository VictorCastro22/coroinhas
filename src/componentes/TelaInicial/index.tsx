import Destaque from "../Destaque";
import Missas from "../Missas";
import Noticias from "../Noticias";

const TelaInicial: React.FC = () => {
  const noticiasMissas = [
    {
      id: "3",
      titulo: "Calendário de Fevereiro",
      link: "/noticias/3",
      imagem: "/pnsp.jpeg",
      alt: "Calendário de Missas de Fevereiro",
    },
  ];

  const noticiasDestaque = [
    {
      id: "2",
      titulo: "As Indulgências no Ano Jubilar 2025",
      link: "/noticias/2",
      imagem: "/jubilar.png",
      alt: "Ano Jubilar",
    },
    {
      id: "1",
      titulo:
        "Paróquia de Maranguape recebe novo vigário, Pe. Rafael Nascimento Rocha",
      link: "/noticias/1",
      imagem: "/noticia1.jpeg",
      alt: "Novo Vigário de Maranguape",
    },
  ];

  return (
    <div>
      <Missas />
      <section className="p-6">
      <Noticias noticias={noticiasMissas} />
      </section>

      <Destaque />
      <section className="p-6">
        <Noticias noticias={noticiasDestaque} />
      </section>
    </div>
  );
};

export default TelaInicial;