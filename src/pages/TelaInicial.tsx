import React from "react";
import Destaque from "../components/Destaque";
import Missas from "../features/missas/Missas";
import ProximaConfissao from "../features/confissoes/ProximaConfissao";
import Noticias from "../features/noticias/Noticias";

const TelaInicial: React.FC = () => {

  const noticiasMissas = [
    {
      id: "3",
      titulo: "Calendário de Missas de Janeiro",
      link: "/noticias/3",
      imagem: "/missa.png",
      alt: "Calendário de Missas de Janeiro",
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
      titulo: "Paróquia de Maranguape recebe novo vigário, Pe. Rafael Nascimento Rocha",
      link: "/noticias/1",
      imagem: "/noticia1.jpeg",
      alt: "Novo Vigário de Maranguape",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* SEÇÃO DE CONFISSÕES*/}
      <section className="pt-8 bg-gradient-to-b from-gray-100 to-gray-50">
        <ProximaConfissao />
      </section>

      <hr className="border-gray-200" />

      {/* SEÇÃO DE MISSAS */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-playfair font-bold text-[#535043] mb-4 ml-2">Escala de Missas</h2>
          <Missas />
          <div className="mt-6">
            <Noticias noticias={noticiasMissas} />
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DESTAQUES E NOTÍCIAS GERAIS */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-playfair font-bold text-[#535043] mb-6 ml-2">Destaques e Notícias</h2>
          <Destaque />
          <div className="mt-8">
            <Noticias noticias={noticiasDestaque} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TelaInicial;