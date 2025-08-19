import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import ModalAddCoroinha from "../../components/ModalAddCoroinha";
import coroinhas from "../../dados/coroinhas";
import { Coroinha } from "../../types/coroinhas";




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

    { id: "80-2025-08-19-19h-Urucara", data: "2025-08-19", horario: "19h", local: "Urucará", padre: "Padre Eudásio" },
    { id: "80-2025-08-19-19h-PlanaltoCajueiros", data: "2025-08-19", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Ivan" },
    { id: "80-2025-08-19-19h-Matriz", data: "2025-08-19", horario: "19h", local: "Matriz", padre: "Padre Nonato" },

    { id: "80-2025-08-20-19h-Guabiraba", data: "2025-08-20", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "80-2025-08-20-19h-MissaFamilias", data: "2025-08-20", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "80-2025-08-21-19h-AreaSeca", data: "2025-08-21", horario: "19h", local: "Área Seca", padre: "Padre Ivan" },
    { id: "80-2025-08-21-19h-Tangueira", data: "2025-08-21", horario: "19h", local: "Tangueira", padre: "Padre Rafael" },

    { id: "80-2025-08-22-19h-Rosario", data: "2025-08-22", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "80-2025-08-22-19h-ConegoPinto", data: "2025-08-22", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },

    { id: "80-2025-08-23-17h-Abrigo", data: "2025-08-23", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "80-2025-08-23-17h-SantaDulce", data: "2025-08-23", horario: "17h", local: "Santa Dulce", padre: "Padre Rafael" },
    { id: "80-2025-08-23-19h-MatrizBodasOuro", data: "2025-08-23", horario: "19h", local: "Matriz (Bodas de Ouro)", padre: "Padre Eudásio" },
    { id: "80-2025-08-23-19h-OutraBanda", data: "2025-08-23", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "80-2025-08-24-07h-Matriz", data: "2025-08-24", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "80-2025-08-24-07h-Divino", data: "2025-08-24", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "80-2025-08-24-09h-Matriz", data: "2025-08-24", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "80-2025-08-24-15h30-SantosDumont", data: "2025-08-24", horario: "15h30", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "80-2025-08-24-17h-CentroPastoral", data: "2025-08-24", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "80-2025-08-24-17h-Divino", data: "2025-08-24", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "80-2025-08-24-17h-PqSaoJoao", data: "2025-08-24", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "80-2025-08-24-19h-MatrizPascom", data: "2025-08-24", horario: "19h", local: "Matriz (Investidura da Pascom)", padre: "Padre Eudásio" },
    { id: "80-2025-08-24-19h-NovoPqIracema", data: "2025-08-24", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "80-2025-08-26-19h-SerraPelada", data: "2025-08-26", horario: "19h", local: "Serra Pelada", padre: "Padre Eudásio" },
    { id: "80-2025-08-26-19h-SaoPedro", data: "2025-08-26", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "80-2025-08-27-19h-MissaFamilias", data: "2025-08-27", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },
    { id: "80-2025-08-27-19h-SantosDumont", data: "2025-08-27", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "80-2025-08-28-19h-CampoAsaDelta", data: "2025-08-28", horario: "19h", local: "Campo do Asa Delta", padre: "Padre Rafael" },
    { id: "80-2025-08-28-19h-MaeRainha", data: "2025-08-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },

    { id: "80-2025-08-29-18h-AberturaPenha", data: "2025-08-29", horario: "18h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Eudásio" },

    { id: "80-2025-08-30-19h-SantaMissaPeGuedes", data: "2025-08-30", horario: "19h", local: "Santa Missa", padre: "Padre Guedes" },

    { id: "80-2025-08-31-07h-Divino", data: "2025-08-31", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "80-2025-08-31-09h-Matriz", data: "2025-08-31", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "80-2025-08-31-19h-MissaPeDiego", data: "2025-08-31", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Diego" },

    { id: "80-2025-09-01-19h-MissaPeEdmilton", data: "2025-09-01", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Edmilton" },

    { id: "80-2025-09-02-19h-MissaPeJoaoPaulo", data: "2025-09-02", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre João Paulo" },

    { id: "80-2025-09-03-19h-MissaPeItaloPeRafael", data: "2025-09-03", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Ítalo Dias" },

    { id: "80-2025-09-04-19h-MissaPeAurenio", data: "2025-09-04", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Aurênio" },

    { id: "80-2025-09-05-19h-MissaPeEdmilsonPeRafael", data: "2025-09-05", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Edmilson" },

    { id: "80-2025-09-06-19h-MissaPeFrancisco", data: "2025-09-06", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Padre Francisco" },

    { id: "80-2025-09-07-07h-Divino", data: "2025-09-07", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "80-2025-09-07-09h-Matriz", data: "2025-09-07", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "80-2025-09-07-19h-MissaDomGregorio", data: "2025-09-07", horario: "19h", local: "Festejos - Nossa Senhora da Penha", padre: "Dom Gregório" },

    { id: "80-2025-09-08-06h-CaminhadaHorto", data: "2025-09-08", horario: "06h", local: "Caminhada e Santa Missa", padre: "Padre Eudásio" },
    { id: "80-2025-09-08-09h-MatrizSolene", data: "2025-09-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "80-2025-09-08-18h-ProcissaoEncerramento", data: "2025-09-08", horario: "18h", local: "Encerramento dos Festejos", padre: "Padre Eudásio" },

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
              coroinhasDaMissa={selectedCard ? (coroinhasData[selectedCard] || []) : []} 
              onSubmit={handleSubmitCoroinha}
              onClose={() => setSelectedCard(null)}
              selectedCoroinha={selectedCoroinha}
              setSelectedCoroinha={setSelectedCoroinha}
              selectedFuncao={selectedFuncao}
              setSelectedFuncao={setSelectedFuncao}
              selectionCounts={selectionCounts} 
            />

      
          </div>
        );
      };

export default CalendarioPadres;