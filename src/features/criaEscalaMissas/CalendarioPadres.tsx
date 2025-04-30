import { getDay, parseISO } from "date-fns";
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
  permissoes?: string[];
}

const CalendarioPadres: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [filteredCoroinhas, setFilteredCoroinhas] = useState<Coroinha[]>([]);
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
          permissoes: data.permissoes || [],
        });
        counts[data.nome] = (counts[data.nome] || 0) + 1;
      }

      setCoroinhas(coroinhasData);
      setSelectionCounts(counts);
    };

    fetchCoroinhas();
  }, []);

  const handleAddCoroinha = (cardId: string, local: string, horario: string, data?: string) => {
    if (!data) {
      console.error("A data está indefinida.");
      return;
    }
  
    const diaSemana = getDay(parseISO(data));
    const diasSemanaMap = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const dia = diasSemanaMap[diaSemana];
  
    const coroinhasPermitidos = coroinhas.filter((coroinha) =>
      (coroinha.permissoes || []).includes(`${local}-${horario}-${dia}`)
    );
  
    setFilteredCoroinhas(coroinhasPermitidos);
    setSelectedCard(cardId);
  };
  
  const handleSubmitCoroinha = async () => {
    if (!selectedCard || !selectedCoroinha) return;

    try {
      const coroinha = coroinhas.find((c) => c.id === selectedCoroinha);
      if (!coroinha) return;

      const docRef = await addDoc(collection(db, "coroinhas"), {
        nome: coroinha.nome,
        cardId: selectedCard,
        foto: coroinha.foto,
        permissoes: coroinha.permissoes,
      });

      const novosCoroinhas = [
        ...(coroinhasData[selectedCard] || []),
        { id: docRef.id, nome: coroinha.nome, foto: coroinha.foto, permissoes: coroinha.permissoes },
      ];
      setCoroinhas({
        ...coroinhasData,
        [selectedCard as string]: novosCoroinhas.map((c) => ({
          ...c,
          permissoes: c.permissoes || [],
        })),
      });

      setSelectionCounts({
        ...selectionCounts,
        [coroinha.nome]: (selectionCounts[coroinha.nome] || 0) + 1,
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
    
    { id: "78-2025-05-01-19h-Matriz2", data: "2025-05-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
  
    { id: "78-2025-05-02-18h30-CentroPastoral", data: "2025-05-02", horario: "18h30", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-05-02-19h-CentroPastoral", data: "2025-05-02", horario: "18h30", local: "Centro Pastoral", padre: "Padre Rafael" },
  
    { id: "78-2025-05-03-17h-SantaLuzia", data: "2025-05-03", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "78-2025-05-03-17h-SantoAntonio", data: "2025-05-03", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-05-03-19h-Vilares da Serra", data: "2025-05-03", horario: "19h", local: "Vilares da Serra", padre: "Padre Eudásio" },
    { id: "78-2025-05-03-19h-PqSaoJoao", data: "2025-05-03", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-05-03-19h-Matriz", data: "2025-05-03", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
  
    { id: "78-2025-05-04-07h-Divino", data: "2025-05-04", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-05-04-07h-Matriz", data: "2025-05-04", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-05-04-09h-Matriz", data: "2025-05-04", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-04-09h-SaoJose", data: "2025-05-04", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-05-04-17h-CentroPastoral", data: "2025-05-04", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-05-04-17h-Divino", data: "2025-05-04", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-05-04-17h-PqSaoJoao", data: "2025-05-04", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-05-04-19h-Matriz", data: "2025-05-04", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-04-19h-NovoPqIracema", data: "2025-05-04", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-05-06-19h-Vilares da Serra", data: "2025-05-06", horario: "19h", local: "Vilares da Serra", padre: "Padre Ivan" },
    { id: "78-2025-05-06-19h-Urucara", data: "2025-05-06", horario: "19h", local: "Urucará", padre: "Padre Rafael" },  
  
    { id: "78-2025-05-07-19h-MissaFamilias", data: "2025-05-07", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-07-19h-Guabiraba", data: "2025-05-07", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
  

    { id: "78-2025-05-08-19h-Matriz1", data: "2025-05-08", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-05-08-19h-Matriz2", data: "2025-05-08", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
  
  
    { id: "78-2025-05-10-19h-Matriz", data: "2025-05-10", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-10-19h-OutraBanda", data: "2025-05-10", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    
    { id: "78-2025-05-11-07h-Matriz", data: "2025-05-11", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-11-07h-Divino", data: "2025-05-11", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-05-11-07h-Abrigo", data: "2025-05-11", horario: "07h", local: "Abrigo", padre: "Padre Eudásio" },
    { id: "78-2025-05-11-09h-Matriz", data: "2025-05-11", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-11-17h-CentroPastoral", data: "2025-05-11", horario: "17h", local: "Centro Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-05-11-17h-PqSaoJoao", data: "2025-05-11", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-05-11-17h-Divino", data: "2025-05-11", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-05-11-19h-Matriz", data: "2025-05-11", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-11-19h-NovoPqIracema", data: "2025-05-11", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-05-11-19h-MaeRainha", data: "2025-05-11", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },

    
    { id: "78-2025-05-12-19h-Guabiraba", data: "2025-05-12", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-05-13-11h30-PracaJoaoLeite", data: "2025-05-13", horario: "11h30", local: "Praça João Leite - Procissão com a imagem de N. Sra. de Fátima para a Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-13-12h-Matriz", data: "2025-05-13", horario: "12h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-05-13-19h-PqSaoJoao", data: "2025-05-13", horario: "19h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-05-13-19h-Vilares da Serra", data: "2025-05-13", horario: "19h", local: "Vilares da Serra", padre: "Padre Rafael" },
    { id: "78-2025-05-13-19h-SaoPedro", data: "2025-05-13", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },


    { id: "78-2025-05-14-19h-MissaFamilias", data: "2025-05-14", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-14-19h-SantosDumont", data: "2025-05-14", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-05-15-19h-PqRosas", data: "2025-05-15", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "78-2025-05-15-19h-Tangueira", data: "2025-05-15", horario: "19h", local: "Tangueira", padre: "Padre Ivan" },

    { id: "78-2025-05-16-19h-Pirapora", data: "2025-05-16", horario: "19h", local: "Pirapora", padre: "Padre Eudásio" },
    { id: "78-2025-05-16-19h-Rosario", data: "2025-05-16", horario: "19h", local: "Rosário", padre: "Padre Rafael" },
    { id: "78-2025-05-16-19h-AreaVerde", data: "2025-05-16", horario: "19h", local: "Área Verde (Areninha)", padre: "Padre Ivan" },

    { id: "78-2025-05-17-17h-Matriz", data: "2025-05-17", horario: "17h", local: "Matriz - Casamento comunitário", padre: "Padre Eudásio" },
    { id: "78-2025-05-17-17h-SantaLuzia", data: "2025-05-17", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "78-2025-05-17-17h-SantoAntonio", data: "2025-05-17", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "78-2025-05-17-19h-Coite", data: "2025-05-17", horario: "19h", local: "Coité", padre: "Padre Rafael" },
    { id: "78-2025-05-17-19h-Matriz", data: "2025-05-17", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-05-18-07h-Matriz", data: "2025-05-18", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-05-18-07h-Divino", data: "2025-05-18", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-05-18-09h-Matriz", data: "2025-05-18", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-18-09h-SaoJose", data: "2025-05-18", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-05-18-17h-CentroPastoral", data: "2025-05-18", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-05-18-17h-Divino", data: "2025-05-18", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-05-18-17h-PqSaoJoao", data: "2025-05-18", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-05-18-19h-Matriz", data: "2025-05-18", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-18-19h-NovoPqIracema", data: "2025-05-18", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "78-2025-05-18-19h-GuabirabaSantaRita", data: "2025-05-18", horario: "19h", local: "Guabiraba", padre: "Padre Rafael" },

    { id: "78-2025-05-20-19h-PlanaltoCajueiros", data: "2025-05-20", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "78-2025-05-20-19h-Urucara", data: "2025-05-20", horario: "19h", local: "Urucará", padre: "Padre Ivan" },
    { id: "78-2025-05-20-19h-Vilares da Serra", data: "2025-05-20", horario: "19h", local: "Vilares da Serra", padre: "Padre Rafael" },

    { id: "78-2025-05-21-19h-MissaFamilias", data: "2025-05-21", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-21-19h-Guabiraba", data: "2025-05-21", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-05-22-18h30-Guabiraba", data: "2025-05-22", horario: "18h30", local: "Guabiraba", padre: "Padre Eudásio" },
    { id: "78-2025-05-22-19h-AreaSeca", data: "2025-05-22", horario: "19h", local: "Área Seca (CDD)", padre: "Padre Ivan" },
    { id: "78-2025-05-22-19h-MaeRainha", data: "2025-05-22", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-05-23-18h-PqSaoJoao", data: "2025-05-23", horario: "18h", local: "Parque São João - Casamento de Ivanilson e Fabiane", padre: "Padre Eudásio" },
    { id: "78-2025-05-23-19h-Rosario", data: "2025-05-23", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "78-2025-05-23-19h-ConegoPinto", data: "2025-05-23", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },

    { id: "78-2025-05-24-17h-Abrigo", data: "2025-05-24", horario: "17h", local: "Abrigo", padre: "Padre Eudásio" },
    { id: "78-2025-05-24-17h-SantaDulce", data: "2025-05-24", horario: "17h", local: "Santa Dulce", padre: "Padre Ivan" },
    { id: "78-2025-05-24-17h-Shalom", data: "2025-05-24", horario: "17h", local: "Shalom", padre: "Padre Rafael" },
    { id: "78-2025-05-24-19h-OutraBanda", data: "2025-05-24", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "78-2025-05-24-19h-Matriz", data: "2025-05-24", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-05-25-07h-Matriz", data: "2025-05-25", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-25-07h-Divino", data: "2025-05-25", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-05-25-09h-Matriz", data: "2025-05-25", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-25-15h30-SantosDumont", data: "2025-05-25", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "78-2025-05-25-17h-Divino", data: "2025-05-25", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-05-25-17h-CentroPastoral", data: "2025-05-25", horario: "17h", local: "Centro Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-05-25-19h-Matriz", data: "2025-05-25", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-05-27-19h-SerraPelada", data: "2025-05-27", horario: "19h", local: "Serra Pelada", padre: "Padre Eudásio" },
    { id: "78-2025-05-27-19h-SaoPedro", data: "2025-05-27", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },

    { id: "78-2025-05-28-19h-MissaFamilias", data: "2025-05-28", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-05-28-19h-SantosDumont", data: "2025-05-28", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-05-29-19h-Divino", data: "2025-05-29", horario: "19h", local: "Divino", padre: "Padre Ivan" },

    { id: "78-2025-05-30-19h-Matriz-Sanfoneiros", data: "2025-05-30", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-05-31-18h-CentroPastoral", data: "2025-05-31", horario: "18h", local: "Centro Pastoral - Procissão com as imagens peregrinas nas novenas", padre: "Padre Eudásio" },
    { id: "78-2025-05-31-18h-Procissao", data: "2025-05-31", horario: "18h", local: "Centro Pastoral (Procissão com as imagens peregrinas nas novenas)", padre: "Padre Rafael" },
    { id: "78-2025-05-31-19h-Matriz-Coroacao", data: "2025-05-31", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-31-19h-MatrizCoroacao", data: "2025-05-31", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

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
        onAddCoroinha={() => handleAddCoroinha(escala.id, escala.local, escala.horario, escala.data)}
        onDeleteCoroinha={(id) => handleDeleteCoroinha(escala.id, id)}
      />
    ))}

      <ModalAddCoroinha
        isOpen={!!selectedCard}
        coroinhas={filteredCoroinhas}
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