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
    { id: "78-2025-02-25-19h-SaoPedro", data: "2025-02-25", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "78-2025-02-26-19h-SantosDumont", data: "2025-02-26", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-02-26-19h-MatrizFamilias", data: "2025-02-26", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Rafael" },

    { id: "78-2025-02-27-19h-CampoDoNilo", data: "2025-02-27", horario: "19h", local: "Campo do Nilo", padre: "Padre Ivan" },
    { id: "78-2025-02-27-19h-MaeRainha", data: "2025-02-27", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-03-01-07h30-CPP", data: "2025-03-01", horario: "07:30h", local: "CPP", padre: "Padre Eudásio" },
    { id: "79-2025-03-01-07h30-CPP", data: "2025-03-01", horario: "07:30h", local: "CPP", padre: "Padre Rafael" },
    { id: "78-2025-03-01-17h-SantaLuzia", data: "2025-03-01", horario: "17h", local: "Santa Luzia", padre: "Padre Eudásio" },
    { id: "78-2025-03-01-17h-SantoAntonio", data: "2025-03-01", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-03-01-19h-Matriz", data: "2025-03-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-01-19h-Coite", data: "2025-03-01", horario: "19h", local: "Coité", padre: "Padre Rafael" },

    { id: "78-2025-03-02-07h-Divino", data: "2025-03-02", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-07h-Matriz", data: "2025-03-02", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-02-09h-Matriz", data: "2025-03-02", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-09h-SaoJose", data: "2025-03-02", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-03-02-17h-CentroPastoral", data: "2025-03-02", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-17h-Divino", data: "2025-03-02", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-02-19h-Matriz", data: "2025-03-02", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-19h-NPqIracema", data: "2025-03-02", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-03-05-07h-Matriz", data: "2025-03-05", horario: "07h", local: "Matriz (Missa das Cinzas)", padre: "Padre Eudásio" },
    { id: "78-2025-03-05-07h-Divino", data: "2025-03-05", horario: "07h", local: "Divino (Missa das Cinzas)", padre: "Padre Rafael" },
    { id: "78-2025-03-05-17h-Divino", data: "2025-03-05", horario: "17h", local: "Divino (Missa das Cinzas)", padre: "Padre Eudásio" },
    { id: "78-2025-03-05-17h-ConfissoesMatriz", data: "2025-03-05", horario: "17h", local: "Confissões na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-05-19h-Matriz", data: "2025-03-05", horario: "19h", local: "Missa pelas famílias e das Cinzas", padre: "Padre Rafael" },

    { id: "78-2025-03-06-08h-ConfissoesMatriz", data: "2025-03-06", horario: "08h", local: "Confissões na Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-06-19h-EncontroPastoral", data: "2025-03-06", horario: "19h", local: "Encontro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-03-06-19h-ParqueRosas", data: "2025-03-06", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "78-2025-03-06-19h-Mororo", data: "2025-03-06", horario: "19h", local: "Mororó", padre: "Padre Ivan" },

    { id: "78-2025-03-07-08h-VisitaEnfermos", data: "2025-03-07", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Eudásio" },
    { id: "78-2025-03-07-08h-VisitaEnfermos", data: "2025-03-07", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Rafael" },
    { id: "78-2025-03-07-18h-ConfissoesCentroPastoral", data: "2025-03-07", horario: "18h", local: "Confissões no Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Eudásio" },
    { id: "79-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Rafael" },


    { id: "78-2025-03-08-07h30-DiaDMissionario", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Eudásio" },
    { id: "78-2025-03-08-07h30-DiaDMissionarioPq", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Ivan" },
    { id: "78-2025-03-08-07h30-DiaDMissionarioPqSantaFe", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Rafael" },
    { id: "78-2025-03-08-19h-Matriz", data: "2025-03-08", horario: "19h", local: "Matriz (Missa votiva a N. Sra. da Penha)", padre: "Padre Eudásio" },

    { id: "78-2025-03-09-07h-Matriz", data: "2025-03-09", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-07h-Divino", data: "2025-03-09", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-03-09-07h-Abrigo", data: "2025-03-09", horario: "07h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "78-2025-03-09-09h-Matriz", data: "2025-03-09", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-17h-PqSaoJoao", data: "2025-03-09", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-17h-CentroPastoral", data: "2025-03-09", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-03-09-17h-Divino", data: "2025-03-09", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-09-19h-SaoJose", data: "2025-03-09", horario: "19h", local: "São José (Bandeira da festa)", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-19h-Matriz", data: "2025-03-09", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-09-19h-NPqIracema", data: "2025-03-09", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-03-10-19h-LGrande", data: "2025-03-10", horario: "19h", local: "L. Grande", padre: "Padre Ivan" },

    { id: "78-2025-03-11-19h-SaoJoseHorizonte", data: "2025-03-11", horario: "19h", local: "São José Horizonte", padre: "Padre Eudásio" },
    { id: "78-2025-03-11-19h-SaoPedro", data: "2025-03-11", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },
    { id: "78-2025-03-11-19h-SantaDulce", data: "2025-03-11", horario: "19h", local: "Santa Dulce", padre: "Padre Rafael" },

    { id: "78-2025-03-12-19h-AtendimentoSecretaria", data: "2025-03-12", horario: "08h", local: "Atendimento na Secretaria", padre: "Padre Eudásio" },
    { id: "78-2025-03-12-17h-ConfissoesMatriz", data: "2025-03-12", horario: "17h", local: "Confissões na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-12-19h-SantosDumont", data: "2025-03-12", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-03-12-19h-MissaFamilias", data: "2025-03-12", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-03-13-08h-ConfissoesMatriz", data: "2025-03-13", horario: "08h", local: "Confissões na Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-13-12h-Matriz", data: "2025-03-13", horario: "12h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-13-17h-Vilares", data: "2025-03-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "78-2025-03-13-19h-Pirapora", data: "2025-03-13", horario: "19h", local: "Pirapora", padre: "Padre Eudásio" },
    { id: "78-2025-03-13-19h-PqSaoJoao", data: "2025-03-13", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-03-13-19h-MaeRainha", data: "2025-03-13", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-03-14-08h-VisitaEnfermos", data: "2025-03-14", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Eudásio" },
    { id: "79-2025-03-14-08h-VisitaEnfermos", data: "2025-03-14", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Rafael" },
    { id: "78-2025-03-14-17h-ConfissoesMatriz", data: "2025-03-14", horario: "17h", local: "Confissões na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-14-18h-ConfissoesMatriz", data: "2025-03-14", horario: "18h", local: "Confissões na Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-14-19h-Matriz", data: "2025-03-14", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-03-15-07h30-FormacaoMissionaria", data: "2025-03-15", horario: "07h30", local: "Formação Missionária", padre: "Padre Eudásio" },
    { id: "78-2025-03-15-17h-SantoAntonio", data: "2025-03-15", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "78-2025-03-15-17h-SantaLuzia", data: "2025-03-15", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "78-2025-03-15-19h-Coite", data: "2025-03-15", horario: "19h", local: "Coité", padre: "Padre Ivan" },
    { id: "78-2025-03-15-19h-Matriz", data: "2025-03-15", horario: "19h", local: "Matriz", padre: "Padre Rafael" },


    { id: "78-2025-03-16-07h-Matriz", data: "2025-03-16", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-16-07h-Divino", data: "2025-03-16", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-16-09h-Matriz", data: "2025-03-16", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-16-09h-SaoJose", data: "2025-03-16", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-03-16-09h-EncontroPastoral", data: "2025-03-16", horario: "09h", local: "Encontro Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-03-16-17h-Divino", data: "2025-03-16", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-03-16-17h-PqSaoJoao", data: "2025-03-16", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-03-16-17h-CentroPastoral", data: "2025-03-16", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-03-16-19h-Matriz", data: "2025-03-16", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-16-19h-NPqIracema", data: "2025-03-16", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-03-17-19h-Susto", data: "2025-03-17", horario: "19h", local: "Susto", padre: "Padre Ivan" },

    { id: "78-2025-03-18-19h-PlanaltoCajueiros", data: "2025-03-18", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "78-2025-03-18-19h-Vilares", data: "2025-03-18", horario: "19h", local: "Vilares", padre: "Padre Ivan" },
    { id: "78-2025-03-18-19h-Urucara", data: "2025-03-18", horario: "19h", local: "Urucará", padre: "Padre Rafael" },

    { id: "78-2025-03-19-08h-AtendimentoSecretaria", data: "2025-03-19", horario: "08h", local: "Atendimento na Secretaria", padre: "Padre Eudásio" },
    { id: "78-2025-03-19-09h-SaoJoseFesta", data: "2025-03-19", horario: "09h", local: "São José (Festa)", padre: "Padre Rafael" },
    { id: "78-2025-03-19-19h-SaoJoseFesta", data: "2025-03-19", horario: "19h", local: "São José (Festa)", padre: "Padre Eudásio" },
    { id: "78-2025-03-19-19h-Guabiraba", data: "2025-03-19", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "78-2025-03-19-19h-MissaFamilias", data: "2025-03-19", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },

    { id: "78-2025-03-20-08h-ConfissoesMatriz", data: "2025-03-20", horario: "08h", local: "Confissões na Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-20-19h-PqRosas", data: "2025-03-20", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },
    { id: "78-2025-03-20-19h-Tanguera", data: "2025-03-20", horario: "19h", local: "Tangueira", padre: "Padre Rafael" }
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