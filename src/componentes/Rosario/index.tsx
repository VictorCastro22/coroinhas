import { useState } from "react";

const misterios = [
  {
    nome: "Mistérios Gozosos",
    meditacoes: [
      "Anunciação do Anjo a Maria: Contemplamos o início da Redenção...",
      "Visitação de Maria a Isabel: Maria visita sua prima Isabel...",
      "Nascimento de Jesus: O Verbo se fez carne e habitou entre nós...",
      "Apresentação de Jesus no Templo: Maria e José apresentam Jesus...",
      "Perda e encontro do Menino Jesus: Maria e José encontram Jesus no Templo..."
    ]
  },
  {
    nome: "Mistérios Dolorosos",
    meditacoes: [
      "Agonia de Jesus no Horto: Jesus sofre no Getsêmani...",
      "Flagelação de Jesus: Jesus é cruelmente açoitado...",
      "Coroação de espinhos: Jesus é coroado com espinhos...",
      "Jesus carrega a Cruz: Jesus leva sua Cruz ao Calvário...",
      "Crucificação e morte de Jesus: Jesus morre para nossa salvação..."
    ]
  },
  {
    nome: "Mistérios Gloriosos",
    meditacoes: [
      "Ressurreição de Jesus: Jesus vence a morte...",
      "Ascensão de Jesus: Jesus sobe ao Céu...",
      "Vinda do Espírito Santo: O Espírito Santo desce sobre os Apóstolos...",
      "Assunção de Maria: Maria é levada ao Céu...",
      "Coroação de Maria: Maria é coroada Rainha do Céu e da Terra..."
    ]
  },
  {
    nome: "Mistérios Luminosos",
    meditacoes: [
      "Batismo de Jesus: Jesus é batizado no Jordão...",
      "Bodas de Caná: Jesus realiza seu primeiro milagre...",
      "Anúncio do Reino: Jesus prega a Boa Nova...",
      "Transfiguração de Jesus: Jesus se transfigura diante dos discípulos...",
      "Instituição da Eucaristia: Jesus institui a Sagrada Eucaristia..."
    ]
  }
];

export default function Rosario() {
  const [misterioAtual, setMisterioAtual] = useState(0);
  const [meditacaoAtual, setMeditacaoAtual] = useState(0);
  const [contagem, setContagem] = useState(0);

  const avancarContagem = () => {
    if (contagem < 10) {
      setContagem(contagem + 1);
    } else {
      setContagem(0);
      if (meditacaoAtual < 4) {
        setMeditacaoAtual(meditacaoAtual + 1);
      } else {
        setMeditacaoAtual(0);
        setMisterioAtual((misterioAtual + 1) % misterios.length);
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-xl font-bold">{misterios[misterioAtual].nome}</h2>
        <p className="text-gray-600 mt-2">{misterios[misterioAtual].meditacoes[meditacaoAtual]}</p>
      </div>
      <div className="text-3xl font-bold">{contagem}/10 Ave-Marias</div>
      <button onClick={avancarContagem} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg">
        Contar Ave-Maria
      </button>
    </div>
  );
}