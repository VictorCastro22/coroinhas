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
    { id: "07-2024-12-19-18h-Parque-das-Rosas", data: "2024-12-19", horario: "18h", local: "Parque das Rosas", padre: "Padre Eudásio" },
    { id: "08-2024-12-19-19h-Matriz", data: "2024-12-19", horario: "19h", local: "Matriz (Ação de Graças pelos 37 anos de Vida Sacerdotal)", padre: "Padre Eudásio" },
    { id: "22-2024-12-19-19h-Tangueira", data: "2024-12-19", horario: "19h", local: "Tangueira", padre: "Padre Ivan" },

    { id: "23-2024-12-20-19h-Areninha-Area-Verde", data: "2024-12-20", horario: "19h", local: "Areninha da Área Verde", padre: "Padre Ivan" },

    { id: "11-2024-12-21-17h-Santo-Antonio", data: "2024-12-21", horario: "17h", local: "Santo Antônio", padre: "Padre Eudásio" },
    { id: "25-2024-12-21-17h-Santa-Luzia", data: "2024-12-21", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "12-2024-12-21-19h-Coite", data: "2024-12-21", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "26-2024-12-21-19h-Matriz", data: "2024-12-21", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "14-2024-12-21-21h-Empresa-Penha", data: "2024-12-21", horario: "21h", local: "Missa na Empresa Penha", padre: "Padre Eudásio" },

    { id: "15-2024-12-22-07h-Matriz", data: "2024-12-22", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "28-2024-12-22-07h-Divino", data: "2024-12-22", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "16-2024-12-22-09h-Matriz", data: "2024-12-22", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "17-2024-12-22-15h30-Santos-Dumont", data: "2024-12-22", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "18-2024-12-22-17h-Centro-de-Pastoral", data: "2024-12-22", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "29-2024-12-22-17h-Divino", data: "2024-12-22", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "19-2024-12-22-19h-Nova-Parque-Iracema", data: "2024-12-22", horario: "19h", local: "Nova Parque Iracema", padre: "Padre Eudásio" },
    { id: "30-2024-12-22-19h-Matriz", data: "2024-12-22", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "31-2024-12-23-19h-Aratuba", data: "2024-12-23", horario: "19h", local: "Aratuba (Festa de São Francisco de Paula)", padre: "Padre Eudásio" },


    { id: "32-2024-12-24-19h-Matriz", data: "2024-12-24", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "50-2024-12-24-19h-Divino", data: "2024-12-24", horario: "19h", local: "Divino", padre: "Padre Ivan" },
    { id: "33-2024-12-24-21h-Parque-Sao-Joao", data: "2024-12-24", horario: "21h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "51-2024-12-24-21h-Nova-Pq-Iracema", data: "2024-12-24", horario: "21h", local: "Nova Parque Iracema", padre: "Padre Ivan" },
    { id: "34-2024-12-24-24h-Matriz", data: "2024-12-24", horario: "00h", local: "Matriz (Missa do Galo)", padre: "Padre Eudásio" },


    { id: "35-2024-12-25-07h-Divino", data: "2024-12-25", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "52-2024-12-25-07h-Matriz", data: "2024-12-25", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "36-2024-12-25-09h-Matriz", data: "2024-12-25", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "53-2024-12-25-09h-Sao-Jose", data: "2024-12-25", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "37-2024-12-25-17h-Centro-de-Pastoral", data: "2024-12-25", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "54-2024-12-25-17h-Divino", data: "2024-12-25", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "38-2024-12-25-19h-Matriz", data: "2024-12-25", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },
    { id: "55-2024-12-25-19h-Parque-Sao-Joao", data: "2024-12-25", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },


    { id: "39-2024-12-26-19h-Mae-Rainha", data: "2024-12-26", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "56-2024-12-26-19h-Fortaleza", data: "2024-12-26", horario: "19h", local: "Fortaleza", padre: "Padre Ivan" },

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
    { id: "79-2025-01-10-19h-Matriz", data: "2025-01-10", horario: "18h", local: "Abertura dos Festejos", padre: "Padre Ivan" },
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