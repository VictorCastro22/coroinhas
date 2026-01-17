import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import ModalAddCoroinha from "../../components/ModalAddCoroinha";
import coroinhas from "../../dados/coroinhas";
import { Coroinha } from "../../types/coroinhas";


const CalendarioPadres: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCoroinha, setSelectedCoroinha] = useState<string>("");
  const [selectionCounts, setSelectionCounts] = useState<{ [key: string]: number }>({});
  const [selectedFuncao, setSelectedFuncao] = useState<string>("");


  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
      const counts: { [key: string]: number } = {};

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
          funcao: data.funcao || "", 
        });
        counts[data.nome] = (counts[data.nome] || 0) + 1;
      }

      setCoroinhas(coroinhasData);
      setSelectionCounts(counts);
    };

    fetchCoroinhas();
  }, []);

  const handleSubmitCoroinha = async () => {
    if (!selectedCard || !selectedCoroinha) return;

    try {
      const coroinha = coroinhas.find(c => c.id === selectedCoroinha);
      if (!coroinha) return;

      const docRef = await addDoc(collection(db, "coroinhas"), {
        nome: coroinha.nome,
        cardId: selectedCard,
        foto: coroinha.foto,
        funcao: selectedFuncao,
      });


      const novosCoroinhas = [
        ...(coroinhasData[selectedCard] || []),
      { id: docRef.id, nome: coroinha.nome, foto: coroinha.foto, funcao: selectedFuncao }
      ];
      setCoroinhas({ ...coroinhasData, [selectedCard]: novosCoroinhas });

      setSelectionCounts({ 
        ...selectionCounts, 
        [coroinha.nome]: (selectionCounts[coroinha.nome] || 0) + 1 
      });

      setSelectedCard(null);
      setSelectedCoroinha("");
      setSelectedFuncao("");
    } catch (error) {
      console.error("Erro ao adicionar coroinha:", error);
    }
  };  

  const handleDeleteCoroinha = async (cardId: string, coroinhaId: string) => {
    try {
      await deleteDoc(doc(db, "coroinhas", coroinhaId));

      const novosCoroinhas = coroinhasData[cardId].filter(
        (coroinha) => coroinha.id !== coroinhaId
      );
      setCoroinhas({ ...coroinhasData, [cardId]: novosCoroinhas });
    } catch (error) {
      console.error("Erro ao deletar coroinha:", error);
    }
  };

  const escalas = [
    { "id": "eudasio-2026-01-16-19hs-matriz", "data": "2026-01-16", "horario": "19hs", "local": "Matriz", "padre": "Padre João Pedro" },
    { "id": "eudasio-2026-01-17-19hs-matriz", "data": "2026-01-17", "horario": "19hs", "local": "Matriz", "padre": "Frei Gilmar" },

    // --- 18/01/2026 ---
    { "id": "rafael-2026-01-18-07hs-divino", "data": "2026-01-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-18-07hs-matriz", "data": "2026-01-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-18-09hs-matriz", "data": "2026-01-18", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-18-17hs-divino", "data": "2026-01-18", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },


    { "id": "eudasio-2026-01-18-19hs-matriz", "data": "2026-01-18", "horario": "19hs", "local": "Matriz", "padre": "Padre João Paulo" },
    { "id": "eudasio-2026-01-19-19hs-matriz", "data": "2026-01-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Roberto" },

    // --- 20/01/2026 ---
    { "id": "rafael-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" }
];

  
  return (
    <div>
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Calendário das Missas
      </h1>

      
            {escalas.map((escala) => (
              <CardEscala
                key={escala.id}
                padre={escala.padre}
                data={escala.data}
                horario={escala.horario}
                local={escala.local}
                coroinhas={coroinhasData[escala.id] || []}
                onAddCoroinha={() => setSelectedCard(escala.id)}
                onDeleteCoroinha={(id) => handleDeleteCoroinha(escala.id, id)}
              />
            ))}
      
            <ModalAddCoroinha
              isOpen={!!selectedCard}
              coroinhas={coroinhas}
              coroinhasDaMissa={selectedCard ? (coroinhasData[selectedCard] || []) : []} 
              onSubmit={handleSubmitCoroinha}
              onClose={() => setSelectedCard(null)}
              selectedCoroinha={selectedCoroinha}
              setSelectedCoroinha={setSelectedCoroinha}
              selectedFuncao={selectedFuncao}
              setSelectedFuncao={setSelectedFuncao}
              selectionCounts={selectionCounts} 
            />

      
          </div>
        );
      };

export default CalendarioPadres;