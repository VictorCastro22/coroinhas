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

  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
        });
      }
  
      setCoroinhas(coroinhasData);
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
    { id: "1-2024-11-28-19h-Mãe-Rainha", data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Thallys" },
    { id: "2-2024-11-28-19h-Campo-Delta", data: "2024-11-28", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "2-2024-11-29-19h-Rosário", data: "2024-11-29", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "2-2024-11-30-19h-Matriz", data: "2024-11-30", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "1-2024-11-30-20h-Casamento-na-Matriz", data: "2024-11-30", horario: "20h", local: "Casamento na Matriz", padre: "Padre Eudásio" },

    { id: "19-2024-12-01-07h-Matriz", data: "2024-12-01", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "34-2024-12-01-07h-Divino", data: "2024-12-01", horario: "07h", local: "Divino", padre: "Diác. João Paulo" },
    { id: "20-2024-12-01-09h-Matriz", data: "2024-12-01", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "35-2024-12-01-09h-Sao-Jose", data: "2024-12-01", horario: "09h", local: "São José", padre: "Celebrante Leanderson" },
    { id: "2-2024-12-01-17h-Centro-de-Pastoral", data: "2024-12-01", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "21-2024-12-01-17h-Divino", data: "2024-12-01", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "3-2024-12-01-19h-Matriz", data: "2024-12-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "22-2024-12-01-19h-Parque-Sao-Joao", data: "2024-12-01", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },

    { id: "5-2024-12-03-19h-Vila-da-Serra-do-Lagedo", data: "2024-12-03", horario: "19h", local: "Vila da Serra do Lagêdo", padre: "Padre Eudásio" },
    { id: "24-2024-12-03-19h-Santa-Luzia", data: "2024-12-03", horario: "19h", local: "Santa Luzia (Procissão e Missa)", padre: "Padre Ivan" },
    { id: "36-2024-12-03-19h-Vilares", data: "2024-12-03", horario: "19h", local: "Vilares", padre: "Marquinhos/Elzir" },
    { id: "36-2024-12-03-19h-Urucará", data: "2024-12-03", horario: "19h", local: "Urucará", padre: "Diác. João Paulo" },

    { id: "8-2024-12-04-19h-Missa-pelas-familias", data: "2024-12-04", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Eudásio" },
    { id: "25-2024-12-04-19h-Guabiraba", data: "2024-12-04", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "27-2024-12-05-19h-Parque-Rosas", data: "2024-12-05", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },
    { id: "27-2024-12-05-19h-Mororó", data: "2024-12-05", horario: "19h", local: "Mororó", padre: "Celebrante Edilson " },

    { id: "11-2024-12-06-18h-Centro-de-Pastoral", data: "2024-12-06", horario: "18h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "12-2024-12-06-19h-Adoracao-SS-Sacramento", data: "2024-12-06", horario: "19h", local: "Adoração ao SS. Sacramento", padre: "Padre Eudásio" },
    { id: "28-2024-12-06-19h-Lages", data: "2024-12-06", horario: "19h", local: "Lages", padre: "Padre Ivan" },

   
    { id: "29-2024-12-07-17h-Santo-Antonio", data: "2024-12-07", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "14-2024-12-07-19h-Coite", data: "2024-12-07", horario: "19h", local: "Coité (Missa e batizados)", padre: "Padre Eudásio" },
    { id: "30-2024-12-07-19h-Matriz", data: "2024-12-07", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "15-2024-12-08-07h-Matriz", data: "2024-12-08", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "31-2024-12-08-07h-Divino", data: "2024-12-08", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "16-2024-12-08-09h-Matriz", data: "2024-12-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "17-2024-12-08-17h-Centro-de-Pastoral", data: "2024-12-08", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "32-2024-12-08-17h-Divino", data: "2024-12-08", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "18-2024-12-08-19h-Matriz", data: "2024-12-08", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "33-2024-12-08-19h-Nova-Parque-Iracema", data: "2024-12-08", horario: "19h", local: "Nova Parque Iracema", padre: "Padre Ivan" }, 
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
      />

    </div>
  );
};

export default CalendarioPadres;