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
    // --- 01/04 (Quarta-feira) ---
    { "id": "adefinir-2026-04-01-19hs-matriz-1", "data": "2026-04-01", "horario": "19hs", "local": "Matriz (Celebração das Trevas)", "padre": "A Definir" },

    // --- 02/04 (Quinta-feira) ---
    { "id": "adair-2026-04-02-19hs-matriz-1", "data": "2026-04-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-02-19hs-urucara-1", "data": "2026-04-02", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-02-1930hs-divino-1", "data": "2026-04-02", "horario": "19:30hs", "local": "Divino", "padre": "Padre Rafael" },

    // --- 03/04 (Sexta-feira) ---
    { "id": "adair-2026-04-03-15hs-matriz-1", "data": "2026-04-03", "horario": "15hs", "local": "Matriz (Paixão)", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-03-15hs-aparecida-1", "data": "2026-04-03", "horario": "15hs", "local": "Nossa Senhora Aparecida (Paixão)", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-03-15hs-divino-1", "data": "2026-04-03", "horario": "15hs", "local": "Divino (Paixão)", "padre": "Padre Rafael" },

    // --- 04/04 (Sábado) ---
    { "id": "adair-2026-04-04-19hs-matriz-1", "data": "2026-04-04", "horario": "19hs", "local": "Matriz (Vigília)", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-04-19hs-aparecida-1", "data": "2026-04-04", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-04-18hs-divino-1", "data": "2026-04-04", "horario": "18hs", "local": "Divino", "padre": "Padre Rafael" },

    // --- 05/04 (Domingo) ---
    { "id": "adair-2026-04-05-07hs-matriz-1", "data": "2026-04-05", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-05-07hs-divino-1", "data": "2026-04-05", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-05-07hs-abrigo-1", "data": "2026-04-05", "horario": "07hs", "local": "Abrigo", "padre": "Padre Ivan" },
    { "id": "ivan-2026-04-05-09hs-saojose-1", "data": "2026-04-05", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-05-09hs-aparecida-1", "data": "2026-04-05", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
    { "id": "adair-2026-04-05-09hs-matriz-1", "data": "2026-04-05", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-05-17hs-saojoao-1", "data": "2026-04-05", "horario": "17hs", "local": "São João", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-05-17hs-divino-1", "data": "2026-04-05", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "adair-2026-04-05-17hs-rosario-1", "data": "2026-04-05", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" },
    { "id": "adair-2026-04-05-19hs-matriz-1", "data": "2026-04-05", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-05-19hs-urucara-1", "data": "2026-04-05", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" },

    // --- 07/04 (Terça-feira) ---
    { "id": "adair-2026-04-07-19hs-matriz-1", "data": "2026-04-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 08/04 (Quarta-feira) ---
    { "id": "adair-2026-04-08-19hs-matriz-1", "data": "2026-04-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 09/04 (Quinta-feira) ---
    { "id": "ivan-2026-04-09-19hs-matriz-1", "data": "2026-04-09", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-09-19hs-mororo-1", "data": "2026-04-09", "horario": "19hs", "local": "Mororó", "padre": "Padre Adair" },

    // --- 10/04 (Sexta-feira) ---
    { "id": "ivan-2026-04-10-19hs-matriz-1", "data": "2026-04-10", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-10-19hs-piedade-1", "data": "2026-04-10", "horario": "19hs", "local": "Nossa Sra. da Piedade", "padre": "Padre Adair" },

    // --- 11/04 (Sábado) ---
    { "id": "adair-2026-04-11-17hs-santadulce-1", "data": "2026-04-11", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Adair" },
    { "id": "adefinir-2026-04-11-19hs-outrabanda-1", "data": "2026-04-11", "horario": "19hs", "local": "Outra Banda", "padre": "A Definir" },
    { "id": "adair-2026-04-11-19hs-matriz-1", "data": "2026-04-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 12/04 (Domingo) ---
    { "id": "ivan-2026-04-12-07hs-matriz-1", "data": "2026-04-12", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-12-07hs-divino-1", "data": "2026-04-12", "horario": "07hs", "local": "Divino", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-12-09hs-matriz-1", "data": "2026-04-12", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-12-09hs-aparecida-1", "data": "2026-04-12", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-12-17hs-rosario-1", "data": "2026-04-12", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-12-17hs-saojoao-1", "data": "2026-04-12", "horario": "17hs", "local": "São João", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-12-17hs-divino-1", "data": "2026-04-12", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" },
    { "id": "adair-2026-04-12-19hs-matriz-1", "data": "2026-04-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-12-19hs-urucara-1", "data": "2026-04-12", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },

    // --- 13/04 (Segunda-feira) ---
    { "id": "adair-2026-04-13-12hs-matriz-1", "data": "2026-04-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-13-19hs-saojoao-1", "data": "2026-04-13", "horario": "19hs", "local": "São João", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-13-19hs-vilares-1", "data": "2026-04-13", "horario": "19hs", "local": "Vilares", "padre": "Padre Adair" },

    // --- 14/04 (Terça-feira) ---
    { "id": "ivan-2026-04-14-19hs-matriz-1", "data": "2026-04-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 15/04 (Quarta-feira) ---
    { "id": "ivan-2026-04-15-19hs-saopedro-1", "data": "2026-04-15", "horario": "19hs", "local": "São Pedro", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-15-19hs-matriz-1", "data": "2026-04-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 16/04 (Quinta-feira) ---
    { "id": "ivan-2026-04-16-19hs-matriz-1", "data": "2026-04-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-16-19hs-maerainha-1", "data": "2026-04-16", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Adair" },

    // --- 17/04 (Sexta-feira) ---
    { "id": "ivan-2026-04-17-19hs-matriz-1", "data": "2026-04-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adefinir-2026-04-17-19hs-santarita-1", "data": "2026-04-17", "horario": "19hs", "local": "Santa Rita", "padre": "A Definir" },

    // --- 18/04 (Sábado) ---
    { "id": "adair-2026-04-18-17hs-santaluzia-1", "data": "2026-04-18", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-18-17hs-santoantonio-1", "data": "2026-04-18", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
    { "id": "ivan-2026-04-18-19hs-matriz-1", "data": "2026-04-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-18-19hs-coite-1", "data": "2026-04-18", "horario": "19hs", "local": "Coité", "padre": "Padre Adair" },

    // --- 19/04 (Domingo) ---
    { "id": "adair-2026-04-19-07hs-matriz-1", "data": "2026-04-19", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-19-07hs-divino-1", "data": "2026-04-19", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "ivan-2026-04-19-09hs-aparecida-1", "data": "2026-04-19", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-19-09hs-matriz-1", "data": "2026-04-19", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "adefinir-2026-04-19-17hs-saojoao-1", "data": "2026-04-19", "horario": "17hs", "local": "São João", "padre": "A Definir" },
    { "id": "adair-2026-04-19-17hs-divino-1", "data": "2026-04-19", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-19-17hs-rosario-1", "data": "2026-04-19", "horario": "17hs", "local": "Rosário", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-19-19hs-matriz-1", "data": "2026-04-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-19-19hs-urucara-1", "data": "2026-04-19", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },

    // --- 21/04 (Terça-feira) ---
    { "id": "ivan-2026-04-21-19hs-matriz-1", "data": "2026-04-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 22/04 (Quarta-feira) ---
    { "id": "adair-2026-04-22-19hs-matriz-1", "data": "2026-04-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 23/04 (Quinta-feira) ---
    { "id": "ivan-2026-04-23-19hs-pirapora-1", "data": "2026-04-23", "horario": "19hs", "local": "Pirapora", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-23-19hs-nsdores-1", "data": "2026-04-23", "horario": "19hs", "local": "N. Sra. das Dores", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-23-19hs-matriz-1", "data": "2026-04-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

    // --- 24/04 (Sexta-feira) ---
    { "id": "rafael-2026-04-24-19hs-nsgracas-1", "data": "2026-04-24", "horario": "19hs", "local": "N. Sra. das Graças", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-24-19hs-matriz-1", "data": "2026-04-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 25/04 (Sábado) ---
    { "id": "adair-2026-04-25-17hs-abrigo-1", "data": "2026-04-25", "horario": "17hs", "local": "Abrigo", "padre": "Padre Adair" },
    { "id": "ivan-2026-04-25-17hs-santadulce-1", "data": "2026-04-25", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-25-17hs-saobenedito-1", "data": "2026-04-25", "horario": "17hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "rafael-2026-04-25-19hs-matriz-1", "data": "2026-04-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-25-19hs-outrabanda-1", "data": "2026-04-25", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },

    // --- 26/04 (Domingo) ---
    { "id": "adair-2026-04-26-07hs-matriz-1", "data": "2026-04-26", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-26-07hs-divino-1", "data": "2026-04-26", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "rafael-2026-04-26-09hs-aparecida-1", "data": "2026-04-26", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-26-09hs-matriz-1", "data": "2026-04-26", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "ivan-2026-04-26-1530hs-santdumont-1", "data": "2026-04-26", "horario": "15:30hs", "local": "Sant. Dumont", "padre": "Padre Ivan" },
    { "id": "ivan-2026-04-26-17hs-saojoao-1", "data": "2026-04-26", "horario": "17hs", "local": "São João", "padre": "Padre Ivan" },
    { "id": "rafael-2026-04-26-17hs-divino-1", "data": "2026-04-26", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "adair-2026-04-26-17hs-rosario-1", "data": "2026-04-26", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-26-19hs-matriz-1", "data": "2026-04-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "adair-2026-04-26-19hs-urucara-1", "data": "2026-04-26", "horario": "19hs", "local": "Urucará", "padre": "Padre Adair" },

    // --- 27/04 (Segunda-feira) ---
    { "id": "adair-2026-04-27-19hs-penedo-1", "data": "2026-04-27", "horario": "19hs", "local": "Penedo", "padre": "Padre Adair" },

    // --- 28/04 (Terça-feira) ---
    { "id": "ivan-2026-04-28-19hs-matriz-1", "data": "2026-04-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-04-28-19hs-santaterezinha-1", "data": "2026-04-28", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" },
    { "id": "rafael-2026-04-28-19hs-tangueira-1", "data": "2026-04-28", "horario": "19hs", "local": "Tangueira", "padre": "Padre Rafael" },

    // --- 29/04 (Quarta-feira) ---
    { "id": "adair-2026-04-29-19hs-matriz-1", "data": "2026-04-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },

    // --- 30/04 (Quinta-feira) ---
    { "id": "rafael-2026-04-30-19hs-matriz-1", "data": "2026-04-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-04-30-19hs-maerainha-1", "data": "2026-04-30", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },

    // --- 01/05 (Sexta-feira) ---
    { "id": "adair-2026-05-01-1830hs-cp-1", "data": "2026-05-01", "horario": "18:30hs", "local": "Centro de Pastoral", "padre": "Padre Adair" }
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