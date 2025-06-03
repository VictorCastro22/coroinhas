import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import { escala as escalas } from "../../dados/escala";
import { gerarPdfEscala } from "../../utils/pdf";
import coroinhas from "../../dados/coroinhas";
import SearchableSelect from "../../components/SearchableSelect";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhasData] = useState<{ [key: string]: Coroinha[] }>({});
  const [allCoroinhas, setAllCoroinhas] = useState<Coroinha[]>([]);
  const [selectedCoroinha, setSelectedCoroinha] = useState<Coroinha | null>(null);
  const [showModal, setShowModal] = useState(true);

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
    return [...coroinhas].sort((a, b) => a.nome.localeCompare(b.nome));
  }, []);

  const filteredEscalas = useMemo(() => {
    if (!selectedCoroinha) return escalas;
    return escalas.filter(escala =>
      coroinhasData[escala.id]?.some(data => data.nome === selectedCoroinha.nome)
    );
  }, [coroinhasData, selectedCoroinha]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Escala Fixa
      </h1>

      <div className="mb-6 flex justify-center items-center gap-4 bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={() => setShowModal(true)}>
        {!selectedCoroinha ? (
          <span className="text-gray-500">Selecione um coroinha</span>
        ) : (
          <div className="flex flex-col items-center">
            <img src={selectedCoroinha.foto} alt={selectedCoroinha.nome} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" />
            <span className="text-sm font-semibold">{selectedCoroinha.nome}</span>
          </div>
        )}
        <span className="text-gray-500 text-xl">▼</span> 
      </div>

      {showModal && (
        <SearchableSelect
          coroinhas={coroinhasOrdenados}
          selectedId={selectedCoroinha ? selectedCoroinha.id : null}
          onApply={(selected) => {
            setSelectedCoroinha(selected);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => gerarPdfEscala(filteredEscalas, allCoroinhas, selectedCoroinha ? selectedCoroinha.nome : "")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
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
            coroinhasData[escala.id]?.filter(c => selectedCoroinha && c.nome === selectedCoroinha.nome) || []
          }
          onAddCoroinha={() => {}}
          onDeleteCoroinha={() => {}}
          isPublicView={true}
        />
      ))}
    </div>
  );
};

export default EscalaFixa;