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
  { "id": "96-2025-09-27-17h-SantaDulce", "data": "2025-09-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Eudásio" },
  { "id": "230-2025-09-27-17h-Abrigo", "data": "2025-09-27", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
  { "id": "97-2025-09-27-19h-OutraBanda", "data": "2025-09-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Eudásio" },
  { "id": "329-2025-09-27-19h-SaoBeneditoFesta", "data": "2025-09-27", "horario": "19hs", "local": "São Benedito (Festa)", "padre": "Padre Rafael" },
  { "id": "231-2025-09-27-19h-RosarioBandeira", "data": "2025-09-27", "horario": "19hs", "local": "Rosário (Festa de Nossa Sra. do Rosário)", "padre": "Padre Ivan" },
  { "id": "330-2025-09-28-07h-Divino", "data": "2025-09-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "232-2025-09-28-07h-Matriz", "data": "2025-09-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "98-2025-09-28-08h15-BatismoMatriz", "data": "2025-09-28", "horario": "08:15hs", "local": "Batismo na Matriz", "padre": "Padre Eudásio" },
  { "id": "99-2025-09-28-09h-Matriz", "data": "2025-09-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "100-2025-09-28-15h30-SantosDumont", "data": "2025-09-28", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
  { "id": "101-2025-09-28-17h-PqSaoJoao", "data": "2025-09-28", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
  { "id": "331-2025-09-28-17h-CentroPastoral", "data": "2025-09-28", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "233-2025-09-28-17h-Divino", "data": "2025-09-28", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "332-2025-09-28-19h-Matriz", "data": "2025-09-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "234-2025-09-28-19h-NPqIracema", "data": "2025-09-28", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
  { "id": "333-2025-09-30-19h-AbrigoTriduo", "data": "2025-09-30", "horario": "19hs", "local": "Abrigo (Tríduo de São Francisco)", "padre": "Padre Rafael" }
           
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