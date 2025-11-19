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
    { "id": "178-2025-11-18-19hs-PlanaltoDosCajueiros", "data": "2025-11-18", "horario": "19hs", "local": "Planalto dos Cajueiros", "padre": "Padre Eudásio" },
    { "id": "179-2025-11-18-19hs-Urucara", "data": "2025-11-18", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },
    { "id": "180-2025-11-19-19hs-Matriz", "data": "2025-11-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "181-2025-11-19-19hs-Guabiraba", "data": "2025-11-19", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
    { "id": "182-2025-11-20-08hs-Massape", "data": "2025-11-20", "horario": "08hs", "local": "Massapê", "padre": "Padre Eudásio" },
    { "id": "183-2025-11-20-19hs-TancredoNeves", "data": "2025-11-20", "horario": "19hs", "local": "Tancredo Neves", "padre": "Padre Eudásio" },
    { "id": "184-2025-11-20-19hs-Cajazeiras", "data": "2025-11-20", "horario": "19hs", "local": "Cajazeiras", "padre": "Padre Ivan" },
    { "id": "185-2025-11-21-19hs-Tabuba", "data": "2025-11-21", "horario": "19hs", "local": "Tabuba", "padre": "Padre Eudásio" },
    { "id": "186-2025-11-21-19hs-AreaVerde", "data": "2025-11-21", "horario": "19hs", "local": "Área Verde", "padre": "Padre Ivan" },
    { "id": "187-2025-11-21-19hs-ConegoPinto", "data": "2025-11-21", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Rafael" },
    { "id": "188-2025-11-22-17hs-SantaDulce", "data": "2025-11-22", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
    { "id": "189-2025-11-22-17hs-Abrigo", "data": "2025-11-22", "horario": "17hs", "local": "Abrigo", "padre": "Padre Rafael" },
    { "id": "190-2025-11-22-19hs-OutraBanda", "data": "2025-11-22", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },
    { "id": "191-2025-11-22-19hs-Matriz", "data": "2025-11-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "193-2025-11-23-07hs-Divino", "data": "2025-11-23", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "194-2025-11-23-07hs-Matriz", "data": "2025-11-23", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "195-2025-11-23-09hs-Matriz", "data": "2025-11-23", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "196-2025-11-23-1530hs-SantosDumont", "data": "2025-11-23", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
    { "id": "197-2025-11-23-17hs-Divino", "data": "2025-11-23", "horario": "17hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "198-2025-11-23-17hs-PqSaoJoao", "data": "2025-11-23", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "199-2025-11-23-17hs-CentrodePastoral", "data": "2025-11-23", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "200-2025-11-23-18hs-Rosario", "data": "2025-11-23", "horario": "18hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "201-2025-11-23-19hs-Matriz", "data": "2025-11-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "202-2025-11-23-19hs-NPqIracema", "data": "2025-11-23", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "203-2025-11-25-19hs-SerraPelada", "data": "2025-11-25", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Ivan" },
    { "id": "204-2025-11-26-19hs-SantosDumont", "data": "2025-11-26", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "205-2025-11-26-19hs-Matriz", "data": "2025-11-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "206-2025-11-27-19hs-MaeRainha", "data": "2025-11-27", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },
    { "id": "2De-2025-11-27-ACONFIRMAR-ConegoPinto", "data": "2025-11-27", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Eudásio" },
    { "id": "208-2025-11-28-19hs-ConegoPinto", "data": "2025-11-28", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
    { "id": "209-2025-11-28-19hs-Rosario", "data": "2025-11-28", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "210-2025-11-29-19hs-Matriz", "data": "2025-11-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "211-2025-11-29-19hs-SaoBenedito", "data": "2025-11-29", "horario": "19hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "212-2025-11-30-07hs-Divino", "data": "2025-11-30", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "213-2025-11-30-07hs-Matriz", "data": "2025-11-30", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "214-2025-11-30-09hs-Matriz", "data": "2025-11-30", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "215-2025-11-30-17hs-CentrodePastoral", "data": "2025-11-30", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "216-2025-11-30-17hs-PqSaoJoao", "data": "2025-11-30", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "217-2025-11-30-17hs-Divino", "data": "2025-11-30", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "218-2025-11-30-19hs-Matriz", "data": "2025-11-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "219-2025-11-30-19hs-NPqIracema", "data": "2025-11-30", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" }
    
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