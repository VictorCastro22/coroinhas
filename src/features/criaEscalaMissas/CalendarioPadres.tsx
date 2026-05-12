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

    // --- 12/05 (Terça-feira) ---
    { "id": "ivan-2026-05-12-17hs-matriz-1", "data": "2026-05-12", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-12-19hs-saopedro-1", "data": "2026-05-12", "horario": "19hs", "local": "São Pedro", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-12-19hs-matriz-1", "data": "2026-05-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-12-19hs-starita-1", "data": "2026-05-12", "horario": "19hs", "local": "Sta. Rita", "padre": "Padre Rafael" }, //

    // --- 13/05 (Quarta-feira) ---
    { "id": "adair-2026-05-13-12hs-matriz-1", "data": "2026-05-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-13-1630hs-matriz-1", "data": "2026-05-13", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-13-18hs-villares-1", "data": "2026-05-13", "horario": "18hs", "local": "Villares", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-13-18hs-pqsaojoao-1", "data": "2026-05-13", "horario": "18hs", "local": "Pq. São João", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-13-19hs-matriz-1", "data": "2026-05-13", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 14/05 (Quinta-feira) ---
    { "id": "ivan-2026-05-14-08hs-matriz-1", "data": "2026-05-14", "horario": "08hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-14-16hs-matriz-1", "data": "2026-05-14", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-14-1830hs-divino-1", "data": "2026-05-14", "horario": "18:30hs", "local": "Divino", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-14-19hs-matriz-1", "data": "2026-05-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-14-19hs-maerainha-1", "data": "2026-05-14", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Adair" }, //

    // --- 15/05 (Sexta-feira) ---
    { "id": "rafael-2026-05-15-17hs-matriz-1", "data": "2026-05-15", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "flavio-2026-05-15-1830hs-divino-1", "data": "2026-05-15", "horario": "19hs", "local": "Divino", "padre": "Padre Flávio" }, //
    { "id": "ivan-2026-05-15-19hs-mororo-1", "data": "2026-05-15", "horario": "19hs", "local": "Mororó", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-15-19hs-matriz-1", "data": "2026-05-15", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 16/05 (Sábado) ---
    { "id": "ivan-2026-05-16-17hs-matriz-1", "data": "2026-05-16", "horario": "17hs", "local": "Matriz (Casamento)", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-16-17hs-staluzia-1", "data": "2026-05-16", "horario": "17hs", "local": "Sta. Luzia", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-16-17hs-stafe-1", "data": "2026-05-16", "horario": "17hs", "local": "Pq. Sta. Fé", "padre": "Padre Adair" }, //
    { "id": "adair-2026-05-16-19hs-matriz-1", "data": "2026-05-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-16-19hs-scjcoite-1", "data": "2026-05-16", "horario": "19hs", "local": "SCJ Coité", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-16-19hs-divino-1", "data": "2026-05-16", "horario": "19hs", "local": "Divino", "padre": "Padre Rafael" }, //

    // --- 17/05 (Domingo) ---
    { "id": "ivan-2026-05-17-07hs-matriz-1", "data": "2026-05-17", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-17-07hs-divino-1", "data": "2026-05-17", "horario": "07hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-05-17-09hs-matriz-1", "data": "2026-05-17", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-17-09hs-aparecida-1", "data": "2026-05-17", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-17-09hs-saojose-1", "data": "2026-05-17", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-17-10hs-matriz-1", "data": "2026-05-17", "horario": "10hs", "local": "Matriz (Batizados)", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-17-17hs-rosario-1", "data": "2026-05-17", "horario": "17hs", "local": "Rosário (Juventude)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-17-17hs-pqsaojoao-1", "data": "2026-05-17", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-17-17hs-divino-1", "data": "2026-05-17", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-05-17-19hs-matriz-1", "data": "2026-05-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-17-19hs-urucara-1", "data": "2026-05-17", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-17-19hs-starita-1", "data": "2026-05-17", "horario": "19hs", "local": "Sta. Rita", "padre": "Padre Ivan" }, //

    { "id": "diego-2026-05-18-19hs-divino-1", "data": "2026-05-18", "horario": "19hs", "local": "Divino", "padre": "Padre Diego" }, //

    // --- 19/05 (Terça-feira) ---
    { "id": "ivan-2026-05-19-17hs-matriz-1", "data": "2026-05-19", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-05-19-19hs-matriz-1", "data": "2026-05-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-19-19hs-nspiedade-1", "data": "2026-05-19", "horario": "19hs", "local": "NS Piedade", "padre": "Padre Rafael" }, //

    // --- 20/05 (Quarta-feira) ---
    { "id": "nonato-2026-05-20-19hs-divino-1", "data": "2026-05-20", "horario": "19hs", "local": "Divino", "padre": "Padre Nonato" }, //
    { "id": "rafael-2026-05-20-1630hs-matriz-1", "data": "2026-05-20", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-20-19hs-matriz-1", "data": "2026-05-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //

    // --- 21/05 (Quinta-feira) ---
    { "id": "augusto-2026-05-20-19hs-divino-1", "data": "2026-05-21", "horario": "19hs", "local": "Divino", "padre": "Padre Augusto" }, //
    { "id": "rafael-2026-05-21-19hs-matriz-1", "data": "2026-05-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-21-19hs-nsdores-1", "data": "2026-05-21", "horario": "19hs", "local": "NS Dores", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-21-19hs-saobenedito-1", "data": "2026-05-21", "horario": "19hs", "local": "São Benedito", "padre": "Padre Adair" }, //

    // --- 22/05 (Sexta-feira) ---
    { "id": "maciel-2026-05-22-19hs-divino-1", "data": "2026-05-22", "horario": "19hs", "local": "Divino", "padre": "Padre Rafhael Maciel" }, //
    { "id": "ivan-2026-05-22-19hs-matriz-1", "data": "2026-05-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-22-19hs-nsgracas-1", "data": "2026-05-22", "horario": "19hs", "local": "NS Graças", "padre": "Padre Rafael" }, //

    // --- 23/05 (Sábado) ---
    { "id": "rafael-2026-05-23-17hs-matriz-1", "data": "2026-05-23", "horario": "17hs", "local": "Matriz (Casamento)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-23-19hs-matriz-1", "data": "2026-05-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-23-19hs-outrabanda-1", "data": "2026-05-23", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-23-19hs-divino-1", "data": "2026-05-23", "horario": "19hs", "local": "Divino", "padre": "Padre Rafael" }, //

    // --- 24/05 (Domingo) ---
    { "id": "adair-2026-05-24-07hs-matriz-1", "data": "2026-05-24", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-24-07hs-divino-1", "data": "2026-05-24", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-24-09hs-matriz-1", "data": "2026-05-24", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-24-09hs-aparecida-1", "data": "2026-05-24", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-24-09hs-saojose-1", "data": "2026-05-24", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-24-10hs-matriz-1", "data": "2026-05-24", "horario": "10hs", "local": "Matriz (Batizados)", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-24-1530hs-sdumont-1", "data": "2026-05-24", "horario": "15:30hs", "local": "S. Dumont", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-24-17hs-rosario-1", "data": "2026-05-24", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-05-24-17hs-pqsaojoao-1", "data": "2026-05-24", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-24-17hs-divino-1", "data": "2026-05-24", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-05-24-19hs-matriz-1", "data": "2026-05-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-24-19hs-urucara-1", "data": "2026-05-24", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, //

    // --- 26/05 (Terça-feira) ---
    { "id": "ivan-2026-05-26-17hs-matriz-1", "data": "2026-05-26", "horario": "17hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-26-19hs-matriz-1", "data": "2026-05-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-26-19hs-staterezinha-1", "data": "2026-05-26", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" }, //

    // --- 27/05 (Quarta-feira) ---
    { "id": "adair-2026-05-27-0830hs-sec-1", "data": "2026-05-27", "horario": "08:30hs", "local": "Secretaria Paroquial", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-27-1630hs-matriz-1", "data": "2026-05-27", "horario": "16:30hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-27-19hs-matriz-1", "data": "2026-05-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 28/05 (Quinta-feira) ---
    { "id": "adair-rafael-2026-05-28-0830hs-enfermos-1", "data": "2026-05-28", "horario": "08:30hs", "local": "Visita aos Enfermos", "padre": "Padre Adair e Padre Rafael" }, //
    { "id": "adair-2026-05-28-16hs-matriz-1", "data": "2026-05-28", "horario": "16hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-28-19hs-matriz-1", "data": "2026-05-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-28-19hs-maerainha-1", "data": "2026-05-28", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Rafael" }, //

    // --- 29/05 (Sexta-feira) ---
    { "id": "rafael-2026-05-29-17hs-matriz-1", "data": "2026-05-29", "horario": "17hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-29-19hs-matriz-1", "data": "2026-05-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 30/05 (Sábado) ---
    { "id": "adair-2026-05-30-19hs-matriz-1", "data": "2026-05-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 31/05 (Domingo) ---
    { "id": "adair-2026-05-31-07hs-matriz-1", "data": "2026-05-31", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-31-07hs-divino-1", "data": "2026-05-31", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-05-31-09hs-matriz-1", "data": "2026-05-31", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-05-31-09hs-aparecida-1", "data": "2026-05-31", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-05-31-17hs-rosario-1", "data": "2026-05-31", "horario": "17hs", "local": "Rosário", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-05-31-17hs-pqsaojoao-1", "data": "2026-05-31", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-05-31-17hs-divino-1", "data": "2026-05-31", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-05-31-19hs-matriz-1", "data": "2026-05-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-05-31-19hs-urucara-1", "data": "2026-05-31", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" } //    

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