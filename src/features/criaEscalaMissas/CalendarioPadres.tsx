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
    { "id": "134-2025-11-01-17h-SantoAntonio", "data": "2025-11-01", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
    { "id": "135-2025-11-01-17h-SantaLuzia", "data": "2025-11-01", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" },
    { "id": "136-2025-11-01-19h-Coite", "data": "2025-11-01", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
    { "id": "137-2025-11-01-19h-Matriz", "data": "2025-11-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    { "id": "138-2025-11-02-07h-Cemiterio", "data": "2025-11-02", "horario": "07hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "139-2025-11-02-07h-Matriz", "data": "2025-11-02", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "140-2025-11-02-07h-Divino", "data": "2025-11-02", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "141-2025-11-02-09h-Matriz", "data": "2025-11-02", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "142-2025-11-02-09h-SaoJose", "data": "2025-11-02", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "143-2025-11-02-17h-Cemiterio", "data": "2025-11-02", "horario": "17hs", "local": "Cemitério", "padre": "Padre Eudásio" },
    { "id": "144-2025-11-02-17h-Divino", "data": "2025-11-02", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "145-2025-11-02-17h-CentrodePastoral", "data": "2025-11-02", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "146-2025-11-02-19h-Matriz", "data": "2025-11-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "147-2025-11-02-19h-PqSaoJoao", "data": "2025-11-02", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "148-2025-11-02-19h-NPqIracema", "data": "2025-11-02", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" }      
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