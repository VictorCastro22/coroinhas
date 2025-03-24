import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../CardEscala";
import ModalAddCoroinha from "../ModalAddCoroinha";
import coroinhas from "../../dados/coroinhas"; 

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const CalendarioPadres: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedCoroinha, setSelectedCoroinha] = useState<string>("");
  const [selectionCounts, setSelectionCounts] = useState<{ [key: string]: number }>({});

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
      });

      const novosCoroinhas = [
        ...(coroinhasData[selectedCard] || []),
        { id: docRef.id, nome: coroinha.nome, foto: coroinha.foto },
      ];
      setCoroinhas({ ...coroinhasData, [selectedCard]: novosCoroinhas });

      setSelectionCounts({ 
        ...selectionCounts, 
        [coroinha.nome]: (selectionCounts[coroinha.nome] || 0) + 1 
      });

      setSelectedCard(null);
      setSelectedCoroinha("");
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
    { id: "78-2025-03-25-19h-SerraPelada", data: "2025-03-25", horario: "19h", local: "Serra Pelada", padre: "Padre Ivan" },
    { id: "78-2025-03-25-19h-SaoPedro", data: "2025-03-25", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "78-2025-03-26-19h-SantosDumont", data: "2025-03-26", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-03-26-19h-MissaFamilias", data: "2025-03-26", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },


    { id: "78-2025-03-27-19h-CampoDelta", data: "2025-03-27", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },
    { id: "78-2025-03-27-19h-MaeRainha", data: "2025-03-27", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-03-28-19h-Tabuba", data: "2025-03-28", horario: "19h", local: "Tabuba (Posse de Pe. Ednaldo)", padre: "Padre Eudásio" },
    { id: "78-2025-03-28-19h-ConegoPinto", data: "2025-03-28", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },
    { id: "78-2025-03-28-19h-Rosario", data: "2025-03-28", horario: "19h", local: "Rosário", padre: "Padre Rafael" },

    { id: "78-2025-03-29-17h-SaoBenedito", data: "2025-03-29", horario: "17h", local: "São Benedito", padre: "Padre Rafael" },
    { id: "78-2025-03-29-19h-Matriz", data: "2025-03-29", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-03-30-07h-Matriz", data: "2025-03-30", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-30-07h-Divino", data: "2025-03-30", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-03-30-09h-Matriz", data: "2025-03-30", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-30-17h-PqSaoJoao", data: "2025-03-30", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-03-30-17h-CentroPastoral", data: "2025-03-30", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-03-30-17h-Divino", data: "2025-03-30", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-30-19h-NPqIracema", data: "2025-03-30", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "78-2025-03-30-19h-PqSaoJoao", data: "2025-03-30", horario: "19h", local: "Matriz", padre: "Padre Rafael" }

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
        onSubmit={handleSubmitCoroinha}
        onClose={() => setSelectedCard(null)}
        selectedCoroinha={selectedCoroinha}
        setSelectedCoroinha={setSelectedCoroinha}
        selectionCounts={selectionCounts}
      />

    </div>
  );
};

export default CalendarioPadres;