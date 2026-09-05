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
  { "id": "escalasetembro-joaobatista-2026-09-05-19hs-matriz-1", "data": "2026-09-05", "horario": "19hs", "local": "Matriz", "padre": "Padre João Batista" },

  // --- 06/09 (Domingo) ---
  { "id": "escalasetembro-rafael-2026-09-06-07hs-matriz-1", "data": "2026-09-06", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-joaopedro-2026-09-06-07hs-divino-1", "data": "2026-09-06", "horario": "07hs", "local": "Divino", "padre": "Padre João Pedro" },
  { "id": "escalasetembro-joaopedro-2026-09-06-19hs-matriz-1", "data": "2026-09-06", "horario": "19hs", "local": "Matriz", "padre": "Padre João Pedro" },

  // --- 07/09 (Segunda-feira) ---
  { "id": "escalasetembro-edergilson-2026-09-07-19hs-matriz-1", "data": "2026-09-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Edergilson" },

  // --- 08/09 (Terça-feira) ---
  { "id": "escalasetembro-eudasio-2026-09-08-09hs-matriz-1", "data": "2026-09-08", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "escalasetembro-rafhael-2026-09-08-19hs-matriz-1", "data": "2026-09-08", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafhael" },

  // --- 09/09 (Quarta-feira) ---
  { "id": "escalasetembro-ivan-2026-09-09-19hs-nsdores-1", "data": "2026-09-09", "horario": "19hs", "local": "NS Dores", "padre": "Padre Ivan" },

  // --- 10/09 (Quinta-feira) ---
  { "id": "escalasetembro-ivan-2026-09-10-17hs-matriz-1", "data": "2026-09-10", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-10-19hs-matriz-1", "data": "2026-09-10", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-10-19hs-maerainha-1", "data": "2026-09-10", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Rafael" },

  // --- 11/09 (Sexta-feira) ---
  { "id": "escalasetembro-ivan-2026-09-11-19hs-matriz-1", "data": "2026-09-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-11-19hs-nsgracas-1", "data": "2026-09-11", "horario": "19hs", "local": "NS Graças", "padre": "Padre Rafael" },

  // --- 12/09 (Sábado) ---
  { "id": "escalasetembro-rafael-2026-09-12-16hs-tvgama-1", "data": "2026-09-12", "horario": "16hs", "local": "Tv. Gama", "padre": "Padre Rafael" },
  { "id": "escalasetembro-rafael-2026-09-12-17hs-tvgama-2", "data": "2026-09-12", "horario": "17hs", "local": "Tv. Gama", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-12-17hs-saobenedito-1", "data": "2026-09-12", "horario": "17hs", "local": "São Benedito", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-12-19hs-matriz-1", "data": "2026-09-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-12-19hs-sjbatista-1", "data": "2026-09-12", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },

  // --- 13/09 (Domingo) ---
  { "id": "escalasetembro-ivan-2026-09-13-07hs-matriz-1", "data": "2026-09-13", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-07hs-divino-1", "data": "2026-09-13", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-13-09hs-matriz-1", "data": "2026-09-13", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-09hs-aparecida-1", "data": "2026-09-13", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-13-11hs-vilares-1", "data": "2026-09-13", "horario": "11hs", "local": "Vilares", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-12hs-matriz-1", "data": "2026-09-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-13-1530hs-staedwiges-1", "data": "2026-09-13", "horario": "15:30hs", "local": "Sta. Edwiges", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-16hs-matriz-1", "data": "2026-09-13", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-13-17hs-divino-1", "data": "2026-09-13", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-17hs-nsfatima-1", "data": "2026-09-13", "horario": "17hs", "local": "NS Fátima PSJ", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-13-19hs-nscandeias-1", "data": "2026-09-13", "horario": "19hs", "local": "NS Candeias", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-13-19hs-matriz-1", "data": "2026-09-13", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 15/09 (Terça-feira) ---
  { "id": "escalasetembro-ivan-2026-09-15-19hs-matriz-1", "data": "2026-09-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-15-19hs-nsdores-1", "data": "2026-09-15", "horario": "19hs", "local": "NS Dores", "padre": "Padre Rafael" },

  // --- 16/09 (Quarta-feira) ---
  { "id": "escalasetembro-rafael-2026-09-16-19hs-nspiedade-1", "data": "2026-09-16", "horario": "19hs", "local": "NS Piedade", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-16-19hs-matriz-1", "data": "2026-09-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 17/09 (Quinta-feira) ---
  { "id": "escalasetembro-ivan-2026-09-17-19hs-matriz-1", "data": "2026-09-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 18/09 (Sexta-feira) ---
  { "id": "escalasetembro-ivan-2026-09-18-19hs-matriz-1", "data": "2026-09-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 19/09 (Sábado) ---
  { "id": "escalasetembro-eudasio-2026-09-19-10hs-staluzia-1", "data": "2026-09-19", "horario": "10hs", "local": "Sta. Luzia", "padre": "Padre Eudásio" },
  { "id": "escalasetembro-alexandre-2026-09-19-17hs-matriz-1", "data": "2026-09-19", "horario": "17hs", "local": "Matriz", "padre": "Diácono Alexandre" },
  { "id": "escalasetembro-rafael-2026-09-19-17hs-stoantonio-1", "data": "2026-09-19", "horario": "17hs", "local": "Sto. Antônio", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-19-17hs-staluzia-1", "data": "2026-09-19", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-19-19hs-matriz-1", "data": "2026-09-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-19-19hs-scdejesus-1", "data": "2026-09-19", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Rafael" },

  // --- 20/09 (Domingo) ---
  { "id": "escalasetembro-ivan-2026-09-20-07hs-matriz-1", "data": "2026-09-20", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-20-07hs-divino-1", "data": "2026-09-20", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-20-09hs-matriz-1", "data": "2026-09-20", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-20-09hs-aparecida-1", "data": "2026-09-20", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-20-11hs-saojose-1", "data": "2026-09-20", "horario": "11hs", "local": "São José", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-20-16hs-matriz-1", "data": "2026-09-20", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-20-17hs-divino-1", "data": "2026-09-20", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-20-17hs-nsfatima-1", "data": "2026-09-20", "horario": "17hs", "local": "NS Fátima PSJ", "padre": "Padre Rafael" },
  { "id": "escalasetembro-rafael-2026-09-20-19hs-nscandeias-1", "data": "2026-09-20", "horario": "19hs", "local": "NS Candeias", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-20-19hs-matriz-1", "data": "2026-09-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 21/09 (Segunda-feira) ---
  { "id": "escalasetembro-ivan-2026-09-21-19hs-staterezinha-1", "data": "2026-09-21", "horario": "19hs", "local": "Sta. Terezinha", "padre": "Padre Ivan" },

  // --- 22/09 (Terça-feira) ---
  { "id": "escalasetembro-ivan-2026-09-22-19hs-matriz-1", "data": "2026-09-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 23/09 (Quarta-feira) ---
  { "id": "escalasetembro-adefinir-2026-09-23-19hs-matriz-1", "data": "2026-09-23", "horario": "19hs", "local": "Matriz", "padre": "A definir" },
  { "id": "escalasetembro-ivan-2026-09-23-19hs-nspiedade-1", "data": "2026-09-23", "horario": "19hs", "local": "NS Piedade", "padre": "Padre Ivan" },

  // --- 24/09 (Quinta-feira) ---
  { "id": "escalasetembro-rafael-2026-09-24-19hs-matriz-1", "data": "2026-09-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-24-19hs-pirapora-1", "data": "2026-09-24", "horario": "19hs", "local": "Pirapora", "padre": "Padre Ivan" },

  // --- 25/09 (Sexta-feira) ---
  { "id": "escalasetembro-rafael-2026-09-25-19hs-matriz-1", "data": "2026-09-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 26/09 (Sábado) ---
  { "id": "escalasetembro-rafhael-2026-09-26-10hs-matriz-1", "data": "2026-09-26", "horario": "10hs", "local": "Matriz", "padre": "Padre Rafhael" },
  { "id": "escalasetembro-rafael-2026-09-26-16hs-matriz-1", "data": "2026-09-26", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-26-16hs-tvgama-1", "data": "2026-09-26", "horario": "16hs", "local": "Tv. Gama", "padre": "Padre Ivan" },
  { "id": "escalasetembro-ivan-2026-09-26-17hs-guabiraba-1", "data": "2026-09-26", "horario": "17hs", "local": "Guabiraba", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-26-19hs-matriz-1", "data": "2026-09-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-26-19hs-sjbatista-1", "data": "2026-09-26", "horario": "19hs", "local": "São João Batista", "padre": "Padre Ivan" },

  // --- 27/09 (Domingo) ---
  { "id": "escalasetembro-ivan-2026-09-27-07hs-matriz-1", "data": "2026-09-27", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-27-07hs-divino-1", "data": "2026-09-27", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-27-09hs-matriz-1", "data": "2026-09-27", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-27-09hs-aparecida-1", "data": "2026-09-27", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-27-1530hs-staedwiges-1", "data": "2026-09-27", "horario": "15:30hs", "local": "Sta. Edwiges", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-27-16hs-matriz-1", "data": "2026-09-27", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-27-17hs-divino-1", "data": "2026-09-27", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-27-17hs-nsfatima-1", "data": "2026-09-27", "horario": "17hs", "local": "NS Fátima PSJ", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-27-19hs-nscandeias-1", "data": "2026-09-27", "horario": "19hs", "local": "NS Candeias", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-27-19hs-matriz-1", "data": "2026-09-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },

  // --- 28/09 (Segunda-feira) ---
  // Sem liturgias com padre listado

  // --- 29/09 (Terça-feira) ---
  { "id": "escalasetembro-ivan-2026-09-29-19hs-matriz-1", "data": "2026-09-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalasetembro-rafael-2026-09-29-19hs-saopedro-1", "data": "2026-09-29", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },

  // --- 30/09 (Quarta-feira) ---
  { "id": "escalasetembro-rafael-2026-09-30-19hs-matriz-1", "data": "2026-09-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalasetembro-ivan-2026-09-30-19hs-mororo-1", "data": "2026-09-30", "horario": "19hs", "local": "Mororó", "padre": "Padre Ivan" },

  // --- 01/10 (Quinta-feira) ---
  { "id": "escalaoutubro-ivan-2026-10-01-19hs-matriz-1", "data": "2026-10-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-01-19hs-staterezinha-1", "data": "2026-10-01", "horario": "19hs", "local": "Sta. Terezinha", "padre": "Padre Rafael" },

  // --- 02/10 (Sexta-feira) ---
  { "id": "escalaoutubro-adefinir-2026-10-02-19hs-cp-1", "data": "2026-10-02", "horario": "19hs", "local": "CP", "padre": "A definir" }

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