import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import { escala as escalas } from "../../dados/escala";
import { gerarPdfEscala } from "../../utils/pdf";
import CardEscala from "../../components/CardEscala";
import coroinhas from "../../dados/coroinhas";
import { Coroinha } from "../../types/coroinhas";

const TODOS_COROINHAS: Coroinha = {
  id: "todos",
  nome: "Todos os Coroinhas",
  foto: "/investidura-2024.jpg",
};

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhasData] = useState<{ [key: string]: Coroinha[] }>({});
  const [allCoroinhas, setAllCoroinhas] = useState<Coroinha[]>([]);
  const [selectedCoroinha, setSelectedCoroinha] = useState<Coroinha>(TODOS_COROINHAS);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const dataMap: { [key: string]: Coroinha[] } = {};
      const allList: Coroinha[] = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!dataMap[cardId]) dataMap[cardId] = [];
        const coroinha: Coroinha = {
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
          funcao: data.funcao || "", 
        };
        dataMap[cardId].push(coroinha);
        allList.push(coroinha);
      }

      setCoroinhasData(dataMap);
      setAllCoroinhas(allList);
    };

    fetchCoroinhas();
  }, []);

  const coroinhasOrdenados = useMemo(() => {
    return [TODOS_COROINHAS, ...coroinhas.sort((a, b) => a.nome.localeCompare(b.nome))];
  }, []);

  const filteredEscalas = useMemo(() => {
    if (selectedCoroinha.id === "todos") {
      return escalas.filter(escala => (coroinhasData[escala.id] || []).length > 0);
    }

    return escalas.filter(escala =>
      coroinhasData[escala.id]?.some(data => data.nome === selectedCoroinha.nome)
    );
  }, [coroinhasData, selectedCoroinha]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Escala Fixa
      </h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-72">
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between border border-gray-300 rounded-lg p-2 bg-white shadow-sm"
          >
            <div className="flex items-center gap-2">
              <img
                src={selectedCoroinha.foto}
                alt={selectedCoroinha.nome}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <span className="text-gray-700">{selectedCoroinha.nome}</span>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${open ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-auto">
              {coroinhasOrdenados.map(c => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCoroinha(c);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 ${selectedCoroinha.id === c.id ? "bg-gray-100" : ""}`}
                >
                  <img
                    src={c.foto}
                    alt={c.nome}
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <span className="text-gray-700">{c.nome}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => gerarPdfEscala(filteredEscalas, allCoroinhas, selectedCoroinha.nome)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Imprimir Escala em PDF
        </button>
      </div>

      {filteredEscalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={
            selectedCoroinha.id === "todos"
              ? coroinhasData[escala.id] || []
              : coroinhasData[escala.id]?.filter(c => c.nome === selectedCoroinha.nome) || []
          }
          onAddCoroinha={() => { }}
          onDeleteCoroinha={() => { }}
          isPublicView={true}
        />
      ))}
    </div>
  );
};

export default EscalaFixa;