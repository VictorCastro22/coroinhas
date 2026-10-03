import { useState, useEffect, useMemo } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import { gerarPdfEscala } from "../../utils/pdf";
import CardEscala from "../../components/CardEscala";
import coroinhas from "../../dados/coroinhas";
import { Coroinha } from "../../types/coroinhas";

interface CoroinhaEscalado {
  nome: string;
  funcao: string;
}

interface EscalaMissa {
  id: string;
  data: string;
  horario: string;
  local: string;
  padre: string;
  coroinhas_escalados?: CoroinhaEscalado[];
}

const TODOS_COROINHAS: Coroinha = {
  id: "todos",
  nome: "Todos os Coroinhas",
  foto: "/investidura-2024.jpg",
};

const EscalaFixa: React.FC = () => {
  const [selectedCoroinha, setSelectedCoroinha] = useState<Coroinha>(TODOS_COROINHAS);
  const [open, setOpen] = useState(false);

  const [escalas, setEscalas] = useState<EscalaMissa[]>([]);
  const [loadingEscalas, setLoadingEscalas] = useState(true);

  // Busca as missas do mês no Firebase
  useEffect(() => {
    const fetchEscalasMensais = async () => {
      try {
        const docRef = doc(db, "escalas_mensais", "mes_atual"); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dadosBrutos = docSnap.data().missas;

          if (typeof dadosBrutos === "string") {
            setEscalas(JSON.parse(dadosBrutos));
          } else if (Array.isArray(dadosBrutos)) {
            setEscalas(dadosBrutos);
          }
        } else {
          console.log("Nenhuma escala encontrada para este mês no Firebase.");
        }
      } catch (error) {
        console.error("Erro ao buscar a escala fixa:", error);
      } finally {
        setLoadingEscalas(false);
      }
    };

    fetchEscalasMensais();
  }, []);

  const coroinhasOrdenados = useMemo(() => {
    return [TODOS_COROINHAS, ...coroinhas.sort((a, b) => a.nome.localeCompare(b.nome))];
  }, []);

  // Filtra as missas baseadas no coroinha selecionado (agora olhando direto em coroinhas_escalados)
  const filteredEscalas = useMemo(() => {
    if (selectedCoroinha.id === "todos") {
      return escalas.filter(escala => (escala.coroinhas_escalados || []).length > 0);
    }

    return escalas.filter(escala =>
      escala.coroinhas_escalados?.some(c => 
        c.nome.toLowerCase() === selectedCoroinha.nome.toLowerCase() ||
        c.nome.toLowerCase().includes(selectedCoroinha.nome.toLowerCase())
      )
    );
  }, [escalas, selectedCoroinha]);

  // Lista simples de todos os coroinhas cadastrados para passar para o gerador de PDF
  const allCoroinhasList: Coroinha[] = coroinhas.map((c, index) => ({
    id: String(index),
    nome: c.nome,
    foto: c.foto,
  }));

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
          onClick={() => gerarPdfEscala(filteredEscalas, allCoroinhasList, selectedCoroinha.nome)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Imprimir Escala em PDF
        </button>
      </div>

      {loadingEscalas ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-500 font-medium">Carregando escala dos coroinhas...</p>
        </div>
      ) : filteredEscalas.length > 0 ? (
        filteredEscalas.map((escala) => (
          <CardEscala
            key={escala.id}
            padre={escala.padre}
            data={escala.data}
            horario={escala.horario}
            local={escala.local}
            coroinhasEscalados={
              selectedCoroinha.id === "todos"
                ? escala.coroinhas_escalados || []
                : (escala.coroinhas_escalados || []).filter(c => 
                    c.nome.toLowerCase().includes(selectedCoroinha.nome.toLowerCase())
                  )
            }
            isPublicView={true}
          />
        ))
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-500 font-medium">Nenhuma escala encontrada para este coroinha.</p>
        </div>
      )}
    </div>
  );
};

export default EscalaFixa;