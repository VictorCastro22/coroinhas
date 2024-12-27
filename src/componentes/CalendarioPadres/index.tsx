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
    { id: "41-2024-12-27-19h-Rosario", data: "2024-12-27", horario: "19h", local: "Rosário", padre: "Padre Eudásio" },
    { id: "57-2024-12-27-19h-Conego-Pinto", data: "2024-12-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },


    { id: "43-2024-12-28-17h-Santa-Dulce", data: "2024-12-28", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "59-2024-12-28-17h-Abrigo", data: "2024-12-28", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "44-2024-12-28-19h-Outra-Banda", data: "2024-12-28", horario: "19h", local: "Outra Banda", padre: "Padre Eudásio" },
    { id: "60-2024-12-28-19h-Matriz", data: "2024-12-28", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "45-2024-12-29-07h-Divino", data: "2024-12-29", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "61-2024-12-29-07h-Matriz", data: "2024-12-29", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "46-2024-12-29-09h-Matriz", data: "2024-12-29", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "47-2024-12-29-17h-Centro-de-Pastoral", data: "2024-12-29", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "62-2024-12-29-17h-Divino", data: "2024-12-29", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "48-2024-12-29-19h-Matriz", data: "2024-12-29", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "63-2024-12-29-19h-Parque-Sao-Joao", data: "2024-12-29", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },


    { id: "49-2024-12-31-19h-Matriz", data: "2024-12-31", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "64-2024-12-31-19h-Divino", data: "2024-12-31", horario: "19h", local: "Divino", padre: "Padre Ivan" },

    { id: "66-2025-01-01-07h-Matriz", data: "2025-01-01", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "81-2025-01-01-07h-Divino", data: "2025-01-01", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "82-2025-01-01-17h-Divino", data: "2025-01-01", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "67-2025-01-01-19h-Matriz", data: "2025-01-01", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },


    { id: "83-2025-01-02-08h-Confissoes-Matriz", data: "2025-01-02", horario: "08h", local: "Matriz", padre: "Padre Ivan" },
    { id: "84-2025-01-02-17h-Mororo", data: "2025-01-02", horario: "17h", local: "Mororó", padre: "Padre Ivan" },
    { id: "68-2025-01-02-19h-Parque-das-Rosas", data: "2025-01-02", horario: "19h", local: "Parque das Rosas", padre: "Padre Eudásio" },

    { id: "69-2025-01-03-18h-Centro-de-Pastoral", data: "2025-01-03", horario: "18h", local: "Centro de Pastoral (1ª sexta)", padre: "Padre Eudásio" },

    { id: "72-2025-01-04-17h-Santo-Antonio", data: "2025-01-04", horario: "17h", local: "Santo Antônio", padre: "Padre Eudásio" },
    { id: "85-2025-01-04-17h-Santa-Luzia", data: "2025-01-04", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "73-2025-01-04-19h-Coite", data: "2025-01-04", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "86-2025-01-04-19h-Matriz", data: "2025-01-04", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "87-2025-01-05-07h-Matriz", data: "2025-01-05", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "74-2025-01-05-07h-Matriz", data: "2025-01-05", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "75-2025-01-05-09h-Matriz", data: "2025-01-05", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "88-2025-01-05-09h-Sao-Jose", data: "2025-01-05", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "76-2025-01-05-11h-Sitio-Marista", data: "2025-01-05", horario: "11h", local: "Sítio Marista (Ação de Graças)", padre: "Padre Eudásio" },
    { id: "77-2025-01-05-17h-Centro-de-Pastoral", data: "2025-01-05", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "89-2025-01-05-17h-Parque-Sao-Joao", data: "2025-01-05", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-01-05-19h-Matriz", data: "2025-01-05", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-01-10-19h-Matriz", data: "2025-01-10", horario: "18h", local: "Abertura dos Festejos", padre: "Padre Eudásio" },
    { id: "78-2025-01-11-19h-Matriz", data: "2025-01-11", horario: "18h", local: "Segundo Dia", padre: "Padre Vicente" },
    { id: "78-2025-01-12-19h-Matriz", data: "2025-01-12", horario: "18h", local: "Terceiro Dia", padre: "Padre Frei Gilmar" },
    { id: "78-2025-01-13-19h-Matriz", data: "2025-01-13", horario: "18h", local: "Quarto Dia", padre: "Padre Odésio" },      { id: "78-2025-01-14-19h-Matriz", data: "2025-01-14", horario: "18h", local: "Quinto Dia", padre: "Padre Gleice" },
    { id: "78-2025-01-15-19h-Matriz", data: "2025-01-15", horario: "18h", local: "Sexto Dia", padre: "Padre Sávio" },
    { id: "78-2025-01-16-19h-Matriz", data: "2025-01-16", horario: "18h", local: "Sétimo Dia", padre: "Padre Rafhael" },
    { id: "78-2025-01-17-19h-Matriz", data: "2025-01-17", horario: "18h", local: "Oitavo Dia", padre: "Padre Diego" },      { id: "78-2025-01-18-19h-Matriz", data: "2025-01-18", horario: "18h", local: "Nono Dia", padre: "Padre Ednaldo" },
    { id: "78-2025-01-19-19h-Matriz", data: "2025-01-19", horario: "18h", local: "Décimo Dia", padre: "Padre Abimael" },
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