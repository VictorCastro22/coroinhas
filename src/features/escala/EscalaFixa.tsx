import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import { escala as escalas } from "../../dados/escala";
import { gerarPdfEscala } from "../../utils/pdf";
import coroinhas from "../../dados/coroinhas";
import SearchableSelect from "../../components/SearchableSelect"; // 🔹 Importando modal de seleção

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhasData] = useState<{ [key: string]: Coroinha[] }>({});
  const [allCoroinhas, setAllCoroinhas] = useState<Coroinha[]>([]);
  const [selectedCoroinhas, setSelectedCoroinhas] = useState<Coroinha[]>([]);
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
    if (selectedCoroinhas.length === 0) return escalas;
    return escalas.filter(escala =>
      selectedCoroinhas.some(c =>
        coroinhasData[escala.id]?.some(data => data.nome === c.nome)
      )
    );
  }, [coroinhasData, selectedCoroinhas]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Escala Fixa
      </h1>

      {/* 🔹 Exibir Coroinhas Selecionados */}
      <div className="mb-6 flex justify-center items-center gap-4 bg-gray-100 p-4 rounded-lg cursor-pointer" onClick={() => setShowModal(true)}>
        {selectedCoroinhas.length === 0 ? (
          <span className="text-gray-500">Selecione coroinhas</span>
        ) : (
          selectedCoroinhas.map(c => (
            <div key={c.id} className="flex flex-col items-center">
              <img src={c.foto} alt={c.nome} className="w-16 h-16 rounded-full object-cover border-2 border-gray-300" />
              <span className="text-sm font-semibold">{c.nome}</span>
            </div>
          ))
        )}
        <span className="text-gray-500 text-xl">▼</span> {/* 🔹 Indicador de dropdown */}
      </div>

      {/* 🔹 Modal de Seleção */}
      {showModal && (
        <SearchableSelect
          coroinhas={coroinhasOrdenados}
          selectedIds={selectedCoroinhas.map(c => c.id)}
          onApply={(selected) => {
            setSelectedCoroinhas(selected);
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={() => gerarPdfEscala(filteredEscalas, allCoroinhas, selectedCoroinhas.map(c => c.nome).join(", "))}
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
            coroinhasData[escala.id]?.filter(c => selectedCoroinhas.some(s => s.nome === c.nome)) || []
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
