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
    { id: "78-2025-04-02-19h-Matriz", data: "2025-04-02", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-02-19h-Guabiraba", data: "2025-04-02", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-04-03-19h-Matriz", data: "2025-04-03", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "78-2025-04-03-19h-Guabiraba", data: "2025-04-03", horario: "19h", local: "Mororó", padre: "Padre Ivan" },

    { id: "78-2025-04-04-18h-CP", data: "2025-04-04", horario: "18h30", local: "Centro Pastoral (Primeira sexta)", padre: "Padre Eudásio" },
    { id: "78-2025-04-04-18h-CP2", data: "2025-04-04", horario: "18h30", local: "Centro Pastoral (Primeira sexta)", padre: "Padre Rafael" },

    { id: "78-2025-04-05-17h-SantoAntonio", data: "2025-04-05", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-04-05-17h-SantaLuzia", data: "2025-04-05", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "78-2025-04-05-19h-Coite", data: "2025-04-05", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "78-2025-04-05-19h-Matriz", data: "2025-04-05", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-05-19h-BatismoDivino", data: "2025-04-05", horario: "19h", local: "Batismo no Divino", padre: "Padre Rafael" },

    { id: "78-2025-04-06-07h-Matriz", data: "2025-04-06", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-07h-Divino", data: "2025-04-06", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-06-09h-Matriz", data: "2025-04-06", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-09h-SaoJose", data: "2025-04-06", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-04-06-10h30-BatismoMatriz", data: "2025-04-06", horario: "10h30", local: "Batismo na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-06-17h-CentroPastoral", data: "2025-04-06", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-17h-Divino", data: "2025-04-06", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-06-17h-PqSaoJoao", data: "2025-04-06", horario: "17h", local: "Parque São João com Batismo", padre: "Padre Rafael" },
    { id: "78-2025-04-06-19h-NPIracema", data: "2025-04-06", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "78-2025-04-06-19h-Matriz", data: "2025-04-06", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-04-08-19h-Matriz", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Eudásio" },
    { id: "78-2025-04-08-19h-Matriz2", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Rafael" },
    { id: "78-2025-04-08-19h-Matriz3", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Ivan" },

    { id: "78-2025-04-09-19h-MissaFamilias", data: "2025-04-09", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },
    { id: "78-2025-04-09-19h-SantosDumont", data: "2025-04-09", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-04-11-19h-MatrizJubilar", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Eudásio" },
    { id: "78-2025-04-11-19h-MatrizJubilar2", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Rafael" },
    { id: "78-2025-04-11-19h-MatrizJubilar3", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Ivan" },

    { id: "78-2025-04-12-19h-Matriz", data: "2025-04-12", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-12-19h-OutraBanda", data: "2025-04-12", horario: "18h", local: "Outra Banda", padre: "Padre Eudásio" },
    { id: "78-2025-04-12-19h-BatismoOutraBanda", data: "2025-04-12", horario: "19h", local: "Batismo na Outra Banda", padre: "Padre Rafael" },

    { id: "78-2025-04-13-07h-Matriz", data: "2025-04-13", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-07h-Abrigo", data: "2025-04-13", horario: "07h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-04-13-07h-Divino", data: "2025-04-13", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-13-09h-Matriz", data: "2025-04-13", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-09h-BatismoCoite", data: "2025-04-13", horario: "09h", local: "Batismo no Coité", padre: "Padre Rafael" },
    { id: "78-2025-04-13-12h-Matriz", data: "2025-04-13", horario: "12h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-13-15h30-Vilares", data: "2025-04-13", horario: "15h30", local: "Vilares", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-17h-CentroPastoral", data: "2025-04-13", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-17h-PqSaoJoao", data: "2025-04-13", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-04-13-17h-Divino", data: "2025-04-13", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-13-19h-Matriz", data: "2025-04-13", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-13-19h-NPIracema", data: "2025-04-13", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-04-14-19h-Matriz", data: "2025-04-14", horario: "19h", local: "Matriz - Via sacra", padre: "Padre Eudásio" },
    { id: "78-2025-04-15-19h-Matriz", data: "2025-04-15", horario: "19h", local: "Matriz - Via sacra", padre: "Padre Eudásio" },
    { id: "78-2025-04-16-19h-Matriz", data: "2025-04-16", horario: "19h", local: "Matriz - Queima dos pecados", padre: "Padre Eudásio" },

    { id: "78-2025-04-17-19h-Matriz", data: "2025-04-17", horario: "19h", local: "Matriz - Santa Ceia e Lava pés", padre: "Padre Eudásio" },
    { id: "78-2025-04-17-19h-Divino", data: "2025-04-17", horario: "19h", local: "Divino - Santa Ceia e Lava pés", padre: "Padre Roberto" },
    { id: "78-2025-04-17-19h-NossaSenhoraParqueIracema", data: "2025-04-17", horario: "19h", local: "Novo Parque Iracema - Santa Ceia e Lava pés", padre: "Padre Rafael" },
    { id: "78-2025-04-17-19h-PqSaoJoao", data: "2025-04-17", horario: "19h", local: "Parque São João - Santa Ceia e Lava pés", padre: "Padre Ivan" },


    { id: "78-2025-04-18-15h-PaixaoMatriz", data: "2025-04-18", horario: "15h", local: "Matriz - Paixão e Morte do Senhor", padre: "Padre Eudásio" },
    { id: "78-2025-04-18-15h-PaixaoDivino", data: "2025-04-18", horario: "15h", local: "Divino - Paixão e Morte do Senhor", padre: "Padre Roberto" },
    { id: "78-2025-04-18-15h-NossaSenhoraParqueIracema", data: "2025-04-18", horario: "15h", local: "Novo Parque Iracema - Paixão e Morte do Senhor", padre: "Padre Rafael" },
    { id: "78-2025-04-18-15h-PaixaoPqSaoJoao", data: "2025-04-18", horario: "15h", local: "Parque São João - Paixão e Morte do Senhor", padre: "Padre Ivan" },

    { id: "78-2025-04-19-19h-Matriz", data: "2025-04-19", horario: "19h", local: "Matriz - Vigília Pascal", padre: "Padre Eudásio" },
    { id: "78-2025-04-19-19h-Divino", data: "2025-04-19", horario: "19h", local: "Divino - Vigília Pascal", padre: "Padre Roberto" },
    { id: "78-2025-04-19-19h-NossaSenhoraParqueIracema", data: "2025-04-19", horario: "19h", local: "Novo Parque Iracema - Vigília Pascal", padre: "Padre Rafael" },
    { id: "78-2025-04-19-19h-PqSaoJoao", data: "2025-04-19", horario: "19h", local: "Parque São João - Vigília Pascal", padre: "Padre Ivan" },

    { id: "78-2025-04-20-07h-Matriz", data: "2025-04-20", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-20-07h-Divino", data: "2025-04-20", horario: "07h", local: "Divino", padre: "Padre Roberto" },
    { id: "78-2025-04-20-09h-NovoParqueIracema", data: "2025-04-20", horario: "09h", local: "Batizado Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-04-20-09h-SaoJose", data: "2025-04-20", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-04-20-09h-Matriz", data: "2025-04-20", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-20-17h-Divino", data: "2025-04-20", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-20-17h-PqSaoJoao", data: "2025-04-20", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-04-20-17h-CentroPastoral", data: "2025-04-20", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-20-19h-NovoParqueIracema", data: "2025-04-20", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-04-20-19h-Matriz", data: "2025-04-20", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    
    { id: "78-2025-04-22-19h-SerraPelada", data: "2025-04-22", horario: "19h", local: "Serra Pelada", padre: "Padre Rafael" },

    { id: "78-2025-04-23-19h-SantaCecilia", data: "2025-04-23", horario: "19h", local: "Santa Cecília", padre: "Padre Ivan" },
    { id: "78-2025-04-23-19h-Matriz", data: "2025-04-23", horario: "19h", local: "Matriz - Missa pelas familias", padre: "Convidado" },

    { id: "78-2025-04-24-19h-MaeRainha", data: "2025-04-24", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-04-24-19h-CampoDelta", data: "2025-04-24", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "78-2025-04-25-19h-ConegoPinto", data: "2025-04-25", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "78-2025-04-25-19h-Rosario", data: "2025-04-25", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "78-2025-04-26-17h-Abrigo", data: "2025-04-26", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-04-26-17h-SantaDulce", data: "2025-04-26", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "78-2025-04-26-19h-OutraBanda", data: "2025-04-26", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "78-2025-04-26-19h-Matriz", data: "2025-04-26", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-04-27-07h-Matriz", data: "2025-04-27", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-27-07h-Divino", data: "2025-04-27", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-27-09h-Matriz", data: "2025-04-27", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-15h30-SantosDumont", data: "2025-04-27", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-17h-Divino", data: "2025-04-27", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-27-17h-CentroPastoral", data: "2025-04-27", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-04-27-17h-PqSaoJoao", data: "2025-04-27", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-19h-Matriz", data: "2025-04-27", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-19h-NovoParqueIracema", data: "2025-04-27", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    
    { id: "78-2025-04-30-19h-Matriz", data: "2025-04-30", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" }

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