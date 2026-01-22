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
    // --- 21/01 ---
    { "id": "ivan-2026-01-21-19hs-matriz", "data": "2026-01-21", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 22/01 ---
    { "id": "ivan-2026-01-22-19hs-maerainha", "data": "2026-01-22", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },

    // --- 23/01 ---
    { "id": "ivan-2026-01-23-19hs-candeias", "data": "2026-01-23", "horario": "19hs", "local": "Nossa Senhora das Candeias (Festa)", "padre": "Padre Ivan" },

    // --- 24/01 ---
    { "id": "ivan-2026-01-24-19hs-matriz", "data": "2026-01-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 25/01 (Domingo) ---
    { "id": "antoniolima-2026-01-25-07hs-matriz", "data": "2026-01-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Antonio" },
    { "id": "ivan-2026-01-25-07hs-divino", "data": "2026-01-25", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "ivan-2026-01-25-09hs-matriz", "data": "2026-01-25", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "aurenio-2026-01-25-10hs-matriz", "data": "2026-01-25", "horario": "10hs", "local": "Matriz (Investidura MESC-MEPA)", "padre": "Padre Aurênio" },
    { "id": "antoniolima-2026-01-25-17hs-pastoral", "data": "2026-01-25", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Antonio" },
    { "id": "ivan-2026-01-25-17hs-divino", "data": "2026-01-25", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-25-17hs-pqsaojoao", "data": "2026-01-25", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Padre Rafael" },
    { "id": "antoniolima-2026-01-25-19hs-matriz", "data": "2026-01-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Antonio" },
    { "id": "rafael-2026-01-25-19hs-aparecida", "data": "2026-01-25", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },

    // --- 27/01 ---
    { "id": "ivan-2026-01-27-19hs-saopedro", "data": "2026-01-27", "horario": "19hs", "local": "São Pedro", "padre": "Padre Ivan" },

    // --- 28/01 ---
    { "id": "ivan-2026-01-28-19hs-matriz", "data": "2026-01-28", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 31/01 ---
    { "id": "rafael-2026-01-31-17hs-saobenedito", "data": "2026-01-31", "horario": "17hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "rafael-2026-01-31-19hs-saojoaobatista", "data": "2026-01-31", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-31-19hs-matriz", "data": "2026-01-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 01/02 (Domingo) ---
    { "id": "ivan-2026-02-01-07hs-matriz", "data": "2026-02-01", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2026-02-01-07hs-divino", "data": "2026-02-01", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-02-01-09hs-matriz", "data": "2026-02-01", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2026-02-01-09hs-saojose", "data": "2026-02-01", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "ivan-2026-02-01-17hs-pastoral", "data": "2026-02-01", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
    { "id": "rafael-2026-02-01-17hs-divino", "data": "2026-02-01", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "alexandre-2026-02-01-17hs-pqsaojoao", "data": "2026-02-01", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Diácono Alexandre" },
    { "id": "rafael-2026-02-01-19hs-matriz", "data": "2026-02-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-02-01-19hs-aparecida", "data": "2026-02-01", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" },

    // --- 02/02 ---
    { "id": "rafael-2026-02-02-19hs-candeias", "data": "2026-02-02", "horario": "19hs", "local": "Nossa Senhora Candeias (Festa)", "padre": "Padre Rafael" },

    // --- 04/02 ---
    { "id": "ivan-2026-02-04-19hs-matriz", "data": "2026-02-04", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Ivan" },

    // --- 07/02 ---
    { "id": "rafael-2026-02-07-19hs-matriz", "data": "2026-02-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-02-07-19hs-sagrado", "data": "2026-02-07", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Ivan" },

    // --- 08/02 (Domingo) ---
    { "id": "ivan-2026-02-08-07hs-matriz", "data": "2026-02-08", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2026-02-08-07hs-divino", "data": "2026-02-08", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "domjose-2026-02-08-09hs-matriz", "data": "2026-02-08", "horario": "09hs", "local": "Matriz (Posse Pe. Adair)", "padre": "Dom José Antonio" },
    { "id": "rafael-2026-02-08-17hs-pastoral", "data": "2026-02-08", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "adair-2026-02-08-17hs-divino", "data": "2026-02-08", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" },
    { "id": "ivan-2026-02-08-17hs-pqsaojoao", "data": "2026-02-08", "horario": "17hs", "local": "Nossa Senhora de Fátima", "padre": "Padre Ivan" },
    { "id": "adair-2026-02-08-19hs-matriz", "data": "2026-02-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "rafael-2026-02-08-19hs-aparecida", "data": "2026-02-08", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },

    // --- 11/02 ---
    { "id": "adair-2026-02-11-19hs-matriz", "data": "2026-02-11", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Adair" }
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