import { useState } from "react";

const oracoesIniciais = [
  "Sinal da Cruz: Em nome do Pai, do Filho e do Espírito Santo. Amém.",
  "Credo: Creio em Deus Pai todo-poderoso, Criador do céu e da terra...",
  "Pai Nosso: Pai nosso que estais no céu, santificado seja o Vosso nome...",
  "Ave Maria (3x): Ave Maria, cheia de graça, o Senhor é convosco...",
  "Glória ao Pai: Glória ao Pai, ao Filho e ao Espírito Santo..."
];

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

const oracaoFinal = "Salve Rainha: Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve...";

export default function Rosario() {
  const [fase, setFase] = useState("inicio");
  const [misterioAtual, setMisterioAtual] = useState(0);
  const [meditacaoAtual, setMeditacaoAtual] = useState(0);
  const [contagem, setContagem] = useState(0);
  const [oracaoAtual, setOracaoAtual] = useState(0);

  const avancar = () => {
    if (fase === "inicio") {
      if (oracaoAtual < oracoesIniciais.length - 1) {
        setOracaoAtual(oracaoAtual + 1);
      } else {
        setFase("misterios");
      }
    } else if (fase === "misterios") {
      if (contagem < 10) {
        setContagem(contagem + 1);
      } else {
        setContagem(0);
        if (meditacaoAtual < 4) {
          setMeditacaoAtual(meditacaoAtual + 1);
        } else {
          if (misterioAtual < misterios.length - 1) {
            setMisterioAtual(misterioAtual + 1);
            setMeditacaoAtual(0);
          } else {
            setFase("final");
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 text-center">
        {fase === "inicio" && <h2 className="text-xl font-bold">Orações Iniciais</h2>}
        {fase === "misterios" && <h2 className="text-xl font-bold">{misterios[misterioAtual].nome}</h2>}
        {fase === "final" && <h2 className="text-xl font-bold">Oração Final</h2>}
        <p className="text-gray-600 mt-2">
          {fase === "inicio" && oracoesIniciais[oracaoAtual]}
          {fase === "misterios" && misterios[misterioAtual].meditacoes[meditacaoAtual]}
          {fase === "final" && oracaoFinal}
        </p>
      </div>
      {fase !== "final" && (
        <div className="text-3xl font-bold">{contagem}/10 Ave-Marias</div>
      )}
      <button
        onClick={avancar}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg text-lg transition-transform transform active:scale-95"
      >
        {fase === "inicio" ? "Avançar Oração" : fase === "misterios" ? "Contar Ave-Maria" : "Finalizar"}
      </button>
    </div>
  );
}
