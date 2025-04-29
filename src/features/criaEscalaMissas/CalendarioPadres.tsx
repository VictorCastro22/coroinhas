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
    { id: "78-2025-04-30-19h-Matriz", data: "2025-04-30", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    
    { id: "79-2025-05-01-08h-Matriz", data: "2025-05-01", horario: "08h", local: "Matriz - Confissões", padre: "Padre Ivan" },
    { id: "78-2025-05-01-19h-Matriz", data: "2025-05-01", horario: "19h", local: "Matriz - Missa de abertura do mês de maio e envio das imagens peregrinas", padre: "Padre Eudásio" },
    { id: "79-2025-05-01-19h-Matriz", data: "2025-05-01", horario: "19h", local: "Matriz - Missa de abertura do mês de maio e envio das imagens peregrinas", padre: "Padre Ivan" },
    { id: "79-2025-05-01-19h-Matriz", data: "2025-05-01", horario: "19h", local: "Matriz - Missa de abertura do mês de maio e envio das imagens peregrinas", padre: "Padre Rafael" },
  
    { id: "79-2025-05-02-17h30-CentroPastoral", data: "2025-05-02", horario: "17h30", local: "Centro de Pastoral - Confissões", padre: "Padre Ivan" },
    { id: "78-2025-05-02-18h30-CentroPastoral", data: "2025-05-02", horario: "18h30", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "79-2025-05-02-19h-CentroPastoral", data: "2025-05-02", horario: "18h30", local: "Centro de Pastoral", padre: "Padre Rafael" },
  
    { id: "79-2025-05-03-17h-SantaLuzia", data: "2025-05-03", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "79-2025-05-03-17h-SantoAntonio", data: "2025-05-03", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-05-03-19h-Vilares", data: "2025-05-03", horario: "19h", local: "Vilares da Serra", padre: "Padre Eudásio" },
    { id: "79-2025-05-03-19h-PqSaoJoao", data: "2025-05-03", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "79-2025-05-03-19h-Matriz", data: "2025-05-03", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
  
    { id: "78-2025-05-04-07h-Divino", data: "2025-05-04", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "79-2025-05-04-07h-Matriz", data: "2025-05-04", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-05-04-09h-Matriz", data: "2025-05-04", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "79-2025-05-04-09h-SaoJose", data: "2025-05-04", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-05-04-17h-CentroPastoral", data: "2025-05-04", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "79-2025-05-04-17h-Divino", data: "2025-05-04", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "79-2025-05-04-17h-PqSaoJoao", data: "2025-05-04", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "79-2025-05-04-19h-Matriz", data: "2025-05-04", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "79-2025-05-04-19h-NovoPqIracema", data: "2025-05-04", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "79-2025-05-06-19h-Vilares", data: "2025-05-06", horario: "19h", local: "Vilares", padre: "Padre Ivan" },
    { id: "79-2025-05-06-19h-Urucara", data: "2025-05-06", horario: "19h", local: "Urucará", padre: "Padre Rafael" },  
  
    { id: "78-2025-05-07-08h-Secretaria", data: "2025-05-07", horario: "08h", local: "Secretaria", padre: "Padre Eudásio" },
    { id: "79-2025-05-07-17h-ConfissoesMatriz", data: "2025-05-07", horario: "17h", local: "Confissões na Matriz", padre: "Padre Rafael" },
    { id: "79-2025-05-07-19h-MissaFamilias", data: "2025-05-07", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "79-2025-05-07-19h-Guabiraba", data: "2025-05-07", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
  
    { id: "79-2025-05-08-08h-Matriz", data: "2025-05-08", horario: "08h", local: "Matriz - Confissões", padre: "Padre Ivan" },
    { id: "79-2025-05-08-19h-Matriz", data: "2025-05-08", horario: "19h", local: "Matriz - Missa votiva à N. Sra. da Penha", padre: "Padre Ivan" },
    { id: "78-2025-05-08-19h-Matriz", data: "2025-05-08", horario: "19h", local: "Matriz - Missa Votiva a N. Sra. da Penha", padre: "Padre Eudásio" },
  
    { id: "78-2025-05-09-17h-Matriz", data: "2025-05-09", horario: "17h", local: "Matriz - Confissões na programação Jubilar", padre: "Padre Eudásio" },
    { id: "79-2025-05-09-17h-ConfissoesMatrizJubilar", data: "2025-05-09", horario: "17h", local: "Confissões na Matriz (na programação Jubilar)", padre: "Padre Rafael" },
    { id: "79-2025-05-09-17h-Matriz", data: "2025-05-09", horario: "17h", local: "Matriz - Confissões (Na programação Jubilar)", padre: "Padre Ivan" },
  
    { id: "79-2025-05-10-19h-Matriz", data: "2025-05-10", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "79-2025-05-10-19h-OutraBanda", data: "2025-05-10", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    
    { id: "79-2025-05-11-07h-Matriz", data: "2025-05-11", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "79-2025-05-11-07h-Divino", data: "2025-05-11", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-05-11-07h-Abrigo", data: "2025-05-11", horario: "07h", local: "Abrigo", padre: "Padre Eudásio" },
    { id: "78-2025-05-11-09h-Matriz", data: "2025-05-11", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "79-2025-05-11-17h-CentroPastoral", data: "2025-05-11", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-05-11-17h-PqSaoJoao", data: "2025-05-11", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "79-2025-05-11-17h-Divino", data: "2025-05-11", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-05-11-19h-Matriz", data: "2025-05-11", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "79-2025-05-11-19h-NovoPqIracema", data: "2025-05-11", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "79-2025-05-11-19h-MaeRainha", data: "2025-05-11", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },
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
        data={escala.data} // Certifique-se de que esta propriedade está no formato correto
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
