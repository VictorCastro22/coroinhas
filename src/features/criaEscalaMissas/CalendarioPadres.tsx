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
  { "id": "333-2025-09-30-19h-AbrigoTriduo", "data": "2025-09-30", "horario": "19hs", "local": "Abrigo (Tríduo de São Francisco)", "padre": "Padre Rafael" },
  { "id": "1-2025-10-01-08h-Atendimentonasecretaria", "data": "2025-10-01", "horario": "08hs", "local": "Atendimento na secretaria", "padre": "Padre Eudásio" },
  { "id": "2-2025-10-01-08h-ConfissoesnaMatriz", "data": "2025-10-01", "horario": "08hs", "local": "Confissões na Matriz", "padre": "Padre Ivan" },
  { "id": "3-2025-10-01-19h-SerraPeladaFesta", "data": "2025-10-01", "horario": "19hs", "local": "Serra Pelada (Festa de Santa Terezinha do Menino Jesus)", "padre": "Padre Eudásio" },
  { "id": "4-2025-10-01-19h-Guabiraba", "data": "2025-10-01", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
  { "id": "5-2025-10-02-19h-PqdasRosas", "data": "2025-10-02", "horario": "19hs", "local": "Pq. das Rosas", "padre": "Padre Eudásio" },
  { "id": "6-2025-10-02-19h-BandeiraNSraAparecida", "data": "2025-10-02", "horario": "19hs", "local": "Bandeira de N. Sra. Aparecida, no N. Pq. Iracema", "padre": "Padre Ivan" },
  { "id": "7-2025-10-02-19h-Mororo", "data": "2025-10-02", "horario": "19hs", "local": "Mororó", "padre": "Padre Rafael" },
  { "id": "8-2025-10-03-08h-VisitaaosEnfermos", "data": "2025-10-03", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
  { "id": "9-2025-10-03-08h-VisitaaosEnfermos", "data": "2025-10-03", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
  { "id": "10-2025-10-03-18h30-AdoracaoaoSSSACRAMENTO", "data": "2025-10-03", "horario": "18:30", "local": "Adoração ao SS. SACRAMENTO", "padre": "Padre Eudásio" },
  { "id": "11-2025-10-03-19h-Columijuba", "data": "2025-10-03", "horario": "19hs", "local": "Columijuba", "padre": "Padre Ivan" },
  { "id": "12-2025-10-03-19h-CentroPastoralMissaAdoracao", "data": "2025-10-03", "horario": "19hs", "local": "Centro de Pastoral (Missa da Adoração)", "padre": "Padre Rafael" },
  { "id": "13-2025-10-04-07h30-CPP", "data": "2025-10-04", "horario": "07:30", "local": "CPP", "padre": "Padre Eudásio" },
  { "id": "14-2025-10-04-07h30-CPP", "data": "2025-10-04", "horario": "07:30", "local": "CPP", "padre": "Padre Ivan" },
  { "id": "15-2025-10-04-07h30-CPP", "data": "2025-10-04", "horario": "07:30", "local": "CPP", "padre": "Padre Rafael" },
  { "id": "16-2025-10-04-17h-AbrigoFestaSaoFrancisco", "data": "2025-10-04", "horario": "17hs", "local": "Abrigo (Festa de São Francisco de Assis)", "padre": "Padre Eudásio" },
  { "id": "17-2025-10-04-17h30-MatrimonionaMatriz", "data": "2025-10-04", "horario": "17:30", "local": "Matrimônio na Matriz", "padre": "Padre Rafael" },
  { "id": "18-2025-10-04-19h-MororoFestaSaoFrancisco", "data": "2025-10-04", "horario": "19hs", "local": "Mororó (Festa de São Francisco de Assis)", "padre": "Padre Eudásio" },
  { "id": "19-2025-10-04-19h-CANINDE", "data": "2025-10-04", "horario": "19hs", "local": "CANINDÉ", "padre": "Padre Ivan" },
  { "id": "20-2025-10-04-19h-PiraporaFestaSaoFrancisco", "data": "2025-10-04", "horario": "19hs", "local": "Pirapora (Festa de São Francisco de Assis)", "padre": "Padre Rafael" },
  { "id": "21-2025-10-05-07h-Matriz", "data": "2025-10-05", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "22-2025-10-05-07h-Divino", "data": "2025-10-05", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "23-2025-10-05-09h-Matriz", "data": "2025-10-05", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "24-2025-10-05-09h-SaoJose", "data": "2025-10-05", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
  { "id": "25-2025-10-05-14h-PreDNJ", "data": "2025-10-05", "horario": "14hs", "local": "Pré DNJ da Região Episcopal Sagrada Família no Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "26-2025-10-05-17h-Divino", "data": "2025-10-05", "horario": "17hs", "local": "Divino", "padre": "Padre Eudásio" },
  { "id": "27-2025-10-05-17h-PqSaoJoao", "data": "2025-10-05", "horario": "17hs", "local": "Pq. São João", "padre": "Padre Ivan" },
  { "id": "28-2025-10-05-17h-CentrodePastoral", "data": "2025-10-05", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "29-2025-10-05-19h-SaoBeneditoFesta", "data": "2025-10-05", "horario": "19hs", "local": "São Benedito (Festa...)", "padre": "Padre Eudásio" },
  { "id": "30-2025-10-05-19h-Matriz", "data": "2025-10-05", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "31-2025-10-05-19h-NPqIracema", "data": "2025-10-05", "horario": "19hs", "local": "N. Pq. Iracema", "padre": "Padre Rafael" },
  { "id": "32-2025-10-06-19h-CedrodoItapebussuFesta", "data": "2025-10-06", "horario": "19hs", "local": "Cedro do Itapebussu (Festa de N. Sra. Aparecida)", "padre": "Padre Eudásio" },
  { "id": "33-2025-10-06-19h-BandeiradaFestadeSaoBenedito", "data": "2025-10-06", "horario": "19hs", "local": "Bandeira da Festa de São Benedito", "padre": "Padre Ivan" },
  { "id": "34-2025-10-07-19h-RosarioFesta", "data": "2025-10-07", "horario": "19hs", "local": "Rosário (Festa de N. Sra. do Rosário)", "padre": "Padre Eudásio" },
  { "id": "35-2025-10-07-19h-Urucara", "data": "2025-10-07", "horario": "19hs", "local": "Urucará", "padre": "Padre Ivan" },
  { "id": "36-2025-10-08-08h-AtendimentonaSecretaria", "data": "2025-10-08", "horario": "08hs", "local": "Atendimento na Secretaria", "padre": "Padre Eudásio" },
  { "id": "37-2025-10-08-17h-ConfissoesnaMatriz", "data": "2025-10-08", "horario": "17hs", "local": "Confissões na Matriz", "padre": "Padre Rafael" },
  { "id": "38-2025-10-08-19h-MatrizMissaVotiva", "data": "2025-10-08", "horario": "19hs", "local": "Matriz (Missa Votiva de N. Sra. da Penha e pelas famílias)", "padre": "Padre Eudásio" },
  { "id": "39-2025-10-08-19h-MissaVotivaNSraPenha", "data": "2025-10-08", "horario": "19hs", "local": "Missa Votiva de N. Sra. da Penha", "padre": "Padre Ivan" },
  { "id": "40-2025-10-08-19h-MissaVotivaNSraPenha", "data": "2025-10-08", "horario": "19hs", "local": "Missa Votiva a N. Sra. da Penha e pelas famílias, na Matriz", "padre": "Padre Rafael" },
  { "id": "41-2025-10-09-08h-ConfissoesnaMatriz", "data": "2025-10-09", "horario": "08hs", "local": "Confissões na Matriz", "padre": "Padre Ivan" },
  { "id": "42-2025-10-09-19h-Pirapora", "data": "2025-10-09", "horario": "19hs", "local": "Pirapora", "padre": "Padre Eudásio" },
  { "id": "43-2025-10-09-19h-BandeiradaFestaMaeRainha", "data": "2025-10-09", "horario": "19hs", "local": "Bandeira da Festa da Mãe Rainha", "padre": "Padre Ivan" },
  { "id": "44-2025-10-10-08h-VisitaaosEnfermos", "data": "2025-10-10", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
  { "id": "45-2025-10-10-08h-VisitaaosEnfermos", "data": "2025-10-10", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Rafael" },
  { "id": "46-2025-10-10-17h-ConfissoesMissaJubilar", "data": "2025-10-10", "horario": "17hs", "local": "Confissões na Matriz para a Missa Jubilar", "padre": "Padre Eudásio" },
  { "id": "47-2025-10-10-17h-ConfissoesMissaJubilar", "data": "2025-10-10", "horario": "17hs", "local": "Confissões na Matriz para a missa Jubilar", "padre": "Padre Ivan" },
  { "id": "48-2025-10-10-17h-ConfissoesMissaJubilar", "data": "2025-10-10", "horario": "17hs", "local": "Confissões na Matriz para a Missa Jubilar", "padre": "Padre Rafael" },
  { "id": "49-2025-10-11-07h30-DiaDMissionario", "data": "2025-10-11", "horario": "07:30", "local": "Dia 'D' Missionário", "padre": "Padre Eudásio" },
  { "id": "50-2025-10-11-07h30-DiaDMissionario", "data": "2025-10-11", "horario": "07:30", "local": "Dia 'D' Missionário", "padre": "Padre Ivan" },
  { "id": "51-2025-10-11-07h30-DiaDMissionario", "data": "2025-10-11", "horario": "07:30", "local": "Dia 'D' Missionário", "padre": "Padre Rafael" },
  { "id": "52-2025-10-11-19h-Matriz", "data": "2025-10-11", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "53-2025-10-11-19h-OutraBanda", "data": "2025-10-11", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Ivan" },
  { "id": "54-2025-10-11-19h-MaeRainhaemFesta", "data": "2025-10-11", "horario": "19hs", "local": "Mãe Rainha em Festa", "padre": "Padre Rafael" },
  { "id": "55-2025-10-12-07h-Matriz", "data": "2025-10-12", "horario": "07hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "56-2025-10-12-07h-Abrigo", "data": "2025-10-12", "horario": "07hs", "local": "Abrigo", "padre": "Padre Ivan" },
  { "id": "57-2025-10-12-07h-Divino", "data": "2025-10-12", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "58-2025-10-12-09h-Matriz", "data": "2025-10-12", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "59-2025-10-12-11h-FazendadaEsperanca", "data": "2025-10-12", "horario": "11hs", "local": "Fazenda da Esperança (Eucaristia)", "padre": "Padre Rafael" },
  { "id": "60-2025-10-12-17h-CentrodePastoral", "data": "2025-10-12", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Eudásio" },
  { "id": "61-2025-10-12-17h-Divino", "data": "2025-10-12", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "62-2025-10-12-17h-PqSaoJoao", "data": "2025-10-12", "horario": "17hs", "local": "Pq. São João", "padre": "Padre Rafael" },
  { "id": "63-2025-10-12-19h-NPqIracemaFesta", "data": "2025-10-12", "horario": "19hs", "local": "N. Pq. Iracema (Festa de N. Sra. Aparecida)", "padre": "Padre Eudásio" },
  { "id": "64-2025-10-12-19h-Matriz", "data": "2025-10-12", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "65-2025-10-12-19h-SantosDumontemFesta", "data": "2025-10-12", "horario": "19hs", "local": "Santos Dumont em Festa", "padre": "Padre Rafael" },
  { "id": "66-2025-10-13-12h-Matriz", "data": "2025-10-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "67-2025-10-13-17h-Vilares", "data": "2025-10-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Ivan" },
  { "id": "68-2025-10-13-19h-FormacaoBiblica", "data": "2025-10-13", "horario": "19hs", "local": "Formação Bíblica com Pe. Edmilton do Cj. Industrial", "padre": "Padre Eudásio" },
  { "id": "69-2025-10-13-19h-PqSaoJoao", "data": "2025-10-13", "horario": "19hs", "local": "Pq. São João", "padre": "Padre Ivan" },
  { "id": "70-2025-10-14-19h-SantaDulce", "data": "2025-10-14", "horario": "19hs", "local": "Santa Dulce", "padre": "Padre Ivan" },
  { "id": "71-2025-10-14-19h-SaoPedro", "data": "2025-10-14", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },
  { "id": "72-2025-10-15-17h-ConfissoesnaMatriz", "data": "2025-10-15", "horario": "17hs", "local": "Confissões na Matriz", "padre": "Padre Rafael" },
  { "id": "73-2025-10-15-19h-SantosDumont", "data": "2025-10-15", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
  { "id": "74-2025-10-15-19h-Guabirada", "data": "2025-10-15", "horario": "19hs", "local": "Guabirada", "padre": "Padre Ivan" },
  { "id": "75-2025-10-15-19h-Missapelasfamilias", "data": "2025-10-15", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "76-2025-10-16-19h-SantosDumontFesta", "data": "2025-10-16", "horario": "19hs", "local": "Santos Dumont (Festa de Santa Edwiges)", "padre": "Padre Eudásio" },
  { "id": "77-2025-10-16-19h-PqdasRosas", "data": "2025-10-16", "horario": "19hs", "local": "Pq. das Rosas", "padre": "Padre Ivan" },
  { "id": "78-2025-10-16-19h-Tangueira", "data": "2025-10-16", "horario": "19hs", "local": "Tangueira", "padre": "Padre Rafael" },
  { "id": "79-2025-10-17-08h-VisitaaosEnfermos", "data": "2025-10-17", "horario": "08hs", "local": "Visita aos Enfermos", "padre": "Padre Eudásio" },
  { "id": "80-2025-10-17-19h-HorizonteMatrimonio", "data": "2025-10-17", "horario": "19hs", "local": "Horizonte (Matrimônio da Bia de Gracinha e Ivonaldo)", "padre": "Padre Eudásio" },
  { "id": "81-2025-10-17-19h-Columijuba", "data": "2025-10-17", "horario": "19hs", "local": "Columijuba", "padre": "Padre Ivan" },
  { "id": "82-2025-10-18-08h-FormacaoMissionaria", "data": "2025-10-18", "horario": "08hs", "local": "Formação Missionária", "padre": "Padre Eudásio" },
  { "id": "83-2025-10-18-17h-SantaLuzia", "data": "2025-10-18", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Ivan" },
  { "id": "84-2025-10-18-17h-SantoAntonio", "data": "2025-10-18", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Rafael" },
  { "id": "85-2025-10-18-19h-MaeRainhaFesta", "data": "2025-10-18", "horario": "19hs", "local": "Mãe Rainha (Festa de N. Sra. Mãe Rainha)", "padre": "Padre Eudásio" },
  { "id": "86-2025-10-18-19h-Matriz", "data": "2025-10-18", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "87-2025-10-18-19h-Coite", "data": "2025-10-18", "horario": "19hs", "local": "Coité", "padre": "Padre Rafael" },
  { "id": "88-2025-10-19-07h-Divino", "data": "2025-10-19", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "89-2025-10-19-07h-Matriz", "data": "2025-10-19", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "90-2025-10-19-09h-Matriz", "data": "2025-10-19", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "91-2025-10-19-09h-SaoJose", "data": "2025-10-19", "horario": "09hs", "local": "São José", "padre": "Padre Rafael" },
  { "id": "92-2025-10-19-17h-PqSaoJoao", "data": "2025-10-19", "horario": "17hs", "local": "Pq. São João", "padre": "Padre Eudásio" },
  { "id": "93-2025-10-19-17h-CentrodePastoral", "data": "2025-10-19", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
  { "id": "94-2025-10-19-17h-Divino", "data": "2025-10-19", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "95-2025-10-19-19h-Matriz", "data": "2025-10-19", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "96-2025-10-19-19h-NPqIracema", "data": "2025-10-19", "horario": "19hs", "local": "N. Pq. Iracema", "padre": "Padre Ivan" },
  { "id": "97-2025-10-20-19h-FormacaoBiblica", "data": "2025-10-20", "horario": "19hs", "local": "Formação Bíblica com Pe. Edmilton do Cj. Industrial", "padre": "Padre Eudásio" },
  { "id": "98-2025-10-21-19h-Urucara", "data": "2025-10-21", "horario": "19hs", "local": "Urucará", "padre": "Padre Eudásio" },
  { "id": "99-2025-10-21-19h-PlanaltodosCajueiros", "data": "2025-10-21", "horario": "19hs", "local": "Planalto dos Cajueiros", "padre": "Padre Ivan" },
  { "id": "100-2025-10-22-08h-Atendimentonasecretaria", "data": "2025-10-22", "horario": "08hs", "local": "Atendimento na secretaria", "padre": "Padre Eudásio" },
  { "id": "101-2025-10-22-17h-ConfissoesnaMatriz", "data": "2025-10-22", "horario": "17hs", "local": "Confissões na Matriz", "padre": "Padre Eudásio" },
  { "id": "102-2025-10-22-19h-Missapelasfamilias", "data": "2025-10-22", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Eudásio" },
  { "id": "103-2025-10-22-19h-SantosDumont", "data": "2025-10-22", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
  { "id": "104-2025-10-23-19h-MaeRainha", "data": "2025-10-23", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },
  { "id": "105-2025-10-23-19h-CampoDelta", "data": "2025-10-23", "horario": "19hs", "local": "Campo Delta", "padre": "Padre Ivan" },
  { "id": "106-2025-10-24-18h-MatrimonionaMatriz", "data": "2025-10-24", "horario": "18h", "local": "Matrimônio na Matriz", "padre": "Padre Rafael" },
  { "id": "107-2025-10-24-19h-ConegoPinto", "data": "2025-10-24", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
  { "id": "108-2025-10-25-08h30-CPPdaRegiao", "data": "2025-10-25", "horario": "08:30", "local": "CPP da Região Episcopal Sagrada Família", "padre": "Padre Ivan" },
  { "id": "109-2025-10-25-08h30-CPPdaRegiao", "data": "2025-10-25", "horario": "08:30", "local": "CPP da Região", "padre": "Padre Rafael" },
  { "id": "110-2025-10-25-17h-Abrigo", "data": "2025-10-25", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
  { "id": "111-2025-10-25-17h-SantaDulce", "data": "2025-10-25", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Rafael" },
  { "id": "112-2025-10-25-19h-Matriz", "data": "2025-10-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "113-2025-10-25-19h-OutraBanda", "data": "2025-10-25", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Rafael" },
  { "id": "114-2025-10-26-07h-Matriz", "data": "2025-10-26", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "115-2025-10-26-07h-EspiritualidadeMEPs", "data": "2025-10-26", "horario": "07 às 12hs", "local": "Espiritualidade dos MEPs da Região Episcopal Sagrada Família", "padre": "Padre Rafael" },
  { "id": "116-2025-10-26-09h-Matriz", "data": "2025-10-26", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "117-2025-10-26-17h-CentrodePastoral", "data": "2025-10-26", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Ivan" },
  { "id": "118-2025-10-26-17h-Divino", "data": "2025-10-26", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "119-2025-10-26-19h-NPqIracema", "data": "2025-10-26", "horario": "19hs", "local": "N. Pq. Iracema", "padre": "Padre Ivan" },
  { "id": "120-2025-10-26-19h-Matriz", "data": "2025-10-26", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "121-2025-10-27-19h-OrdenacaoPresbiteral", "data": "2025-10-27", "horario": "19hs", "local": "Ordenação Presbiteral do Diácono João Pedro na Catedral", "padre": "Padre Ivan" },
  { "id": "122-2025-10-27-19h-OrdenacaoPresbiteral", "data": "2025-10-27", "horario": "19hs", "local": "Ordenação Presbiteral do Diácono João Pedro, na Catedral", "padre": "Padre Rafael" },
  { "id": "123-2025-10-28-19h-SerraPelada", "data": "2025-10-28", "horario": "19hs", "local": "Serra Pelada", "padre": "Padre Ivan" },
  { "id": "124-2025-10-28-19h-SaoPedro", "data": "2025-10-28", "horario": "19hs", "local": "São Pedro", "padre": "Padre Rafael" },
  { "id": "125-2025-10-29-17h-ConfissoesnaMatriz", "data": "2025-10-29", "horario": "17hs", "local": "Confissões na Matriz", "padre": "Padre Rafael" },
  { "id": "126-2025-10-29-19h-Missapelasfamilias", "data": "2025-10-29", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "127-2025-10-30-19h-PrimeiraMissaPeJoaoPedro", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Eudásio" },
  { "id": "128-2025-10-30-19h-PrimeiraMissaPeJoaoPedro", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Ivan" },
  { "id": "129-2025-10-30-19h-PrimeiraMissaPeJoaoPedro", "data": "2025-10-30", "horario": "19hs", "local": "Matriz (Primeira Missa do Neo Sacerdote Pe. João Pedro)", "padre": "Padre Rafael" },
  { "id": "130-2025-11-01-07h30-CPP", "data": "2025-11-01", "horario": "07:30", "local": "CPP", "padre": "Padre Eudásio" },
  { "id": "131-2025-11-01-07h30-CPP", "data": "2025-11-01", "horario": "07:30", "local": "CPP", "padre": "Padre Ivan" },
  { "id": "132-2025-11-01-07h30-CPP", "data": "2025-11-01", "horario": "07:30", "local": "CPP", "padre": "Padre Rafael" },
  { "id": "133-2025-11-01-17h-HorizonteCasamento", "data": "2025-11-01", "horario": "17hs", "local": "Horizonte (Casamento de Luana na Reunida)", "padre": "Padre Eudásio" },
  { "id": "134-2025-11-01-17h-SantoAntonio", "data": "2025-11-01", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
  { "id": "135-2025-11-01-17h-SantaLuzia", "data": "2025-11-01", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Rafael" },
  { "id": "136-2025-11-01-19h-Coite", "data": "2025-11-01", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
  { "id": "137-2025-11-01-19h-Matriz", "data": "2025-11-01", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "138-2025-11-02-07h-Cemiterio", "data": "2025-11-02", "horario": "07hs", "local": "Cemitério", "padre": "Padre Eudásio" },
  { "id": "139-2025-11-02-07h-Matriz", "data": "2025-11-02", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "140-2025-11-02-07h-Divino", "data": "2025-11-02", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "141-2025-11-02-09h-Matriz", "data": "2025-11-02", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "142-2025-11-02-09h-SaoJose", "data": "2025-11-02", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
  { "id": "143-2025-11-02-17h-Cemiterio", "data": "2025-11-02", "horario": "17hs", "local": "Cemitério", "padre": "Padre Eudásio" },
  { "id": "144-2025-11-02-17h-Divino", "data": "2025-11-02", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "145-2025-11-02-17h-CentrodePastoral", "data": "2025-11-02", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "146-2025-11-02-19h-Matriz", "data": "2025-11-02", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "147-2025-11-02-19h-PqSaoJoao", "data": "2025-11-02", "horario": "19hs", "local": "Pq. São João", "padre": "Padre Ivan" },
  { "id": "148-2025-11-02-19h-NPqIracema", "data": "2025-11-02", "horario": "19hs", "local": "N. Pq. Iracema", "padre": "Padre Rafael" }      
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