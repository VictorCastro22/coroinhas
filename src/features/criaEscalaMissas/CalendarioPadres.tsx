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

    { "id": "rafael-2026-06-04-1530hs-matriz", "data": "2026-06-04", "horario": "15:30hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-03-18hs-sec", "data": "2026-06-04", "horario": "18hs", "local": "Centro de Pastoral", "padre": "Padre Adair" }, //

    // --- 05/06 (Sexta-feira) ---
    { "id": "rafael-2026-06-05-17hs-matriz", "data": "2026-06-05", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //

    // --- 06/06 (Sábado) ---
    { "id": "adair-2026-06-06-17hs-sluzia", "data": "2026-06-06", "horario": "17hs", "local": "S. Luzia", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-06-17hs-starita", "data": "2026-06-06", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-06-06-19hs-pqsfe", "data": "2026-06-06", "horario": "19hs", "local": "Pq. Sta. Fé", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-06-19hs-matriz", "data": "2026-06-06", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-06-19hs-scjcoite", "data": "2026-06-06", "horario": "19hs", "local": "SCJ Coité", "padre": "Padre Ivan" }, //

    // --- 07/06 (Domingo) ---
    { "id": "ivan-2026-06-07-07hs-matriz", "data": "2026-06-07", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-07-07hs-divino", "data": "2026-06-07", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-07-07hs-abrigo", "data": "2026-06-07", "horario": "07hs", "local": "Abrigo", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-07-09hs-matriz", "data": "2026-06-07", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-07-09hs-aparecida", "data": "2026-06-07", "horario": "09hs", "local": "Aparecida", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-07-09hs-saojose", "data": "2026-06-07", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-07-17hs-rosario", "data": "2026-06-07", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-07-17hs-divino", "data": "2026-06-07", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-07-17hs-pqsaojoao", "data": "2026-06-07", "horario": "17hs", "local": "Pq. São João", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-07-19hs-matriz", "data": "2026-06-07", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-07-19hs-urucara", "data": "2026-06-07", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, //

    // --- 08/06 (Segunda-feira) ---
    { "id": "ivan-2026-06-08-19hs-tabatinga", "data": "2026-06-08", "horario": "19hs", "local": "Tabatinga", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-08-19hs-sacoverde", "data": "2026-06-08", "horario": "19hs", "local": "Saco Verde", "padre": "Padre Adair" }, //

    // --- 09/06 (Terça-feira) ---
    { "id": "ivan-2026-06-09-17hs-matriz", "data": "2026-06-09", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-09-19hs-matriz", "data": "2026-06-09", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-09-19hs-staterezinha", "data": "2026-06-09", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Adair" }, //

    // --- 10/06 (Quarta-feira) ---
    { "id": "adair-2026-06-10-0830hs-sec", "data": "2026-06-10", "horario": "08:30hs", "local": "Secretaria Paroquial (Atendimento)", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-10-17hs-matriz", "data": "2026-06-10", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-10-19hs-mororo", "data": "2026-06-10", "horario": "19hs", "local": "Mororó", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-10-19hs-matriz", "data": "2026-06-10", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 11/06 (Quinta-feira) ---
    { "id": "ivan-2026-06-11-08hs-matriz", "data": "2026-06-11", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-11-19hs-matriz", "data": "2026-06-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-11-19hs-violete", "data": "2026-06-11", "horario": "19hs", "local": "Violete - SGA", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-11-19hs-pirapora", "data": "2026-06-11", "horario": "19hs", "local": "Pirapora", "padre": "Padre Ivan" }, //

    // --- 12/06 (Sexta-feira) ---
    { "id": "rafael-2026-06-12-17hs-matriz", "data": "2026-06-12", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-12-19hs-nspiedade", "data": "2026-06-12", "horario": "19hs", "local": "N. Sra. da Piedade", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-12-19hs-matriz", "data": "2026-06-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 13/06 (Sábado) ---
    { "id": "ivan-2026-06-13-09hs-santoantonio", "data": "2026-06-13", "horario": "09hs", "local": "Santo Antônio", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-13-12hs-matriz", "data": "2026-06-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "adair-2026-06-13-17hs-stafe", "data": "2026-06-13", "horario": "17hs", "local": "Santa Fé", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-13-17hs-abrigo", "data": "2026-06-13", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-13-17hs-sjoaobatista", "data": "2026-06-13", "horario": "17hs", "local": "S. João Batista", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-06-13-19hs-matriz", "data": "2026-06-13", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-13-19hs-vilares", "data": "2026-06-13", "horario": "19hs", "local": "Vilares", "padre": "Padre Adair" }, //

    // --- 14/06 (Domingo) ---
    { "id": "adair-2026-06-14-07hs-matriz", "data": "2026-06-14", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-14-07hs-divino", "data": "2026-06-14", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-14-09hs-matriz", "data": "2026-06-14", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-14-09hs-aparecida", "data": "2026-06-14", "horario": "09hs", "local": "Aparecida", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-06-14-1530hs-sdumont", "data": "2026-06-14", "horario": "15:30hs", "local": "S. Dumont", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-06-14-17hs-rosario", "data": "2026-06-14", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-14-17hs-pqsaojoao", "data": "2026-06-14", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-14-17hs-divino", "data": "2026-06-14", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-06-14-19hs-matriz", "data": "2026-06-14", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-14-19hs-urucara", "data": "2026-06-14", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" }, //

    // --- 16/06 (Terça-feira) ---
    { "id": "ivan-2026-06-16-17hs-matriz", "data": "2026-06-16", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-16-19hs-matriz", "data": "2026-06-16", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 17/06 (Quarta-feira) ---
    { "id": "adair-2026-06-17-0830hs-sec", "data": "2026-06-17", "horario": "08:30hs", "local": "Secretaria Paroquial (Atendimento)", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-17-17hs-matriz", "data": "2026-06-17", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-17-19hs-matriz", "data": "2026-06-17", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 18/06 (Quinta-feira) ---
    { "id": "ivan-2026-06-18-08hs-matriz", "data": "2026-06-18", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-18-19hs-maerainha", "data": "2026-06-18", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-18-19hs-matriz", "data": "2026-06-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-18-19hs-pqsjose", "data": "2026-06-18", "horario": "19hs", "local": "Pq. S. José FOR", "padre": "Padre Rafael" }, //

    // --- 19/06 (Sexta-feira) ---
    { "id": "rafael-2026-06-19-17hs-matriz", "data": "2026-06-19", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-19-19hs-matriz", "data": "2026-06-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //

    // --- 20/06 (Sábado) ---
    { "id": "ivan-2026-06-20-17hs-staluzia", "data": "2026-06-20", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-20-17hs-pqsfe", "data": "2026-06-20", "horario": "17hs", "local": "Pq. Sta. Fé", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-20-19hs-outrabanda", "data": "2026-06-20", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-20-19hs-scjcoite", "data": "2026-06-20", "horario": "19hs", "local": "SCJ Coité", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-20-19hs-matriz", "data": "2026-06-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 21/06 (Domingo) ---
    { "id": "ivan-2026-06-21-07hs-matriz", "data": "2026-06-21", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-21-07hs-divino", "data": "2026-06-21", "horario": "07hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-06-21-09hs-matriz", "data": "2026-06-21", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-21-09hs-aparecida", "data": "2026-06-21", "horario": "09hs", "local": "Aparecida", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-21-09hs-saojose", "data": "2026-06-21", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-21-17hs-rosario", "data": "2026-06-21", "horario": "17hs", "local": "Rosário", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-21-17hs-pqsaojoao", "data": "2026-06-21", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-21-17hs-divino", "data": "2026-06-21", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-21-19hs-matriz", "data": "2026-06-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-21-19hs-urucara", "data": "2026-06-21", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, //

    // --- 23/06 (Terça-feira) ---
    { "id": "ivan-2026-06-23-17hs-matriz", "data": "2026-06-23", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-06-23-19hs-matriz", "data": "2026-06-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //

    // --- 24/06 (Quarta-feira) ---
    { "id": "adair-2026-06-24-0830hs-sec", "data": "2026-06-24", "horario": "08:30hs", "local": "Secretaria Paroquial (Atendimento)", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-24-17hs-matriz", "data": "2026-06-24", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "rafael-2026-06-24-19hs-matriz", "data": "2026-06-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 25/06 (Quinta-feira) ---
    { "id": "ivan-2026-06-25-08hs-matriz", "data": "2026-06-25", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-06-25-19hs-matriz", "data": "2026-06-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-25-19hs-saopedro", "data": "2026-06-25", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" }, //

    // --- 26/06 (Sexta-feira) ---
    { "id": "rafael-2026-06-26-17hs-matriz", "data": "2026-06-26", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-26-19hs-matriz", "data": "2026-06-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-26-19hs-nsgracas", "data": "2026-06-26", "horario": "19hs", "local": "NS Graças", "padre": "Padre Adair" }, //

    // --- 27/06 (Sábado) ---
    { "id": "rafael-2026-06-27-17hs-saobenedito", "data": "2026-06-27", "horario": "17hs", "local": "São Benedito", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-27-17hs-stadulce", "data": "2026-06-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-06-27-19hs-outrabanda", "data": "2026-06-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-27-19hs-matriz", "data": "2026-06-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 28/06 (Domingo) ---
    { "id": "adair-2026-06-28-07hs-matriz", "data": "2026-06-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-28-07hs-divino", "data": "2026-06-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-06-28-09hs-matriz", "data": "2026-06-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "ivan-2026-06-28-09hs-aparecida", "data": "2026-06-28", "horario": "09hs", "local": "Aparecida", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-06-28-1530hs-sdumont", "data": "2026-06-28", "horario": "15:30hs", "local": "S. Dumont", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-06-28-17hs-rosario", "data": "2026-06-28", "horario": "17hs", "local": "Rosário", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-06-28-17hs-pqsaojoao", "data": "2026-06-28", "horario": "17hs", "local": "Pq. S. João", "padre": "Padre Ivan" }, //
    { "id": "adair-2026-06-28-17hs-divino", "data": "2026-06-28", "horario": "17hs", "local": "Divino", "padre": "Padre Adair" }, //
    { "id": "adair-2026-06-28-19hs-matriz", "data": "2026-06-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-06-28-19hs-urucara", "data": "2026-06-28", "horario": "19hs", "local": "Urucará", "padre": "Padre Rafael" }, //

    // --- 30/06 (Terça-feira) ---
    { "id": "ivan-2026-06-30-17hs-matriz", "data": "2026-06-30", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "ivan-2026-06-30-19hs-matriz", "data": "2026-06-30", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" }, //

    // --- 01/07 (Quarta-feira) ---
    { "id": "adair-2026-07-01-0830hs-sec", "data": "2026-07-01", "horario": "08:30hs", "local": "Secretaria Paroquial (Atendimento)", "padre": "Padre Adair" }, //
    { "id": "rafael-2026-07-01-17hs-matriz", "data": "2026-07-01", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-07-01-19hs-matriz", "data": "2026-07-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Adair" }, //

    // --- 02/07 (Quinta-feira) ---
    { "id": "ivan-2026-07-02-08hs-matriz", "data": "2026-07-02", "horario": "08hs", "local": "Matriz (Confissões)", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-02-19hs-matriz", "data": "2026-07-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //

    // --- 03/07 (Sexta-feira) ---
    { "id": "rafael-2026-07-03-17hs-matriz", "data": "2026-07-03", "horario": "17hs", "local": "Matriz (Confissões)", "padre": "Padre Rafael" }, //

    // --- 04/07 (Sábado) ---
    { "id": "rafael-2026-07-04-17hs-staluzia", "data": "2026-07-04", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" }, //
    { "id": "ivan-2026-07-04-17hs-starita", "data": "2026-07-04", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Ivan" }, //
    { "id": "rafael-2026-07-04-19hs-matriz", "data": "2026-07-04", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" }, //
    { "id": "adair-2026-07-04-19hs-scjcoite", "data": "2026-07-04", "horario": "19hs", "local": "SCJ Coité", "padre": "Padre Adair" } //
 
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