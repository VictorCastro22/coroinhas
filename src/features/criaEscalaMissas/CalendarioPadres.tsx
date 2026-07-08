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

  { "id": "Padre Rafael-2026-07-08-19hs-matriz-1", "data": "2026-07-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 09/07 (Quinta-feira) ---
  { "id": "ivan-2026-07-09-19hs-matriz-1", "data": "2026-07-09", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-09-19hs-pirapora-1", "data": "2026-07-09", "horario": "19hs", "local": "Pirapora", "padre": "Padre Rafael" },

  // --- 10/07 (Sexta-feira) ---

  { "id": "Padre Rafael-2026-07-10-19hs-matriz-1", "data": "2026-07-10", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 11/07 (Sábado) ---
  { "id": "Padre Rafael-2026-07-11-16hs-rosariocasamentoscomunitarios-1", "data": "2026-07-11", "horario": "16hs", "local": "Rosário: Casamentos comunitários", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-11-17hs-santarita-1", "data": "2026-07-11", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-11-19hs-sjbatista-1", "data": "2026-07-11", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-11-19hs-matriz-1", "data": "2026-07-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 12/07 (Domingo) ---
  { "id": "Padre Rafael-2026-07-12-07hs-centropastoral-1", "data": "2026-07-12", "horario": "07hs", "local": "Centro Pastoral", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-12-07hs-divino-1", "data": "2026-07-12", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "ivan-2026-07-12-09hs-centropastoral-1", "data": "2026-07-12", "horario": "09hs", "local": "Centro Pastoral", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-12-09hs-aparecida-1", "data": "2026-07-12", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "Padre Rafael-2026-07-12-15h30-santaedwiges-1", "data": "2026-07-12", "horario": "15h30", "local": "Santa Edwiges", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-12-16hs-centropastoral-1", "data": "2026-07-12", "horario": "16hs", "local": "Centro Pastoral", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-12-17hs-divino-1", "data": "2026-07-12", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-12-17hs-psaojoao-1", "data": "2026-07-12", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "ivan-2026-07-12-19hs-centropastoral-1", "data": "2026-07-12", "horario": "19hs", "local": "Centro Pastoral", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-12-19hs-candeias-1", "data": "2026-07-12", "horario": "19hs", "local": "Nossa Senhora das Candeias", "padre": "Padre Rafael" },

  // --- 13/07 (Segunda-feira) ---
  { "id": "Padre Rafael-2026-07-13-12hs-matriz-1", "data": "2026-07-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "Padre Rafael-2026-07-13-17hs-vilares-1", "data": "2026-07-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-13-19hs-parqsjoao-1", "data": "2026-07-13", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },

  // --- 14/07 (Terça-feira) ---
  { "id": "ivan-2026-07-14-19hs-matriz-1", "data": "2026-07-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-14-19hs-saopedro-1", "data": "2026-07-14", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },

  // --- 15/07 (Quarta-feira) ---
  { "id": "Padre Rafael-2026-07-15-19hs-matriz-1", "data": "2026-07-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 16/07 (Quinta-feira) ---
  { "id": "ivan-2026-07-16-19hs-matriz-1", "data": "2026-07-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-16-19hs-maerainha-1", "data": "2026-07-16", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Rafael" },

  // --- 17/07 (Sexta-feira) ---
  { "id": "Padre Rafael-2026-07-17-19hs-matriz-1", "data": "2026-07-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-17-19hs-santaterezinha-1", "data": "2026-07-17", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Ivan" },

  // --- 18/07 (Sábado) ---
  { "id": "ivan-2026-07-18-17hs-santoantonio-1", "data": "2026-07-18", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-18-17hs-santaluzia-1", "data": "2026-07-18", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-18-19hs-coite-1", "data": "2026-07-18", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-18-19hs-matriz-1", "data": "2026-07-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 19/07 (Domingo) ---
  { "id": "pi-2026-07-19-07hs-matriz-1", "data": "2026-07-19", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-19-07hs-divino-1", "data": "2026-07-19", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-19-09hs-matriz-1", "data": "2026-07-19", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-19-09hs-aparecida-1", "data": "2026-07-19", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "indefinido-2026-07-19-09hs-saojose-1", "data": "2026-07-19", "horario": "09hs", "local": "São José", "padre": "A confirmar" },
  { "id": "Padre Rafael-2026-07-19-16hs-rosario-1", "data": "2026-07-19", "horario": "16hs", "local": "Rosário", "padre": "Padre Rafael" },
  { "id": "Padre Rafael-2026-07-19-17hs-psaojoao-1", "data": "2026-07-19", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-19-17hs-divino-1", "data": "2026-07-19", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "ivan-2026-07-19-19hs-candeias-1", "data": "2026-07-19", "horario": "19hs", "local": "Nossa Senhora das Candeias", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-19-19hs-matriz-1", "data": "2026-07-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 21/07 (Terça-feira) ---
  { "id": "ivan-2026-07-21-19hs-matriz-1", "data": "2026-07-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-21-19hs-mororo-1", "data": "2026-07-21", "horario": "19hs", "local": "Mororó", "padre": "Padre Rafael" },

  // --- 22/07 (Quarta-feira) ---
  { "id": "ivan-2026-07-22-19hs-matriz-1", "data": "2026-07-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 23/07 (Quinta-feira) ---
  { "id": "ivan-2026-07-23-19hs-matriz-1", "data": "2026-07-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-23-19hs-nsradasdores-1", "data": "2026-07-23", "horario": "19hs", "local": "Nossa Senhora das Dores", "padre": "Padre Rafael" },

  // --- 24/07 (Sexta-feira) ---
  { "id": "Padre Rafael-2026-07-24-19hs-matriz-1", "data": "2026-07-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-24-19hs-nsradapiedade-1", "data": "2026-07-24", "horario": "19hs", "local": "Nossa Senhora da Piedade", "padre": "Padre Ivan" },

  // --- 25/07 (Sábado) ---
  { "id": "ivan-2026-07-25-17hs-santadulce-1", "data": "2026-07-25", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
  { "id": "ivan-2026-07-25-19hs-sjbatista-1", "data": "2026-07-25", "horario": "19hs", "local": "São João Batista", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-25-19hs-matriz-1", "data": "2026-07-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 26/07 (Domingo) ---
  { "id": "pi-2026-07-26-07hs-matriz-1", "data": "2026-07-26", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-26-07hs-divino-1", "data": "2026-07-26", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-26-09hs-matriz-1", "data": "2026-07-26", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-26-09hs-aparecida-1", "data": "2026-07-26", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "Padre Rafael-2026-07-26-15h30-santaedwiges-1", "data": "2026-07-26", "horario": "15h30", "local": "Santa Edwiges", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-26-16hs-rosario-1", "data": "2026-07-26", "horario": "16hs", "local": "Rosário", "padre": "Padre Ivan" },
  { "id": "ivan-2026-07-26-17hs-psaojoao-1", "data": "2026-07-26", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-26-17hs-divino-1", "data": "2026-07-26", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "Padre Rafael-2026-07-26-19hs-candeias-1", "data": "2026-07-26", "horario": "19hs", "local": "Nossa Senhora Candeias", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-26-19hs-matriz-1", "data": "2026-07-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 28/07 (Terça-feira) ---
  { "id": "ivan-2026-07-28-19hs-matriz-1", "data": "2026-07-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-28-19hs-delta-1", "data": "2026-07-28", "horario": "19hs", "local": "Delta", "padre": "Padre Rafael" },

  // --- 29/07 (Quarta-feira) ---

  { "id": "Padre Rafael-2026-07-29-17hs-matriz-1", "data": "2026-07-29", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-29-19hs-divinaPadre Rafaelovidencia-1", "data": "2026-07-29", "horario": "19hs", "local": "Divina Providência", "padre": "Padre Ivan" },

  // --- 30/07 (Quinta-feira) ---
  { "id": "ivan-2026-07-30-19hs-matriz-1", "data": "2026-07-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "Padre Rafael-2026-07-30-19hs-maerainha-1", "data": "2026-07-30", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Rafael" },

  // --- 31/07 (Sexta-feira) ---
  { "id": "Padre Rafael-2026-07-31-19hs-matriz-1", "data": "2026-07-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "ivan-2026-07-31-19hs-nsradasgracas-1", "data": "2026-07-31", "horario": "19hs", "local": "Nossa Senhora das Graças", "padre": "Padre Ivan" }
 
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