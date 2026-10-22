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
  { "id": "escalaoutubro-rafael-2026-10-21-19hs-matriz-1", "data": "2026-10-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-21-19hs-nsdores-1", "data": "2026-10-21", "horario": "19hs", "local": "NS Dores", "padre": "Padre Ivan" },

  // --- 22/10 (Quinta-feira) ---
  { "id": "escalaoutubro-rafael-2026-10-22-0615-irmas-1", "data": "2026-10-22", "horario": "06:15", "local": "Irmãs", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-22-19hs-matriz-1", "data": "2026-10-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 23/10 (Sexta-feira) ---
  { "id": "escalaoutubro-aurenio-2026-10-23-19hs-matriz-1", "data": "2026-10-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Aurênio" },
  { "id": "escalaoutubro-rafael-2026-10-23-19hs-staterezinha-1", "data": "2026-10-23", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Rafael" },

  // --- 24/10 (Sábado) ---
  { "id": "escalaoutubro-rafael-2026-10-24-17hs-starita-1", "data": "2026-10-24", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-24-19hs-matriz-1", "data": "2026-10-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-24-19hs-sjbatista-1", "data": "2026-10-24", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },

  // --- 25/10 (Domingo) ---
  { "id": "escalaoutubro-ivan-2026-10-25-07hs-matriz-1", "data": "2026-10-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-07hs-divino-1", "data": "2026-10-25", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-09hs-matriz-1", "data": "2026-10-25", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-09hs-Nossa Senhora Aparecida-1", "data": "2026-10-25", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-1530-staedwiges-1", "data": "2026-10-25", "horario": "15:30", "local": "Santa Edwiges", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-16hs-matriz-1", "data": "2026-10-25", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-17hs-divino-1", "data": "2026-10-25", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-17hs-psjoao-1", "data": "2026-10-25", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-25-19hs-candeias-1", "data": "2026-10-25", "horario": "19hs", "local": "Candeias", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-19hs-matriz-2", "data": "2026-10-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 27/10 (Terça-feira) ---
  { "id": "escalaoutubro-ivan-2026-10-27-19hs-matriz-1", "data": "2026-10-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-27-19hs-delta-1", "data": "2026-10-27", "horario": "19hs", "local": "Delta", "padre": "Padre Rafael" },

  // --- 28/10 (Quarta-feira) ---
  { "id": "escalaoutubro-ivan-2026-10-28-19hs-matriz-1", "data": "2026-10-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 29/10 (Quinta-feira) ---
  { "id": "escalaoutubro-rafael-2026-10-29-0615-irmas-1", "data": "2026-10-29", "horario": "06:15", "local": "Irmãs", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-29-0830-visitas-1", "data": "2026-10-29", "horario": "08:30", "local": "Visitas", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-29-19hs-matriz-1", "data": "2026-10-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-29-19hs-nspiedade-1", "data": "2026-10-29", "horario": "19hs", "local": "NS Piedade", "padre": "Padre Ivan" },

  // --- 30/10 (Sexta-feira) ---
  { "id": "escalaoutubro-ivanerafael-2026-10-30-19hs-amanari-1", "data": "2026-10-30", "horario": "19hs", "local": "Amanari", "padre": "Padre Ivan e Padre Rafael" },

  // --- 31/10 (Sábado) ---
  { "id": "escalaoutubro-ivan-2026-10-31-17hs-saobenedito-1", "data": "2026-10-31", "horario": "17hs", "local": "São Benedito", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-antoniocarlos-2026-10-31-19hs-matriz-1", "data": "2026-10-31", "horario": "19hs", "local": "Matriz", "padre": "Dom Antônio" },
  { "id": "escalaoutubro-rafael-2026-10-31-19hs-scjesus-1", "data": "2026-10-31", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Rafael" }
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