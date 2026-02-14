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
    // --- 14/02 ---
    { "id": "adair-2026-02-14-17hs-santadulce", "data": "2026-02-14", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Adair" }, // [cite: 1]
    { "id": "adair-2026-02-14-19hs-saojoaobatista", "data": "2026-02-14", "horario": "19hs", "local": "São João Batista", "padre": "Padre Adair" }, // [cite: 1]
    { "id": "rafael-2026-02-14-19hs-matriz", "data": "2026-02-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 1]

    // --- 15/02 (Domingo) ---
    { "id": "adair-2026-02-15-07hs-matriz", "data": "2026-02-15", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "adair-2026-02-15-09hs-matriz", "data": "2026-02-15", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-15-17hs-divino", "data": "2026-02-15", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "rafael-2026-02-15-19hs-matriz", "data": "2026-02-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "adair-2026-02-15-19hs-aparecida", "data": "2026-02-15", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Adair" }, // [cite: 3]

    // --- 16/02 ---
    { "id": "erenildo-2026-02-16-18hs-matriz", "data": "2026-02-16", "horario": "18hs", "local": "Renovar", "padre": "Padre Erenildo" }, // [cite: 3]
    { "id": "adair-2026-02-17-18hs-matriz", "data": "2026-02-17", "horario": "18hs", "local": "Renovar", "padre": "Padre Adair" }, // [cite: 3]

    // --- 18/02 ---
    { "id": "adair-2026-02-18-07hs-matriz", "data": "2026-02-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-18-07hs-divino", "data": "2026-02-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "ivan-2026-02-18-07hs-santaedwiges", "data": "2026-02-18", "horario": "07hs", "local": "Santa Edwiges", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "rafael-2026-02-18-17hs-matriz", "data": "2026-02-18", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "ivan-2026-02-18-17hs-pqsaojoao", "data": "2026-02-18", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "adair-2026-02-18-17hs-divino", "data": "2026-02-18", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-18-19hs-matriz", "data": "2026-02-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "ivan-2026-02-18-19hs-aparecida", "data": "2026-02-18", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "rafael-2026-02-18-19hs-rita", "data": "2026-02-18", "horario": "19hs", "local": "Santa Rita", "padre": "Padre Rafael" }, // [cite: 3]


    // --- 21/02 ---
    { "id": "adair-2026-02-21-17hs-pastoral", "data": "2026-02-21", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "ivan-2026-02-21-19hs-matriz", "data": "2026-02-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "adair-2026-02-21-19hs-nsdores", "data": "2026-02-21", "horario": "19hs", "local": "Nossa Senhora das Dores", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-21-19hs-piedade", "data": "2026-02-21", "horario": "19hs", "local": "Nossa Senhora da Piedade", "padre": "Padre Rafael" }, // [cite: 3]

    // --- 22/02 (Domingo) ---
    { "id": "ivan-2026-02-22-07hs-matriz", "data": "2026-02-22", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "rafael-2026-02-22-07hs-divino", "data": "2026-02-22", "horario": "07hs", "local": "Divino Espírito Santo", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "adair-2026-02-22-09hs-matriz", "data": "2026-02-22", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "adair-2026-02-22-1530hs-santaedwiges", "data": "2026-02-22", "horario": "15h30", "local": "Santa Edwiges", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-22-17hs-pastoral", "data": "2026-02-22", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "ivan-2026-02-22-17hs-divino", "data": "2026-02-22", "horario": "17hs", "local": "Divino Espírito Santo", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "adair-2026-02-22-17hs-pqsaojoao", "data": "2026-02-22", "horario": "17hs", "local": "Parque São João", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-22-19hs-matriz", "data": "2026-02-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "ivan-2026-02-22-19hs-aparecida", "data": "2026-02-22", "horario": "19hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "adair-2026-02-22-19hs-urucara", "data": "2026-02-22", "horario": "19hs", "local": "Urucará", "padre": "Padre Adair" }, // [cite: 3]

    // --- 24/02 ---
    { "id": "ivan-2026-02-24-17hs-matriz", "data": "2026-02-24", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "ivan-2026-02-24-19hs-matriz", "data": "2026-02-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]

    // --- 25/02 ---
    { "id": "rafael-2026-02-25-17hs-matriz", "data": "2026-02-25", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "adair-2026-02-25-19hs-santaterezinha", "data": "2026-02-25", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-25-19hs-saopedro", "data": "2026-02-25", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "ivan-2026-02-25-19hs-santaedwiges", "data": "2026-02-25", "horario": "19hs", "local": "Santa Edwiges", "padre": "Padre Ivan" }, // [cite: 3]

    // --- 26/02 ---
    { "id": "ivan-2026-02-26-08hs-matriz", "data": "2026-02-26", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "ivan-2026-02-26-19hs-matriz", "data": "2026-02-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, // [cite: 3]
    { "id": "adair-2026-02-26-19hs-nsgracas", "data": "2026-02-26", "horario": "19hs", "local": "Nossa Senhora das Graças", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "rafael-2026-02-26-19hs-rosario", "data": "2026-02-26", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" }, // [cite: 3]

    // --- 27/02 ---
    { "id": "rafael-2026-02-27-19hs-matriz", "data": "2026-02-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "adair-2026-02-27-19hs-maerainha", "data": "2026-02-27", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "adair-2026-02-27-19hs-sagrado", "data": "2026-02-27", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Adair" }, // [cite: 3]

    // --- 28/02 ---
    { "id": "rafael-2026-02-28-17hs-santadulce", "data": "2026-02-28", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" }, // [cite: 3]
    { "id": "adair-2026-02-28-19hs-matriz", "data": "2026-02-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, // [cite: 3]
    { "id": "ivan-2026-02-28-19hs-saojoaobatista", "data": "2026-02-28", "horario": "19hs", "local": "São João Batista", "padre": "Padre Ivan" } // [cite: 3]
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