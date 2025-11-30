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
    { "id": "208-2025-11-28-19hs-ConegoPinto", "data": "2025-11-28", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
    { "id": "209-2025-11-28-19hs-Rosario", "data": "2025-11-28", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },
    { "id": "210-2025-11-29-19hs-Matriz", "data": "2025-11-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "211-2025-11-29-19hs-SaoBenedito", "data": "2025-11-29", "horario": "19hs", "local": "São Benedito", "padre": "Padre Rafael" },
    { "id": "212-2025-11-30-07hs-Divino", "data": "2025-11-30", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "213-2025-11-30-07hs-Matriz", "data": "2025-11-30", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "214-2025-11-30-09hs-Matriz", "data": "2025-11-30", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "215-2025-11-30-17hs-CentrodePastoral", "data": "2025-11-30", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "216-2025-11-30-17hs-PqSaoJoao", "data": "2025-11-30", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "217-2025-11-30-17hs-Divino", "data": "2025-11-30", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "218-2025-11-30-19hs-Matriz", "data": "2025-11-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "219-2025-11-30-19hs-NPqIracema", "data": "2025-11-30", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },
    
    // --- 01/12/2025 ---
    { "id": "ivan-2025-12-01-19hs-columijuba", "data": "2025-12-01", "horario": "19hs", "local": "Columijuba", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-01-19hs-serpa", "data": "2025-12-01", "horario": "19hs", "local": "Serpa (N. Sra. da Conceição)", "padre": "Padre Eudásio" },

    // --- 02/12/2025 ---
    { "id": "ivan-2025-12-02-19hs-urucara", "data": "2025-12-02", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-02-19hs-vilares", "data": "2025-12-02", "horario": "19hs", "local": "Vilares", "padre": "Padre Eudásio" },

    // --- 03/12/2025 ---
    { "id": "eudasio-2025-12-03-08hs-secretaria", "data": "2025-12-03", "horario": "08hs", "local": "Secretaria Paroquial", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-03-17hs-matriz", "data": "2025-12-03", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-03-19hs-matriz", "data": "2025-12-03", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-03-19hs-santaluzia", "data": "2025-12-03", "horario": "19hs", "local": "Santa Luzia (Festa)", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-03-19hs-pavuna", "data": "2025-12-03", "horario": "19hs", "local": "Pavuna", "padre": "Padre Eudásio" },

    // --- 04/12/2025 ---
    { "id": "ivan-2025-12-04-08hs-matriz", "data": "2025-12-04", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-04-19hs-pqrosas", "data": "2025-12-04", "horario": "19hs", "local": "Parque das Rosas", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-04-19hs-mororo", "data": "2025-12-04", "horario": "19hs", "local": "Mororó", "padre": "Padre Ivan" },

    // --- 05/12/2025 ---
    { "id": "rafael-2025-12-05-08hs-visita", "data": "2025-12-05", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-05-08hs-secretaria", "data": "2025-12-05", "horario": "08hs", "local": "Secretaria Paroquial", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-05-1830hs-centropastoral", "data": "2025-12-05", "horario": "18:30hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-05-19hs-centropastoral", "data": "2025-12-05", "horario": "19hs", "local": "Centro de Pastoral (Adoração)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-05-19hs-lages", "data": "2025-12-05", "horario": "19hs", "local": "Lages", "padre": "Padre Ivan" },

    // --- 06/12/2025 ---
    { "id": "rafael-2025-12-06-17hs-santaluzia", "data": "2025-12-06", "horario": "17hs", "local": "Santa Luzia (Festa)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-06-17hs-santoantonio", "data": "2025-12-06", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-06-17hs-conselho", "data": "2025-12-06", "horario": "17hs", "local": "Conselho Econômico", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-06-19hs-coite", "data": "2025-12-06", "horario": "19hs", "local": "Coité", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-06-19hs-matriz", "data": "2025-12-06", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-06-20hs-matriz", "data": "2025-12-06", "horario": "20hs", "local": "Matriz (Casamento)", "padre": "Padre Eudásio" },

    // --- 07/12/2025 ---
    { "id": "rafael-2025-12-07-07hs-divino", "data": "2025-12-07", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-07-07hs-matriz", "data": "2025-12-07", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2025-12-07-09hs-saojose", "data": "2025-12-07", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-07-09hs-matriz", "data": "2025-12-07", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rino-2025-12-07-17hs-santaluzia", "data": "2025-12-06", "horario": "17hs", "local": "Santa Luzia (Festa)", "padre": "Padre Rino" },
    { "id": "rafael-2025-12-07-17hs-pqsaojoao", "data": "2025-12-07", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-07-17hs-divino", "data": "2025-12-07", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-07-17hs-centropastoral", "data": "2025-12-07", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-07-19hs-matriz", "data": "2025-12-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-07-19hs-npqiracema", "data": "2025-12-07", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 08/12/2025 ---
    { "id": "rafael-2025-12-08-05hs-pajucara", "data": "2025-12-08", "horario": "05hs", "local": "Pajuçara", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-08-19hs-croata", "data": "2025-12-08", "horario": "19hs", "local": "Croatá de Ocara", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-08-19hs-matriz", "data": "2025-12-08", "horario": "19hs", "local": "Matriz (Missa votiva N. Sra. da Penha)", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-08-19hs-boqueirao", "data": "2025-12-08", "horario": "19hs", "local": "Boqueirão", "padre": "Padre Eudásio" },

    // --- 09/12/2025 ---
    { "id": "ivan-2025-12-09-00hs-caninde", "data": "2025-12-09", "horario": "00hs", "local": "Canindé", "padre": "Padre Ivan" },
    { "id": "jp-2025-12-09-19hs-santaluzia", "data": "2025-12-09", "horario": "19hs", "local": "Santa Luzia (Festa)", "padre": "Padre João Pedro" },
    { "id": "rafael-2025-12-09-19hs-baixagrande", "data": "2025-12-09", "horario": "19hs", "local": "Baixa Grande de Ocara", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-09-19hs-santaluziamucuna", "data": "2025-12-09", "horario": "19hs", "local": "Santa Luzia (Mucunã)", "padre": "Padre Eudásio" },

    // --- 10/12/2025 ---
    { "id": "rafael-2025-12-10-17hs-matriz", "data": "2025-12-10", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" },
    { "id": "flavio-2025-12-10-19hs-santaluzia", "data": "2025-12-10", "horario": "19hs", "local": "Santa Luzia (Festa)", "padre": "Padre Flávio" },
    { "id": "rafael-2025-12-10-19hs-matriz", "data": "2025-12-10", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-10-19hs-santosdumont", "data": "2025-12-10", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-10-19hs-santaluziacarrapato", "data": "2025-12-10", "horario": "19hs", "local": "Santa Luzia (Carrapato)", "padre": "Padre Eudásio" },

    // --- 11/12/2025 ---
    { "id": "ivan-2025-12-11-08hs-matriz", "data": "2025-12-11", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" },
    { "id": "john-2025-12-11-19hs-santaluzia", "data": "2025-12-11", "horario": "19hs", "local": "Santa Luzia (Festa)", "padre": "Padre John Lennon" },
    { "id": "rafael-2025-12-11-19hs-lagesmpe", "data": "2025-12-11", "horario": "19hs", "local": "Lages MPE", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-11-19hs-pirapora", "data": "2025-12-11", "horario": "19hs", "local": "Pirapora", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-11-19hs-maerainha", "data": "2025-12-11", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },

    // --- 12/12/2025 ---
    { "id": "rafael-2025-12-12-08hs-visita", "data": "2025-12-12", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-12-08hs-visita", "data": "2025-12-12", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-12-18hs-centropastoral", "data": "2025-12-12", "horario": "18hs", "local": "Centro de Pastoral (Caminhada)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-12-18hs-centropastoral", "data": "2025-12-12", "horario": "18hs", "local": "Centro de Pastoral (Conclusão sextas jubilares)", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-12-18hs-centropastoral", "data": "2025-12-12", "horario": "18hs", "local": "Centro de Pastoral (Peregrinação)", "padre": "Padre Eudásio" },
    { "id": "ivan-2025-12-12-1830hs-caminhada", "data": "2025-12-12", "horario": "18:30hs", "local": "Caminhada para Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-12-19hs-matriz", "data": "2025-12-12", "horario": "19hs", "local": "Matriz (Co-celebração Jubilar)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-12-19hs-matriz", "data": "2025-12-12", "horario": "19hs", "local": "Matriz (Co-celebração)", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-12-19hs-matriz", "data": "2025-12-12", "horario": "19hs", "local": "Matriz (Co-celebração Jubilar)", "padre": "Padre Eudásio" },

    // --- 13/12/2025 ---
    { "id": "padre-2025-12-13-09hs-santaluzia", "data": "2025-12-13", "horario": "09hs", "local": "Santa Luzia", "padre": "Padre" },
    { "id": "ivan-2025-12-13-12hs-matriz", "data": "2025-12-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-13-17hs-vilares", "data": "2025-12-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-13-17hs-saojose", "data": "2025-12-13", "horario": "17hs", "local": "São José", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-13-19hs-santaluzia", "data": "2025-12-13", "horario": "19hs", "local": "Santa Luzia", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-13-19hs-matriz", "data": "2025-12-13", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-13-19hs-outrabanda", "data": "2025-12-13", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-13-20hs-matriz", "data": "2025-12-13", "horario": "20hs", "local": "Matriz (Matrimônio)", "padre": "Padre Rafael" },

    // --- 14/12/2025 ---
    { "id": "rafael-2025-12-14-07hs-abrigo", "data": "2025-12-14", "horario": "07hs", "local": "Abrigo", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-14-07hs-divino", "data": "2025-12-14", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-14-07hs-matriz", "data": "2025-12-14", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-14-09hs-matriz", "data": "2025-12-14", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-14-10hs-matriz", "data": "2025-12-14", "horario": "10hs", "local": "Matriz (Casamento)", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-14-1030hs-ecc", "data": "2025-12-14", "horario": "10:30hs", "local": "Confraternização com o ECC", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-14-17hs-centropastoral", "data": "2025-12-14", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-14-17hs-pqsaojoao", "data": "2025-12-14", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-14-17hs-divino", "data": "2025-12-14", "horario": "17hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-14-19hs-matriz", "data": "2025-12-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-14-19hs-npqiracema", "data": "2025-12-14", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 15/12/2025 ---
    { "id": "rafael-2025-12-15-19hs-fortaleza", "data": "2025-12-15", "horario": "19hs", "local": "Fortaleza", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-15-19hs-saojoao", "data": "2025-12-15", "horario": "19hs", "local": "São João do Amanari (Placa)", "padre": "Padre Eudásio" },

    // --- 16/12/2025 ---
    { "id": "eudasio-2025-12-16-08hs-amine", "data": "2025-12-16", "horario": "08hs", "local": "Coordenação da Amine/Mpe", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-16-19hs-urucara", "data": "2025-12-16", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-16-19hs-planaltocajueiros", "data": "2025-12-16", "horario": "19hs", "local": "Planalto dos Cajueiros", "padre": "Padre Ivan" },

    // --- 17/12/2025 ---
    { "id": "rafael-2025-12-17-17hs-matriz", "data": "2025-12-17", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-17-19hs-matriz", "data": "2025-12-17", "horario": "19hs", "local": "Matriz (Missa pelas famílias)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-17-19hs-guabiraba", "data": "2025-12-17", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },

    // --- 18/12/2025 ---
    { "id": "ivan-2025-12-18-08hs-matriz", "data": "2025-12-18", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-18-19hs-edsonqueiroz", "data": "2025-12-18", "horario": "19hs", "local": "Confissões no Edson Queiroz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-18-19hs-tangueira", "data": "2025-12-18", "horario": "19hs", "local": "Tangueira", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-18-19hs-pqrosas", "data": "2025-12-18", "horario": "19hs", "local": "Parque das Rosas", "padre": "Padre Eudásio" },

    // --- 19/12/2025 ---
    { "id": "eudasio-2025-12-19-08hs-visita", "data": "2025-12-19", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
    { "id": "ivan-2025-12-19-19hs-areaverde", "data": "2025-12-19", "horario": "19hs", "local": "Área Verde", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-19-19hs-matriz", "data": "2025-12-19", "horario": "19hs", "local": "Matriz (38 anos de Vida Sacerdotal)", "padre": "Padre Eudásio" },

    // --- 20/12/2025 ---
    { "id": "eudasio-2025-12-20-08hs-formacao", "data": "2025-12-20", "horario": "08hs", "local": "Formação Missionária", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-20-17hs-santadulce", "data": "2025-12-20", "horario": "17hs", "local": "Santa Dulce (Matrimônio)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-20-17hs-santaluzia", "data": "2025-12-20", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-20-17hs-santoantonio", "data": "2025-12-20", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-20-19hs-matriz", "data": "2025-12-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-20-19hs-coite", "data": "2025-12-20", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-20-20hs-centropastoral", "data": "2025-12-20", "horario": "20hs", "local": "Centro de Pastoral (Alto do Natal)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-20-20hs-centropastoral", "data": "2025-12-20", "horario": "20hs", "local": "Centro de Pastoral (Alto do Natal)", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-20-20hs-penha", "data": "2025-12-20", "horario": "20hs", "local": "Empresa da Penha", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-20-20hs-centropastoral", "data": "2025-12-20", "horario": "20hs", "local": "Centro de Pastoral (Alto do Natal)", "padre": "Padre Eudásio" },

    // --- 21/12/2025 ---
    { "id": "rafael-2025-12-21-07hs-matriz", "data": "2025-12-21", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-21-07hs-divino", "data": "2025-12-21", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "rafael-2025-12-21-09hs-saojose", "data": "2025-12-21", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-21-09hs-matriz", "data": "2025-12-21", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-21-17hs-divino", "data": "2025-12-21", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-21-17hs-pqsaojoao", "data": "2025-12-21", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-21-17hs-centropastoral", "data": "2025-12-21", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "ivan-2025-12-21-19hs-npqiracema", "data": "2025-12-21", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-21-19hs-matriz", "data": "2025-12-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 22/12/2025 ---
    { "id": "rafael-2025-12-22-0830hs-confraternizacao", "data": "2025-12-22", "horario": "08:30hs", "local": "Confraternização do Clero", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-22-0830hs-confraternizacao", "data": "2025-12-22", "horario": "08:30hs", "local": "Confraternização do Clero", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-22-19hs-ordenacoes", "data": "2025-12-22", "horario": "19hs", "local": "Ordenações", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-22-19hs-ordenacoes", "data": "2025-12-22", "horario": "19hs", "local": "Ordenações", "padre": "Padre Eudásio" },

    // --- 23/12/2025 ---
    { "id": "rafael-2025-12-23-19hs-saopedro", "data": "2025-12-23", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-23-19hs-fortaleza", "data": "2025-12-23", "horario": "19hs", "local": "Fortaleza", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-23-19hs-serrapelada", "data": "2025-12-23", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Eudásio" },

    // --- 24/12/2025 ---
    { "id": "rafael-2025-12-24-07hs-penedompe", "data": "2025-12-24", "horario": "07hs", "local": "Penedo MPE", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-24-17hs-matriz", "data": "2025-12-24", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" },
    { "id": "rafael-2025-12-24-19hs-matriz", "data": "2025-12-24", "horario": "19hs", "local": "Matriz (Missa de Natal)", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-24-19hs-santosdumont", "data": "2025-12-24", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-24-19hs-divino", "data": "2025-12-24", "horario": "19hs", "local": "Divino", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-24-21hs-npqiracema", "data": "2025-12-24", "horario": "21hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-24-21hs-pqsaojoao", "data": "2025-12-24", "horario": "21hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-24-24hs-matriz", "data": "2025-12-24", "horario": "24hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 25/12/2025 ---
    { "id": "ivan-2025-12-25-07hs-matriz", "data": "2025-12-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-25-09hs-saojose", "data": "2025-12-25", "horario": "09hs", "local": "São José", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-25-17hs-divino", "data": "2025-12-25", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-25-17hs-pqsaojoao", "data": "2025-12-25", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-25-19hs-matriz", "data": "2025-12-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 26/12/2025 ---
    { "id": "rafael-2025-12-26-08hs-visita", "data": "2025-12-26", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
    { "id": "eudasio-2025-12-26-08hs-visita", "data": "2025-12-26", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-26-19hs-conegopinto", "data": "2025-12-26", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-26-19hs-rosario", "data": "2025-12-26", "horario": "19hs", "local": "Rosário", "padre": "Padre Ivan" },

    // --- 27/12/2025 ---
    { "id": "rafael-2025-12-27-17hs-santadulce", "data": "2025-12-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-27-17hs-abrigo", "data": "2025-12-27", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-27-17hs-catedral", "data": "2025-12-27", "horario": "17hs", "local": "Catedral (Conclusão Ano Jubilar)", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-27-19hs-outrabanda", "data": "2025-12-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-27-19hs-matriz", "data": "2025-12-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

    // --- 28/12/2025 ---
    { "id": "rafael-2025-12-28-07hs-divino", "data": "2025-12-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-07hs-matriz", "data": "2025-12-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-28-09hs-matriz", "data": "2025-12-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "eudasio-2025-12-28-1530hs-santosdumont", "data": "2025-12-28", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-28-17hs-centropastoral", "data": "2025-12-28", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-17hs-divino", "data": "2025-12-28", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-28-17hs-pqsaojoao", "data": "2025-12-28", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
    { "id": "rafael-2025-12-28-19hs-matriz", "data": "2025-12-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-28-19hs-npqiracema", "data": "2025-12-28", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 30/12/2025 ---
    { "id": "rafael-2025-12-30-19hs-mpe", "data": "2025-12-30", "horario": "19hs", "local": "Missa Ação de Graças MPE", "padre": "Padre Rafael" },

    // --- 31/12/2025 ---
    { "id": "rafael-2025-12-31-19hs-divino", "data": "2025-12-31", "horario": "19hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2025-12-31-19hs-pqsaojoao", "data": "2025-12-31", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2025-12-31-19hs-matriz", "data": "2025-12-31", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- JANEIRO 2026 ---

    // --- 01/01/2026 ---
    { "id": "ivan-2026-01-01-07hs-divino", "data": "2026-01-01", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-01-07hs-matriz", "data": "2026-01-01", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-01-17hs-pqsaojoao", "data": "2026-01-01", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "ivan-2026-01-01-19hs-divino", "data": "2026-01-01", "horario": "19hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-01-19hs-matriz", "data": "2026-01-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-01-19hs-npqiracema", "data": "2026-01-01", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },


    // --- 02/01/2026 ---
    { "id": "ivan-2026-01-02-18hs-centropastoral", "data": "2026-01-02", "horario": "18hs", "local": "Centro de Pastoral (Confissões)", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-02-1830hs-centropastoral", "data": "2026-01-02", "horario": "18:30hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-02-19hs-centropastoral", "data": "2026-01-02", "horario": "19hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },

    // --- 03/01/2026 ---
    { "id": "ivan-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "07:30hs", "local": "CPP", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "07:30hs", "local": "CPP", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-03-17hs-santaluzia", "data": "2026-01-03", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-03-17hs-santoantonio", "data": "2026-01-03", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-03-17hs-conselho", "data": "2026-01-03", "horario": "17hs", "local": "Conselho Econômico", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-03-19hs-coite", "data": "2026-01-03", "horario": "19hs", "local": "Coité", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-03-19hs-matriz", "data": "2026-01-03", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "rafael-2026-01-03-0730hs-cpp", "data": "2026-01-03", "horario": "19:30hs", "local": "CPP", "padre": "Padre Rafael" },

    // --- 04/01/2026 ---
    { "id": "ivan-2026-01-04-07hs-divino", "data": "2026-01-04", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-04-07hs-matriz", "data": "2026-01-04", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-09hs-saojose", "data": "2026-01-04", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
    { "id": "eudasio-2026-01-04-09hs-matriz", "data": "2026-01-04", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-17hs-divino", "data": "2026-01-04", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-04-17hs-pqsaojoao", "data": "2026-01-04", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-04-17hs-centropastoral", "data": "2026-01-04", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-04-19hs-matriz", "data": "2026-01-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-04-19hs-npqiracema", "data": "2026-01-04", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },

    // --- 10/01/2026 ---
    { "id": "rafael-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-10-18hs-procissao", "data": "2026-01-10", "horario": "18hs", "local": "Procissão Bandeira São Sebastião", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-10-19hs-abertura", "data": "2026-01-10", "horario": "19hs", "local": "Abertura Festa São Sebastião", "padre": "Padre Eudásio" },

    // --- 11/01/2026 ---
    { "id": "rafael-2026-01-11-07hs-matriz", "data": "2026-01-11", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-11-07hs-divino", "data": "2026-01-11", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-11-09hs-matriz", "data": "2026-01-11", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },

    // --- 18/01/2026 ---
    { "id": "rafael-2026-01-18-07hs-divino", "data": "2026-01-18", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-18-07hs-matriz", "data": "2026-01-18", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-18-09hs-matriz", "data": "2026-01-18", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
    { "id": "ivan-2026-01-18-17hs-divino", "data": "2026-01-18", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },

    // --- 20/01/2026 ---
    { "id": "rafael-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-20-09hs-festa", "data": "2026-01-20", "horario": "09hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" },
    { "id": "rafael-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Rafael" },
    { "id": "ivan-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Ivan" },
    { "id": "eudasio-2026-01-20-18hs-festa", "data": "2026-01-20", "horario": "18hs", "local": "Festa de São Sebastião", "padre": "Padre Eudásio" }
    
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