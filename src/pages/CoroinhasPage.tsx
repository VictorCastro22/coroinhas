import { Link } from "react-router-dom";
import { useState } from "react";

const galeria = [
  "/servico1.jpg",
  "/servico2.jpg",
  "/servico3.jpg",
];

const CoroinhasPage = () => {
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#063265] mb-4">Pastoral dos Coroinhas</h1>
        <img
          src="/investidura-2024.jpg"
          alt="Coroinhas da Paróquia"
          className="rounded-xl shadow-md mx-auto max-h-[400px] object-cover"
        />
      </div>

      <section className="mb-8 text-justify">
        <h2 className="text-xl font-semibold mb-2 text-[#535043]">O que é ser coroinha?</h2>
        <p className="text-gray-700 leading-relaxed">
          Ser coroinha é mais do que ajudar nas celebrações: é uma missão de amor e entrega ao serviço do altar. 
          É se colocar à disposição de Deus, com simplicidade e alegria, para tornar a liturgia mais bela, mais orante e mais viva.
          É aprender a viver em comunidade, a crescer na fé, a ouvir a Palavra e a se deixar formar por ela.
          No silêncio do altar, no som do sino, na ordem da procissão — ali está o coração de quem serve com o coração de criança e a alma cheia de Deus.
        </p>
      </section>

      <div className="text-center mb-8">
        <p className="text-gray-700 mb-4">Confira quando é sua próxima escala:</p>
        <Link to="/escala-fixa">
          <button className="bg-[#063265] text-white px-6 py-2 rounded-full hover:bg-[#042644] transition">
            Ver Escala
          </button>
        </Link>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-2 text-[#535043]">Galeria</h2>
        <p className="text-gray-700 mb-4">Registros da nossa caminhada:</p>
        <div className="grid grid-cols-3 gap-4">
          {galeria.map((src, i) => (
            <img
              key={i}
              src={src}
              onClick={() => setImagemSelecionada(src)}
              className="rounded-md shadow-sm cursor-pointer hover:opacity-80 transition-all object-cover h-28 w-full"
              alt={`Foto ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {imagemSelecionada && (
        <div
          onClick={() => setImagemSelecionada(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={imagemSelecionada}
            alt="Imagem ampliada"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default CoroinhasPage;