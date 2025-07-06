import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import ModalAddCoroinha from "../../components/ModalAddCoroinha";
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
    { id: "78-2025-07-06-07h-Matriz", data: "2025-07-06", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-06-07h-Divino", data: "2025-07-06", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "80-2025-07-06-09h-Matriz", data: "2025-07-06", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-07-06-09h-SaoJose", data: "2025-07-06", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "80-2025-07-06-17h-PqSaoJoao", data: "2025-07-06", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-07-06-17h-CentroPastoral", data: "2025-07-06", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-07-06-17h-Divino", data: "2025-07-06", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "80-2025-07-06-19h-SaoPedro", data: "2025-07-06", horario: "19h", local: "São Pedro - Festa de São Pedro", padre: "Padre Eudásio" },
    { id: "78-2025-07-06-19h-Matriz", data: "2025-07-06", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-06-19h-NovoPqIracema", data: "2025-07-06", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "78-2025-07-07-19h-SantosDumont", data: "2025-07-07", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-07-08-19h-Matriz", data: "2025-07-08", horario: "19h", local: "Matriz - Missa Votiva", padre: "Padre Ivan" },

    { id: "78-2025-07-09-19h-MissaFamilias", data: "2025-07-09", horario: "19h", local: "Missa pelas Famílias", padre: "Padre Rafael" },
    { id: "78-2025-07-09-19h-SantosDumont", data: "2025-07-09", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-07-10-19h-Pirapora", data: "2025-07-10", horario: "19h", local: "Pirapora", padre: "Padre Rafael" },
    { id: "78-2025-07-10-19h-MaeRainha", data: "2025-07-10", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },

    { id: "78-2025-07-11-19h-MatrizJubilar", data: "2025-07-11", horario: "19h", local: "Matriz - Jubilar", padre: "Padre" },

    { id: "80-2025-07-12-07h30-DiaDMissionarioUrucara", data: "2025-07-12", horario: "17h", local: "Urucará - Dia 'D' Missionário", padre: "Padre Eudásio" },
    { id: "78-2025-07-12-19h-Matriz", data: "2025-07-12", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-12-19h-OutraBanda", data: "2025-07-12", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "80-2025-07-13-07h-Matriz", data: "2025-07-13", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-07-13-07h-Abrigo", data: "2025-07-13", horario: "07h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "78-2025-07-13-07h-Divino", data: "2025-07-13", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "80-2025-07-13-09h-Matriz", data: "2025-07-13", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-07-13-12h-Matriz", data: "2025-07-13", horario: "12h", local: "Matriz", padre: "Padre Rafael" },
    { id: "80-2025-07-13-16h-Vilares", data: "2025-07-13", horario: "16h", local: "Vilares", padre: "Padre Eudásio" },
    { id: "78-2025-07-13-17h-CentroPastoral", data: "2025-07-13", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "80-2025-07-13-17h-Divino", data: "2025-07-13", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-07-13-17h-PqSaoJoao", data: "2025-07-13", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-07-13-19h-NovoPqIracema", data: "2025-07-13", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-07-13-19h-Matriz", data: "2025-07-13", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-07-15-19h-Urucara", data: "2025-07-15", horario: "19h", local: "Urucará", padre: "Padre Rafael" },
    { id: "78-2025-07-15-19h-PlanaltoCajueiros", data: "2025-07-15", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Ivan" },

    { id: "78-2025-07-16-19h-Guabiraba", data: "2025-07-16", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-07-17-19h-Tangueira", data: "2025-07-17", horario: "19h", local: "Tangueira", padre: "Padre Rafael" },
    { id: "78-2025-07-17-19h-AreaSeca", data: "2025-07-17", horario: "19h", local: "Área Seca", padre: "Padre Ivan" },

    { id: "78-2025-07-18-19h-Rosario", data: "2025-07-18", horario: "19h", local: "Rosário", padre: "Padre Rafael" },
    { id: "78-2025-07-18-19h-AreaVerde", data: "2025-07-18", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Ivan" },

    { id: "78-2025-07-19-08h-RetiroCoroinhas", data: "2025-07-19", horario: "08h", local: "Coroinhas - Retiro", padre: "Padre Rafael" },
    { id: "78-2025-07-19-17h-SantaLuzia", data: "2025-07-19", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "78-2025-07-19-19h-Coite", data: "2025-07-19", horario: "19h", local: "Coité", padre: "Padre Rafael" },
    { id: "78-2025-07-19-19h-Matriz", data: "2025-07-19", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-07-20-07h-Matriz", data: "2025-07-20", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-20-07h-Divino", data: "2025-07-20", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-07-20-09h-Matriz", data: "2025-07-20", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-07-20-09h-SaoJose", data: "2025-07-20", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-07-20-17h-CentroPastoral", data: "2025-07-20", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-07-20-19h-Matriz", data: "2025-07-20", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-07-22-19h-SerraPelada", data: "2025-07-22", horario: "19h", local: "Serra Pelada", padre: "Padre Ivan" },
    { id: "78-2025-07-22-20h-MissaECC", data: "2025-07-22", horario: "20h", local: "Missa de Entrega do ECC", padre: "Padre Rafael" },

    { id: "78-2025-07-23-19h-MissaFamilias", data: "2025-07-23", horario: "19h", local: "Missa pelas Famílias", padre: "Padre Rafael" },
    { id: "78-2025-07-23-19h-SantosDumont", data: "2025-07-23", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-07-24-19h-MaeRainha", data: "2025-07-24", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-07-24-19h-CampoDelta", data: "2025-07-24", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "78-2025-07-25-19h-ConegoPinto", data: "2025-07-25", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },

    { id: "80-2025-07-26-17h-SantaDulce", data: "2025-07-26", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "78-2025-07-26-17h-Abrigo", data: "2025-07-26", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-07-26-19h-Matriz", data: "2025-07-26", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-26-19h-OutraBanda", data: "2025-07-26", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "78-2025-07-27-07h-Matriz", data: "2025-07-27", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-07-27-07h-Divino", data: "2025-07-27", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "80-2025-07-27-09h-Matriz", data: "2025-07-27", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "80-2025-07-27-15h30-SantosDumont", data: "2025-07-27", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "80-2025-07-27-17h-CentroPastoral", data: "2025-07-27", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-07-27-17h-Divino", data: "2025-07-27", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-07-27-17h-PqSaoJoao", data: "2025-07-27", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-07-27-19h-Matriz", data: "2025-07-27", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-07-27-19h-NovoPqIracema", data: "2025-07-27", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-07-30-19h-MissaFamilias", data: "2025-07-30", horario: "19h", local: "Missa pelas Famílias", padre: "Padre Rafael" },
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