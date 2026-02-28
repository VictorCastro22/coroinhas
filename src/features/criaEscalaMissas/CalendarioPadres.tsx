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



    // --- DIA 27 (Sexta-feira) ---
    { "id": "ivan-2026-02-27-19hs-matriz", "data": "2026-02-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "adair-2026-02-27-19hs-nsgracas", "data": "2026-02-27", "horario": "19hs", "local": "Nossa Sra. das Graças", "padre": "Padre Adair" },
    { "id": "rafael-2026-02-27-19hs-rosario", "data": "2026-02-27", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },

    // --- DIA 28 (Sábado) ---
    { "id": "rafael-2026-02-28-17hs-santadulce", "data": "2026-02-28", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" },
    { "id": "adair-2026-02-28-19hs-matriz", "data": "2026-02-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" },
    { "id": "ivan-2026-02-28-19hs-saojoaobatista", "data": "2026-02-28", "horario": "19hs", "local": "São João Batista", "padre": "Padre Ivan" },

    // --- 01/03 (Domingo) ---
    { "id": "adair-2026-03-01-07hs-matriz", "data": "2026-03-01", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-01-07hs-divino", "data": "2026-03-01", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" }, 
    { "id": "ivan-2026-03-01-09hs-matriz", "data": "2026-03-01", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-01-09hs-aparecida", "data": "2026-03-01", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-01-09hs-saojose", "data": "2026-03-01", "horario": "09hs", "local": "São José", "padre": "Padre Adair" }, 
    { "id": "adair-2026-03-01-17hs-rosario", "data": "2026-03-01", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-01-17hs-divino", "data": "2026-03-01", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-01-17hs-pqsaojoao", "data": "2026-03-01", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-01-19hs-matriz", "data": "2026-03-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-01-19hs-urucara", "data": "2026-03-01", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, 

    // --- 03/03 (Terça-feira) ---
    { "id": "ivan-2026-03-03-19hs-matriz", "data": "2026-03-03", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-03-19hs-santarita", "data": "2026-03-03", "horario": "19hs", "local": "Santa Rita", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-03-19hs-vilares", "data": "2026-03-03", "horario": "19hs", "local": "Vilares", "padre": "Padre Rafael" }, 

    // --- 04/03 (Quarta-feira) ---
    { "id": "adair-2026-03-04-19hs-matriz", "data": "2026-03-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 

    // --- 05/03 (Quinta-feira) ---
    { "id": "rafael-2026-03-05-19hs-matriz", "data": "2026-03-05", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-05-19hs-mororo", "data": "2026-03-05", "horario": "19hs", "local": "Mororó", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-05-19hs-nsdores", "data": "2026-03-05", "horario": "19hs", "local": "Nossa Sra. das Dores", "padre": "Padre Ivan" }, 

    // --- 06/03 (Sexta-feira) ---
    { "id": "ficai-2026-03-06-1830hs-cp", "data": "2026-03-06", "horario": "18:30hs", "local": "Centro de Pastoral", "padre": "Padre Adair" }, 

    // --- 07/03 (Sábado) ---
    { "id": "rafael-2026-03-07-1730hs-pqsantafe", "data": "2026-03-07", "horario": "17:30hs", "local": "Parque Santa Fé", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-07-17hs-santaluzia", "data": "2026-03-07", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-07-19hs-matriz", "data": "2026-03-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-07-19hs-sagrado", "data": "2026-03-07", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Ivan" }, 

    // --- 08/03 (Domingo) ---
    { "id": "rafael-2026-03-08-07hs-matriz", "data": "2026-03-08", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-08-07hs-divino", "data": "2026-03-08", "horario": "07hs", "local": "Divino", "padre": "Padre Adair" }, 
    { "id": "adair-2026-03-08-09hs-matriz", "data": "2026-03-08", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-08-09hs-aparecida", "data": "2026-03-08", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, 
    { "id": "rafael-2026-03-08-17hs-rosario", "data": "2026-03-08", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-08-17hs-divino", "data": "2026-03-08", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-08-17hs-saojoao", "data": "2026-03-08", "horario": "17hs", "local": "São João", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-08-19hs-matriz", "data": "2026-03-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-08-19hs-urucara", "data": "2026-03-08", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" }, 

    // --- 09/03 (Segunda-feira) ---
    { "id": "rafael-2026-03-09-19hs-saojose", "data": "2026-03-09", "horario": "19hs", "local": "São José (Abertura)", "padre": "Padre Rafael" }, 

    // --- 10/03 (Terça-feira) ---
    { "id": "ivan-2026-03-10-19hs-matriz", "data": "2026-03-10", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-10-19hs-saopedro", "data": "2026-03-10", "horario": "19hs", "local": "São Pedro", "padre": "Padre Adair" }, 

    // --- 11/03 (Quarta-feira) ---
    { "id": "adair-2026-03-11-19hs-matriz", "data": "2026-03-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-11-19hs-tangueira", "data": "2026-03-11", "horario": "19hs", "local": "Tangueira", "padre": "Padre Ivan" }, 

    // --- 12/03 (Quinta-feira) ---
    { "id": "ivan-2026-03-12-19hs-maerainha", "data": "2026-03-12", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-12-19hs-matriz", "data": "2026-03-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-12-19hs-pirapora", "data": "2026-03-12", "horario": "19hs", "local": "Pirapora", "padre": "Padre Rafael" }, 

    // --- 14/03 (Sábado) ---
    { "id": "ivan-2026-03-14-17hs-santadulce", "data": "2026-03-14", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-14-17hs-saobenedito", "data": "2026-03-14", "horario": "17hs", "local": "São Benedito", "padre": "Padre Adair" }, 
    { "id": "adair-2026-03-14-19hs-saojoao", "data": "2026-03-14", "horario": "19hs", "local": "São João", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-14-19hs-matriz", "data": "2026-03-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, 

    // --- 15/03 (Domingo) ---
    { "id": "adair-2026-03-15-07hs-matriz", "data": "2026-03-15", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-15-07hs-divino", "data": "2026-03-15", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" }, 
    { "id": "ivan-2026-03-15-09hs-matriz", "data": "2026-03-15", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-15-09hs-aparecida", "data": "2026-03-15", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-15-17hs-rosario", "data": "2026-03-15", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-15-17hs-divino", "data": "2026-03-15", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-15-17hs-pqsaojoao", "data": "2026-03-15", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-15-19hs-matriz", "data": "2026-03-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-15-19hs-urucara", "data": "2026-03-15", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, 

    // --- 17/03 (Terça-feira) ---
    { "id": "ivan-2026-03-17-19hs-matriz", "data": "2026-03-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-17-19hs-santarita", "data": "2026-03-17", "horario": "19hs", "local": "Santa Rita", "padre": "Padre Rafael" }, 

    // --- 18/03 (Quarta-feira) ---
    { "id": "ivan-2026-03-18-19hs-matriz", "data": "2026-03-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 

    // --- 19/03 (Quinta-feira - São José) ---
    { "id": "adair-2026-03-19-18hs-saojose", "data": "2026-03-19", "horario": "18hs", "local": "São José (Encerramento)", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-19-19hs-matriz", "data": "2026-03-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 

    // --- 20/03 (Sexta-feira) ---
    { "id": "ivan-2026-03-20-19hs-matriz", "data": "2026-03-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 

    // --- 21/03 (Sábado) ---
    { "id": "ivan-2026-03-21-17hs-santaluzia", "data": "2026-03-21", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-21-17hs-santoantonio", "data": "2026-03-21", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Adair" }, 
    { "id": "adair-2026-03-21-19hs-matriz", "data": "2026-03-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-21-19hs-sagrado", "data": "2026-03-21", "horario": "19hs", "local": "Sagrado Coração", "padre": "Padre Rafael" }, 

    // --- 22/03 (Domingo) ---
    { "id": "adair-2026-03-22-07hs-matriz", "data": "2026-03-22", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-22-07hs-divino", "data": "2026-03-22", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-22-09hs-matriz", "data": "2026-03-22", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-22-09hs-aparecida", "data": "2026-03-22", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-22-1530hs-sdumont", "data": "2026-03-22", "horario": "15:30hs", "local": "S Dumont", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-22-17hs-rosario", "data": "2026-03-22", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-22-17hs-divino", "data": "2026-03-22", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-22-17hs-saojoao", "data": "2026-03-22", "horario": "17hs", "local": "São João", "padre": "Padre Adair" }, 
    { "id": "adair-2026-03-22-19hs-matriz", "data": "2026-03-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-22-19hs-urucara", "data": "2026-03-22", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, 

    // --- 24/03 (Terça-feira) ---
    { "id": "ivan-2026-03-24-19hs-matriz", "data": "2026-03-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-24-19hs-santaterezinha", "data": "2026-03-24", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-24-19hs-saopedro", "data": "2026-03-24", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" }, 

    // --- 25/03 (Quarta-feira) ---
    { "id": "adair-2026-03-25-19hs-matriz", "data": "2026-03-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 

    // --- 26/03 (Quinta-feira) ---
    { "id": "ivan-2026-03-26-19hs-maerainha", "data": "2026-03-26", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-26-19hs-matriz", "data": "2026-03-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, 

    // --- 27/03 (Sexta-feira) ---
    { "id": "ivan-2026-03-27-19hs-matriz", "data": "2026-03-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-27-19hs-nsgracas", "data": "2026-03-27", "horario": "19hs", "local": "Nossa Sra. das Graças", "padre": "Padre Adair" }, 

    // --- 28/03 (Sábado) ---
    { "id": "rafael-2026-03-28-17hs-santadulce", "data": "2026-03-28", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-28-19hs-matriz", "data": "2026-03-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-28-19hs-outrabanda", "data": "2026-03-28", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Adair" }, 

    // --- 29/03 (Domingo de Ramos) ---
    { "id": "adair-2026-03-29-07hs-matriz", "data": "2026-03-29", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "ivan-2026-03-29-07hs-divino", "data": "2026-03-29", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" }, 
    { "id": "ivan-2026-03-29-09hs-matriz", "data": "2026-03-29", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, 
    { "id": "rafael-2026-03-29-09hs-aparecida", "data": "2026-03-29", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, 
    { "id": "ivan-2026-03-29-17hs-rosario", "data": "2026-03-29", "horario": "17hs", "local": "Rosário", "padre": "Padre Ivan" }, 
    { "id": "adair-2026-03-29-17hs-divino", "data": "2026-03-29", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-29-17hs-pqsaojoao", "data": "2026-03-29", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" }, 
    { "id": "adair-2026-03-29-19hs-matriz", "data": "2026-03-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, 
    { "id": "rafael-2026-03-29-19hs-urucara", "data": "2026-03-29", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" } 
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