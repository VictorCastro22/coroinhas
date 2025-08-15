import Destaque from "../components/Destaque";
import Missas from "../features/missas/Missas";
import Confissoes from "../features/confissoes/Confissoes";
import Noticias from "../features/noticias/Noticias";

const TelaInicial: React.FC = () => {
  const noticiasConfissoes = [
    {
      id: "4",
      titulo: "Calendário de Confissões de Agosto",
      link: "/noticias/4",
      imagem: "/confissao.png",
      alt: "Calendário de Confissões de Agosto",
    },
  ];

  const noticiasMissas = [
    {
      id: "3",
      titulo: "Calendário de Missas de Agosto",
      link: "/noticias/3",
      imagem: "/missa.png",
      alt: "Calendário de Missas de Agosto",
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
      <Confissoes />
      <section className="p-6">
        <Noticias noticias={noticiasConfissoes} />
      </section>

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
