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

    { id: "78-2025-01-12-19h-Matriz", data: "2025-01-12", horario: "18h", local: "Terceiro Dia", padre: "Padre Frei Gilmar" },

    { id: "78-2025-01-12-07h-Matriz", data: "2025-01-12", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-12-09h-Matriz", data: "2025-01-12", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-12-17h-Divino", data: "2025-01-12", horario: "17h", local: "Divino", padre: "Padre Ivan" },

    { id: "78-2025-01-13-19h-Matriz", data: "2025-01-13", horario: "18h", local: "Quarto Dia", padre: "Padre Odésio" },
    { id: "78-2025-01-14-19h-Matriz", data: "2025-01-14", horario: "18h", local: "Quinto Dia", padre: "Padre Gleison" },
    { id: "78-2025-01-15-19h-Matriz", data: "2025-01-15", horario: "18h", local: "Sexto Dia", padre: "Padre Sávio" },
    { id: "78-2025-01-16-19h-Matriz", data: "2025-01-16", horario: "18h", local: "Sétimo Dia", padre: "Padre Rafhael" },
    { id: "78-2025-01-17-19h-Matriz", data: "2025-01-17", horario: "18h", local: "Oitavo Dia", padre: "Padre Diego" },
    { id: "78-2025-01-18-19h-Matriz", data: "2025-01-18", horario: "18h", local: "Nono Dia", padre: "Padre Ednaldo" },
    

    { id: "78-2025-01-19-07h-Matriz", data: "2025-01-19", horario: "07h", local: "Matriz", padre: "?" },
    { id: "78-2025-01-19-07h-Divino", data: "2025-01-19", horario: "07h", local: "Divino", padre: "?" },
    { id: "79-2025-01-19-09h-SJ", data: "2025-01-19", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-01-19-09h-Matriz", data: "2025-01-19", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-19-17h-Divino", data: "2025-01-19", horario: "17h", local: "Divino", padre: "Padre Ivan" },

    { id: "78-2025-01-19-19h-Matriz", data: "2025-01-19", horario: "18h", local: "Décimo Dia", padre: "Padre Abimael" },

    { id: "90-2025-01-20-09h-Matriz", data: "2025-01-20", horario: "09h", local: "Matriz (Solene)", padre: "Padre Eudásio" },
    { id: "78-2025-01-20-19h-Matriz", data: "2025-01-20", horario: "18h", local: "Encerramento dos Festejos", padre: "Padre Eudásio" },



    { id: "78-2025-01-21-19h-Pirapora", data: "2025-01-21", horario: "19h", local: "Pirapora", padre: "Padre Ivan" },

    { id: "78-2025-01-22-19h-SantosDumont", data: "2025-01-22", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-01-22-19h-Matriz-MissaFamilias", data: "2025-01-22", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },

    { id: "78-2025-01-23-18:30h-Urucara", data: "2025-01-23", horario: "18:30h", local: "Urucará (abertura da festa de N. Sra. das Candeias)", padre: "Padre Eudásio" },
    { id: "78-2025-01-23-MaeRainha", data: "2025-01-23", horario: "", local: "Mãe Rainha", padre: "Padre Ivan" },

    { id: "78-2025-01-24-18h-Horizonte-SantaDulce", data: "2025-01-24", horario: "18h", local: "Horizonte na Comunidade de Santa Dulce (Casamento da Thays)", padre: "Padre Eudásio" },
    { id: "78-2025-01-24-19h-ConegoPinto", data: "2025-01-24", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },

    { id: "78-2025-01-25-17h-SantaDulce", data: "2025-01-25", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "78-2025-01-25-17h-Abrigo", data: "2025-01-25", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-01-25-19h-Matriz", data: "2025-01-25", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-25-19h-OutraBanda", data: "2025-01-25", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },


    { id: "78-2025-01-26-07h-Matriz", data: "2025-01-26", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-26-07h-Divino", data: "2025-01-26", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-01-26-09h-Matriz", data: "2025-01-26", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-01-26-17h-CentroDePastoral", data: "2025-01-26", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-01-26-17h-Divino", data: "2025-01-26", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-01-26-19h-Matriz", data: "2025-01-26", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-01-26-19h-NovoParqueIracema", data: "2025-01-26", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Eudásio" },

    { id: "78-2025-01-28-19h-SaoPedro", data: "2025-01-28", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },

    { id: "78-2025-01-29-19h-MissaFamilias", data: "2025-01-29", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Ivan" },

    { id: "78-2025-02-01-17h-SantaLuzia", data: "2025-02-01", horario: "17h", local: "Santa Luzia", padre: "Padre Eudásio" },
    { id: "78-2025-02-01-17h-SantoAntonio", data: "2025-02-01", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "78-2025-02-01-19h-Matriz", data: "2025-02-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-01-19h-Coite", data: "2025-02-01", horario: "19h", local: "Coité", padre: "Padre Ivan" },


    { id: "78-2025-02-02-07h-Matriz", data: "2025-02-02", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-02-07h-Matriz", data: "2025-02-02", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-02-02-09h-Matriz", data: "2025-02-02", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-02-09h-SaoJose", data: "2025-02-02", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-02-02-17h-CentroDePastoral", data: "2025-02-02", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-02-02-17h-Divino", data: "2025-02-02", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-02-02-19h-Matriz", data: "2025-02-02", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-02-19h-Urucara", data: "2025-02-02", horario: "19h", local: "Urucará", padre: "Padre Ivan" },

    { id: "78-2025-02-04-19h-Vilares", data: "2025-02-04", horario: "19h", local: "Vilares", padre: "Padre Ivan" },

    { id: "78-2025-02-05-19h-Matriz", data: "2025-02-05", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Ivan" },

    { id: "78-2025-02-06-19h-ParqueDasRosas", data: "2025-02-06", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },

    { id: "77-2025-02-07-18h-AnoJubilarMatriz", data: "2025-02-07", horario: "18h", local: "Abertura do Ano Jubilar", padre: "Dom Gregório" },
    { id: "79-2025-02-07-18h-AnoJubilarMatriz", data: "2025-02-07", horario: "18h", local: "Abertura do Ano Jubilar", padre: "Padre Eudásio" },
    { id: "78-2025-02-07-18h-AnoJubileu", data: "2025-02-07", horario: "18h", local: "Abertura do Ano Jubilar", padre: "Padre Ivan" },

    { id: "78-2025-02-08-19h-MissaVotiva", data: "2025-02-08", horario: "19h", local: "Matriz (Missa Votiva de N. Sra. da Penha)", padre: "Padre Eudásio" },

    { id: "78-2025-02-09-07h-Matriz", data: "2025-02-09", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-09-07h-Divino", data: "2025-02-09", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-02-09-09h-Matriz", data: "2025-02-09", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-02-09-17h-CentroDePastoral", data: "2025-02-09", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-02-09-17h-Divino", data: "2025-02-09", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-02-09-19h-MatrizNovoVigario", data: "2025-02-09", horario: "19h", local: "Matriz (Apresentação do Novo Vigário Paroquial)", padre: "Padre Eudásio" },
    { id: "78-2025-02-09-19h-NovoParqueIracema", data: "2025-02-09", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-02-10-28-Ferias", data: "2025-02-10", horario: "28-02-2025", local: "FÉRIAS", padre: "Padre Eudásio" },
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