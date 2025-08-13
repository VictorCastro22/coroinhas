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
  funcao: string;
}

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

    { id: "80-2025-08-13-05h-PreFestaRuaRobert", data: "2025-08-13", horario: "05h", local: "Pré Festa - Rua Robert Braquihais, 1181", padre: "Padre Eudásio" },
    { id: "78-2025-08-13-12h-Matriz", data: "2025-08-13", horario: "12h", local: "Matriz", padre: "Padre Ivan" },
    { id: "80-2025-08-13-17h-PqSaoJoao", data: "2025-08-13", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-08-13-17h-Vilares", data: "2025-08-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "80-2025-08-13-19h-SantaDulce", data: "2025-08-13", horario: "19h", local: "Santa Dulce (Encerramento Festa)", padre: "Padre Eudásio" },
    { id: "78-2025-08-13-19h-MatrizMissaFamilias", data: "2025-08-13", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-08-13-19h-SantosDumont", data: "2025-08-13", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "80-2025-08-14-05h-PreFestaRuaNapoleao", data: "2025-08-14", horario: "05h", local: "Pré Festa - Rua Napoleão Lima", padre: "Padre Eudásio" },
    { id: "78-2025-08-14-19h-MaeRainha", data: "2025-08-14", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-08-14-19h-Pirapora", data: "2025-08-14", horario: "19h", local: "Pirapora", padre: "Padre Ivan" },

    { id: "80-2025-08-15-05h-PreFestaMaranguapeSul", data: "2025-08-15", horario: "05h", local: "Pré Festa - Maranguape Sul", padre: "Padre Eudásio" },
    { id: "78-2025-08-15-19h-Rosario", data: "2025-08-15", horario: "19h", local: "Rosário", padre: "Padre Rafael" },
    { id: "78-2025-08-15-19h-AreaVerde", data: "2025-08-15", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Ivan" },

    { id: "80-2025-08-16-05h-PreFestaRuaJean", data: "2025-08-16", horario: "05h", local: "Pré Festa - Rua Jean Roberto Braquihais, 388", padre: "Padre Eudásio" },
    { id: "78-2025-08-16-17h-SantaLuzia", data: "2025-08-16", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "78-2025-08-16-17h-SantoAntonio", data: "2025-08-16", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "80-2025-08-16-19h-Matriz", data: "2025-08-16", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-08-16-19h-RosarioInvestidura", data: "2025-08-16", horario: "19h", local: "Divino - Investidura Coroinhas", padre: "Padre Rafael" },
    { id: "78-2025-08-16-19h-Coite", data: "2025-08-16", horario: "19h", local: "Coité", padre: "Padre Ivan" },

    { id: "80-2025-08-17-07h-Matriz", data: "2025-08-17", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-08-17-07h-Divino", data: "2025-08-17", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-08-17-09h-SaoJose", data: "2025-08-17", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "80-2025-08-17-09h-Matriz", data: "2025-08-17", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-08-17-17h-Divino", data: "2025-08-17", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "80-2025-08-17-17h-PqSaoJoao", data: "2025-08-17", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-08-17-17h-CentroPastoral", data: "2025-08-17", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-08-17-19h-NovoPqIracema", data: "2025-08-17", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-08-17-19h-Matriz", data: "2025-08-17", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

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
              selectedFuncao={selectedFuncao}
              setSelectedFuncao={setSelectedFuncao}
            />
      
          </div>
        );
      };

export default CalendarioPadres;