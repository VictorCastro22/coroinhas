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

  // --- 26/08 (Quarta-feira) ---
  { "id": "escalaagosto-pr-2026-08-26-08h30-atendimento-1", "data": "2026-08-26", "horario": "08h30", "local": "Atendimento", "padre": "Padre Rafael" },
  { "id": "escalaagosto-pr-2026-08-26-19hs-matriz-1", "data": "2026-08-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaagosto-pw-2026-08-26-19hs-maerainha-1", "data": "2026-08-26", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre William" },

  // --- 27/08 (Quinta-feira) ---
  { "id": "escalaagosto-ivan-2026-08-27-08hs-confissoes-1", "data": "2026-08-27", "horario": "08hs", "local": "Confissões", "padre": "Padre Ivan" },
  { "id": "escalaagosto-pr-2026-08-27-08h30-visitas-1", "data": "2026-08-27", "horario": "08h30", "local": "Visitas", "padre": "Padre Rafael" },
  { "id": "escalaagosto-ivan-2026-08-27-19hs-matriz-1", "data": "2026-08-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaagosto-pw-2026-08-27-19hs-nsdores-1", "data": "2026-08-27", "horario": "19hs", "local": "NS Dores", "padre": "Padre William" },

  // --- 28/08 (Sexta-feira) ---
  { "id": "escalaagosto-pr-2026-08-28-17hs-confissoes-1", "data": "2026-08-28", "horario": "17hs", "local": "Confissões", "padre": "Padre Rafael" },
  { "id": "escalaagosto-pr-2026-08-28-19hs-matriz-1", "data": "2026-08-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaagosto-ivan-2026-08-28-19hs-nsgracas-1", "data": "2026-08-28", "horario": "19hs", "local": "NS Graças", "padre": "Padre Ivan" },

  // --- 29/08 (Sábado) ---
  { "id": "escalaagosto-ivanrafael-2026-08-29-19hs-iniciodafestadenspenhamatriz-1", "data": "2026-08-29", "horario": "19hs", "local": "Matriz", "padre": "Pe. Ivan e Pe. Rafael" },

  // --- 30/08 (Domingo) ---
  { "id": "escalaagosto-pi-2026-08-30-07hs-matriz-1", "data": "2026-08-30", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaagosto-pr-2026-08-30-07hs-divino-1", "data": "2026-08-30", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalaagosto-william-2026-08-30-19hs-missa-1", "data": "2026-08-30", "horario": "19hs", "local": "Matriz", "padre": "Padre William" },

  // --- 31/08 (Segunda-feira) ---
  { "id": "escalaagosto-noitada-2026-08-31-19hs-missa-1", "data": "2026-08-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Arildo" },
  { "id": "escalaagosto-ivan-2026-08-31-19hs-lagesii-1", "data": "2026-08-31", "horario": "19hs", "local": "Lages II", "padre": "Padre Ivan" },

// --- 01/09 (Terça-feira) ---
  { "id": "escalasetembro-flavio-2026-09-01-19hs-matriz-1", "data": "2026-09-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Flávio" },

  // --- 02/09 (Quarta-feira) ---
  { "id": "escalasetembro-joaopaulo-2026-09-02-19hs-matriz-1", "data": "2026-09-02", "horario": "19hs", "local": "Matriz", "padre": "Padre João Paulo" },

  // --- 03/09 (Quinta-feira) ---
  { "id": "escalasetembro-rodrigocastro-2026-09-03-19hs-matriz-1", "data": "2026-09-03", "horario": "19hs", "local": "Matriz", "padre": "Padre Rodrigo Castro" },

  // --- 04/09 (Sexta-feira) ---
  { "id": "escalasetembro-edmilson-2026-09-04-19hs-matriz-1", "data": "2026-09-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Edmilson" },

  // --- 05/09 (Sábado) ---
  { "id": "escalasetembro-joaobatista-2026-09-05-19hs-matriz-1", "data": "2026-09-05", "horario": "19hs", "local": "Matriz", "padre": "Padre João Batista" },

  // --- 06/09 (Domingo) ---
  { "id": "escalasetembro-joaopedro-2026-09-06-19hs-matriz-1", "data": "2026-09-06", "horario": "19hs", "local": "Matriz", "padre": "Padre João Pedro" },

  // --- 07/09 (Segunda-feira) ---
  { "id": "escalasetembro-edergilson-2026-09-07-19hs-matriz-1", "data": "2026-09-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Edergilson" },

  // --- 08/09 (Terça-feira) ---
  { "id": "escalasetembro-eudasio-2026-09-08-09hs-matriz-1", "data": "2026-09-08", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "escalasetembro-rafhael-2026-09-08-19hs-matriz-1", "data": "2026-09-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafhael" }

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