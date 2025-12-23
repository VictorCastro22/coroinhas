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
    // --- 23/12/2025 ---
    { "id": "rafael-2025-12-23-19hs-saopedro", "data": "2025-12-23", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-23-19hs-fortaleza", "data": "2025-12-23", "horario": "19hs", "local": "Fortaleza", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-23-19hs-serrapelada", "data": "2025-12-23", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Eudásio" },

    // --- 24/12/2025 ---
    { "id": "rafael-2025-12-24-07hs-penedompe", "data": "2025-12-24", "horario": "07hs", "local": "Penedo MPE", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-24-17hs-matriz", "data": "2025-12-24", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-24-19hs-matriz", "data": "2025-12-24", "horario": "19hs", "local": "Matriz (Missa de Natal)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-24-19hs-santosdumont", "data": "2025-12-24", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-24-19hs-divino", "data": "2025-12-24", "horario": "19hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-24-21hs-npqiracema", "data": "2025-12-24", "horario": "21hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-24-21hs-pqsaojoao", "data": "2025-12-24", "horario": "21hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-24-24hs-matriz", "data": "2025-12-24", "horario": "24hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 25/12/2025 ---
    { "id": "ivan-2025-12-25-07hs-matriz", "data": "2025-12-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-25-09hs-saojose", "data": "2025-12-25", "horario": "09hs", "local": "São José", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-25-17hs-divino", "data": "2025-12-25", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-25-17hs-pqsaojoao", "data": "2025-12-25", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-25-19hs-matriz", "data": "2025-12-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 26/12/2025 ---
    { "id": "rafael-2025-12-26-08hs-visita", "data": "2025-12-26", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-26-08hs-visita", "data": "2025-12-26", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-26-19hs-conegopinto", "data": "2025-12-26", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-26-19hs-rosario", "data": "2025-12-26", "horario": "19hs", "local": "Rosário", "padre": "Padre Ivan" },

    // --- 27/12/2025 ---
    { "id": "rafael-2025-12-27-17hs-santadulce", "data": "2025-12-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-27-17hs-abrigo", "data": "2025-12-27", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-27-17hs-catedral", "data": "2025-12-27", "horario": "17hs", "local": "Catedral (Conclusão Ano Jubilar)", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-27-19hs-outrabanda", "data": "2025-12-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-27-19hs-matriz", "data": "2025-12-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 28/12/2025 ---
    { "id": "rafael-2025-12-28-07hs-divino", "data": "2025-12-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-07hs-matriz", "data": "2025-12-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-28-09hs-matriz", "data": "2025-12-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-28-1530hs-santosdumont", "data": "2025-12-28", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-28-17hs-centropastoral", "data": "2025-12-28", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-17hs-divino", "data": "2025-12-28", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-28-17hs-pqsaojoao", "data": "2025-12-28", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-28-19hs-matriz", "data": "2025-12-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-19hs-npqiracema", "data": "2025-12-28", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 30/12/2025 ---
    { "id": "rafael-2025-12-30-19hs-mpe", "data": "2025-12-30", "horario": "19hs", "local": "Missa Ação de Graças MPE", "padre": "Padre Rafael" },

    // --- 31/12/2025 ---
    { "id": "rafael-2025-12-31-19hs-divino", "data": "2025-12-31", "horario": "19hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-31-19hs-pqsaojoao", "data": "2025-12-31", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-31-19hs-matriz", "data": "2025-12-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- JANEIRO 2026 ---

    // --- 01/01/2026 ---
    { "id": "ivan-2026-01-01-07hs-divino", "data": "2026-01-01", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-01-07hs-matriz", "data": "2026-01-01", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-01-17hs-pqsaojoao", "data": "2026-01-01", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "ivan-2026-01-01-19hs-divino", "data": "2026-01-01", "horario": "19hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-01-19hs-matriz", "data": "2026-01-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-01-19hs-npqiracema", "data": "2026-01-01", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },


    // --- 02/01/2026 ---
    { "id": "ivan-2026-01-02-18hs-centropastoral", "data": "2026-01-02", "horario": "18hs", "local": "Centro de Pastoral (Confissões)", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-02-1830hs-centropastoral", "data": "2026-01-02", "horario": "18:30hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-02-19hs-centropastoral", "data": "2026-01-02", "horario": "19hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },

    // --- 03/01/2026 ---
    { "id": "ivan-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "07:30hs", "local": "CPP", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "07:30hs", "local": "CPP", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-03-17hs-santaluzia", "data": "2026-01-03", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-03-17hs-santoantonio", "data": "2026-01-03", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-03-17hs-conselho", "data": "2026-01-03", "horario": "17hs", "local": "Conselho Econômico", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-03-19hs-coite", "data": "2026-01-03", "horario": "19hs", "local": "Coité", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-03-19hs-matriz", "data": "2026-01-03", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "19:30hs", "local": "CPP", "padre": "Padre Rafael" },

    // --- 04/01/2026 ---
    { "id": "ivan-2026-01-04-07hs-divino", "data": "2026-01-04", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-04-07hs-matriz", "data": "2026-01-04", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-09hs-saojose", "data": "2026-01-04", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-04-09hs-matriz", "data": "2026-01-04", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-17hs-divino", "data": "2026-01-04", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-04-17hs-pqsaojoao", "data": "2026-01-04", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-04-17hs-centropastoral", "data": "2026-01-04", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-19hs-matriz", "data": "2026-01-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-04-19hs-npqiracema", "data": "2026-01-04", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 10/01/2026 ---
    { "id": "rafael-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Eudásio" },

    // --- 11/01/2026 ---
    { "id": "rafael-2026-01-11-07hs-matriz", "data": "2026-01-11", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-11-07hs-divino", "data": "2026-01-11", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-11-09hs-matriz", "data": "2026-01-11", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 18/01/2026 ---
    { "id": "rafael-2026-01-18-07hs-divino", "data": "2026-01-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-18-07hs-matriz", "data": "2026-01-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-18-09hs-matriz", "data": "2026-01-18", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-18-17hs-divino", "data": "2026-01-18", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },

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