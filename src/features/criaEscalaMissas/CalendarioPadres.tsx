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
    // --- 02/07 (Quinta-feira) ---
    { "id": "ivan-2026-07-02-08hs-matriz", "data": "2026-07-02", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-02-19hs-matriz", "data": "2026-07-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 03/07 (Sexta-feira) ---
    { "id": "rafael-2026-07-03-19hs-cp", "data": "2026-07-03", "horario": "19hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" }, //

    // --- 04/07 (Sábado) ---
    { "id": "rafael-2026-07-04-17hs-staluzia", "data": "2026-07-04", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-07-04-17hs-starita", "data": "2026-07-04", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-04-19hs-matriz", "data": "2026-07-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-07-04-19hs-scjcoite", "data": "2026-07-04", "horario": "19hs", "local": "SCJ Coité", "padre": "Padre Adair" }, //

    { "id": "ivan-2026-07-05-07hs-matriz", "data": "2026-07-05", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-05-07hs-divino", "data": "2026-07-05", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, //

    { "id": "flavio-2026-07-05-09hs-matriz", "data": "2026-07-05", "horario": "09hs", "local": "Matriz", "padre": "Padre Flávio" }, //
    { "id": "ivan-2026-07-05-09hs-saojose", "data": "2026-07-05", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-05-09hs-aparecida", "data": "2026-07-05", "horario": "09hs", "local": "Aparecida", "padre": "Padre Rafael" }, //

    { "id": "ivan-2026-07-05-16hs-rosario", "data": "2026-07-05", "horario": "16hs", "local": "Rosário", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-05-16hs-parquesaojoao", "data": "2026-07-05", "horario": "16hs", "local": "Parque São João", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-07-05-17hs-divino", "data": "2026-07-05", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, //

    { "id": "rafael-2026-07-05-19hs-matriz", "data": "2026-07-05", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-07-05-19hs-candeias", "data": "2026-07-05", "horario": "19hs", "local": "Candeias", "padre": "Padre Ivan" } //
 
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