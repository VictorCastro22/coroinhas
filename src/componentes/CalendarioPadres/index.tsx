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
    { id: "78-2025-01-10-19h-Matriz", data: "2025-01-10", horario: "18h", local: "Abertura dos Festejos", padre: "Padre Eudásio" },
    { id: "78-2025-01-11-19h-Matriz", data: "2025-01-11", horario: "18h", local: "Segundo Dia", padre: "Padre Vicente" },
    { id: "78-2025-01-12-19h-Matriz", data: "2025-01-12", horario: "18h", local: "Terceiro Dia", padre: "Padre Frei Gilmar" },

    { id: "78-2025-01-12-07h-Matriz", data: "2025-01-12", horario: "07h", local: "Matriz", padre: "?" },
    { id: "78-2025-01-12-07h-Divino", data: "2025-01-12", horario: "07h", local: "Divino", padre: "?" },
    { id: "78-2025-01-12-09h-Matriz", data: "2025-01-12", horario: "09h", local: "Matriz", padre: "?" },
    { id: "78-2025-01-12-17h-Divino", data: "2025-01-12", horario: "17h", local: "Divino", padre: "?" },

    { id: "78-2025-01-13-19h-Matriz", data: "2025-01-13", horario: "18h", local: "Quarto Dia", padre: "Padre Odésio" },
    { id: "78-2025-01-14-19h-Matriz", data: "2025-01-14", horario: "18h", local: "Quinto Dia", padre: "Padre Gleison" },
    { id: "78-2025-01-15-19h-Matriz", data: "2025-01-15", horario: "18h", local: "Sexto Dia", padre: "Padre Sávio" },
    { id: "78-2025-01-16-19h-Matriz", data: "2025-01-16", horario: "18h", local: "Sétimo Dia", padre: "Padre Rafhael" },
    { id: "78-2025-01-17-19h-Matriz", data: "2025-01-17", horario: "18h", local: "Oitavo Dia", padre: "Padre Diego" },
    { id: "78-2025-01-18-19h-Matriz", data: "2025-01-18", horario: "18h", local: "Nono Dia", padre: "Padre Ednaldo" },
    { id: "78-2025-01-19-19h-Matriz", data: "2025-01-19", horario: "18h", local: "Décimo Dia", padre: "Padre Abimael" },

    { id: "78-2025-01-19-07h-Matriz", data: "2025-01-19", horario: "07h", local: "Matriz", padre: "?" },
    { id: "78-2025-01-19-07h-Divino", data: "2025-01-19", horario: "07h", local: "Divino", padre: "?" },
    { id: "78-2025-01-19-09h-Matriz", data: "2025-01-19", horario: "09h", local: "Matriz", padre: "?" },
    { id: "78-2025-01-19-17h-Divino", data: "2025-01-19", horario: "17h", local: "Divino", padre: "?" },

    { id: "90-2025-01-20-09h-Matriz", data: "2025-01-20", horario: "09h", local: "Matriz (Solene)", padre: "?" },
    { id: "78-2025-01-20-19h-Matriz", data: "2025-01-20", horario: "18h", local: "Encerramento dos Festejos", padre: "Padre Eudásio" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">
        Calendário de Serviço
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