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

  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
  
      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        coroinhasData[cardId].push({
          id: doc.id,
          nome: data.nome,
          foto: data.foto,
        });
      }
  
      setCoroinhas(coroinhasData);
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
    { id: "5-2024-12-03-19h-Vila-da-Serra-do-Lagedo", data: "2024-12-03", horario: "19h", local: "Vila da Serra do Lagêdo", padre: "Padre Eudásio" },
    { id: "24-2024-12-03-19h-Santa-Luzia", data: "2024-12-03", horario: "19h", local: "Santa Luzia (Procissão e Missa)", padre: "Padre Ivan" },

    { id: "04-2024-12-04-08h-Secretaria-da-Paroquia", data: "2024-12-04", horario: "08h", local: "Secretaria da Paróquia", padre: "Padre Eudásio" },
    { id: "05-2024-12-04-17h-Matriz", data: "2024-12-04", horario: "17h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "8-2024-12-04-19h-Missa-pelas-familias", data: "2024-12-04", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Eudásio" },
    { id: "25-2024-12-04-19h-Guabiraba", data: "2024-12-04", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "25-2024-12-04-19h-SantaLuzia", data: "2024-12-04", horario: "19h", local: "Santa Luzia", padre: "Padre Rafhael" },

    { id: "07-2024-12-05-08h-Confissões-na-Matriz", data: "2024-12-05", horario: "08h", local: "Matriz", padre: "Padre Ivan" },
    { id: "27-2024-12-05-19h-Parque-Rosas", data: "2024-12-05", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },


    { id: "11-2024-12-06-18h-Centro-de-Pastoral", data: "2024-12-06", horario: "18h", local: "Centro de Pastoral (1ª sexta)", padre: "Padre Eudásio" },
    { id: "28-2024-12-06-19h-Lages", data: "2024-12-06", horario: "19h", local: "Lages", padre: "Padre Ivan" },

   
    { id: "29-2024-12-07-17h-Santo-Antonio", data: "2024-12-07", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "14-2024-12-07-19h-Coite", data: "2024-12-07", horario: "19h", local: "Coité (Missa e batizados)", padre: "Padre Eudásio" },
    { id: "30-2024-12-07-19h-Santa Luzia", data: "2024-12-07", horario: "19h", local: "Santa Luzia", padre: "Padre Ivan" },

    { id: "15-2024-12-08-07h-Matriz", data: "2024-12-08", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "31-2024-12-08-07h-Divino", data: "2024-12-08", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "16-2024-12-08-09h-Matriz", data: "2024-12-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "17-2024-12-08-17h-Centro-de-Pastoral", data: "2024-12-08", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "32-2024-12-08-17h-Divino", data: "2024-12-08", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "18-2024-12-08-19h-Matriz", data: "2024-12-08", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "33-2024-12-08-19h-Nova-Parque-Iracema", data: "2024-12-08", horario: "19h", local: "Nova Parque Iracema", padre: "Padre Ivan" }, 


    { id: "01-2024-12-09-19h-Carrapato", data: "2024-12-09", horario: "19h", local: "Carrapato (Festa de Santa Luzia)", padre: "Padre Eudásio" },
    { id: "02-2024-12-09-19h-Santa-Luzia", data: "2024-12-09", horario: "19h", local: "Santa Luzia", padre: "Padre João Paulo" },

    { id: "02-2024-12-10-19h-São-Pedro", data: "2024-12-10", horario: "19h", local: "São Pedro", padre: "Padre Eudásio" },
    { id: "03-2024-12-10-19h-Planalto-dos-Cajueiros", data: "2024-12-10", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Ivan" },
    { id: "01-2024-12-09-19h-SantaLuzia", data: "2024-12-10", horario: "19h", local: "Santa Luzia", padre: "Padre William" },

    { id: "04-2024-12-11-19h-Ocara", data: "2024-12-11", horario: "19h", local: "Ocara", padre: "Padre Eudásio" },
    { id: "05-2024-12-11-19h-Santos-Dumont", data: "2024-12-11", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "07-2024-12-12-08h-Confissões-na-Matriz", data: "2024-12-12", horario: "08h", local: "Matriz", padre: "Padre Ivan" },
    { id: "06-2024-12-12-19h-Quixadá", data: "2024-12-12", horario: "19h", local: "Quixadá", padre: "Padre Eudásio" },
    { id: "08-2024-12-12-19h-Mãe-Rainha", data: "2024-12-12", horario: "19h", local: "Mãe Rainha", padre: "Padre Ivan" },

    { id: "09-2024-12-13-09h-Santa-Luzia", data: "2024-12-13", horario: "09h", local: "Santa Luzia (Solenidade da Festa)", padre: "Padre Eudásio" },
    { id: "11-2024-12-13-12h-Matriz", data: "2024-12-13", horario: "12h", local: "Matriz", padre: "Padre Ivan" },
    { id: "12-2024-12-13-17h-Vilares", data: "2024-12-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "10-2024-12-13-19h-Santa-Luzia", data: "2024-12-13", horario: "19h", local: "Santa Luzia (Encerramento)", padre: "Padre Eudásio" },
    { id: "13-2024-12-13-19h-Parque-São-João", data: "2024-12-13", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },


    { id: "17-2024-12-14-10h-Casamento-na-Outra-Banda", data: "2024-12-14", horario: "10h", local: "Casamento na Outra Banda", padre: "Padre Ivan" },
    { id: "15-2024-12-14-17h-Divino", data: "2024-12-14", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "18-2024-12-14-17h-Santo-Antônio", data: "2024-12-14", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "18-2024-12-14-19h-Outra-Banda", data: "2024-12-14", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "20-2024-12-15-07h-Divino", data: "2024-12-15", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "21-2024-12-15-07h-Matriz", data: "2024-12-15", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "22-2024-12-15-09h-Matriz", data: "2024-12-15", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "23-2024-12-15-09h-São-José", data: "2024-12-15", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "24-2024-12-15-17h-Divino", data: "2024-12-15", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "25-2024-12-15-17h-Centro-de-Pastoral", data: "2024-12-15", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "26-2024-12-15-19h-Matriz", data: "2024-12-15", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "27-2024-12-15-19h-Parque-São-João", data: "2024-12-15", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },

    { id: "01-2024-12-16-19h-Timbauba", data: "2024-12-16", horario: "19h", local: "Timbaúba", padre: "Padre Eudásio" },

    { id: "02-2024-12-17-18h-Pirapora", data: "2024-12-17", horario: "18h", local: "Pirapora", padre: "Padre Eudásio" },
    { id: "03-2024-12-17-19h-Area-Seca", data: "2024-12-17", horario: "19h", local: "Área Seca", padre: "Padre Eudásio" },
    { id: "20-2024-12-17-19h-Urucara", data: "2024-12-17", horario: "19h", local: "Urucará", padre: "Padre Ivan" },

    { id: "04-2024-12-18-08h-Secretaria-da-Paroquia", data: "2024-12-18", horario: "08h", local: "Secretaria da Paróquia", padre: "Padre Eudásio" },
    { id: "05-2024-12-18-17h-Matriz", data: "2024-12-18", horario: "17h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "06-2024-12-18-19h-Matriz", data: "2024-12-18", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },
    { id: "21-2024-12-18-19h-Guabiraba", data: "2024-12-18", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "07-2024-12-19-18h-Parque-das-Rosas", data: "2024-12-19", horario: "18h", local: "Parque das Rosas", padre: "Padre Eudásio" },
    { id: "08-2024-12-19-19h-Matriz", data: "2024-12-19", horario: "19h", local: "Matriz (Ação de Graças pelos 37 anos de Vida Sacerdotal)", padre: "Padre Eudásio" },
    { id: "22-2024-12-19-19h-Tangueira", data: "2024-12-19", horario: "19h", local: "Tangueira", padre: "Padre Ivan" },

    { id: "23-2024-12-20-19h-Areninha-Area-Verde", data: "2024-12-20", horario: "19h", local: "Areninha da Área Verde", padre: "Padre Ivan" },

    { id: "11-2024-12-21-17h-Santo-Antonio", data: "2024-12-21", horario: "17h", local: "Santo Antônio", padre: "Padre Eudásio" },
    { id: "25-2024-12-21-17h-Santa-Luzia", data: "2024-12-21", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "12-2024-12-21-19h-Coite", data: "2024-12-21", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "26-2024-12-21-19h-Matriz", data: "2024-12-21", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "14-2024-12-21-21h-Empresa-Penha", data: "2024-12-21", horario: "21h", local: "Missa na Empresa Penha", padre: "Padre Eudásio" },

    { id: "15-2024-12-22-07h-Matriz", data: "2024-12-22", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "28-2024-12-22-07h-Divino", data: "2024-12-22", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "16-2024-12-22-09h-Matriz", data: "2024-12-22", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "17-2024-12-22-15h30-Santos-Dumont", data: "2024-12-22", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "18-2024-12-22-17h-Centro-de-Pastoral", data: "2024-12-22", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "29-2024-12-22-17h-Divino", data: "2024-12-22", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "19-2024-12-22-19h-Nova-Parque-Iracema", data: "2024-12-22", horario: "19h", local: "Nova Parque Iracema", padre: "Padre Eudásio" },
    { id: "30-2024-12-22-19h-Matriz", data: "2024-12-22", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "31-2024-12-23-19h-Aratuba", data: "2024-12-23", horario: "19h", local: "Aratuba (Festa de São Francisco de Paula)", padre: "Padre Eudásio" },


    { id: "32-2024-12-24-19h-Matriz", data: "2024-12-24", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "50-2024-12-24-19h-Divino", data: "2024-12-24", horario: "19h", local: "Divino", padre: "Padre Ivan" },
    { id: "33-2024-12-24-21h-Parque-Sao-Joao", data: "2024-12-24", horario: "21h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "51-2024-12-24-21h-Nova-Pq-Iracema", data: "2024-12-24", horario: "21h", local: "Nova Parque Iracema", padre: "Padre Ivan" },
    { id: "34-2024-12-24-24h-Matriz", data: "2024-12-24", horario: "00h", local: "Matriz (Missa do Galo)", padre: "Padre Eudásio" },


    { id: "35-2024-12-25-07h-Divino", data: "2024-12-25", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "52-2024-12-25-07h-Matriz", data: "2024-12-25", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "36-2024-12-25-09h-Matriz", data: "2024-12-25", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "53-2024-12-25-09h-Sao-Jose", data: "2024-12-25", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "37-2024-12-25-17h-Centro-de-Pastoral", data: "2024-12-25", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "54-2024-12-25-17h-Divino", data: "2024-12-25", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "38-2024-12-25-19h-Matriz", data: "2024-12-25", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },
    { id: "55-2024-12-25-19h-Parque-Sao-Joao", data: "2024-12-25", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },


    { id: "39-2024-12-26-19h-Mae-Rainha", data: "2024-12-26", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "56-2024-12-26-19h-Fortaleza", data: "2024-12-26", horario: "19h", local: "Fortaleza", padre: "Padre Ivan" },

    { id: "41-2024-12-27-19h-Rosario", data: "2024-12-27", horario: "19h", local: "Rosário", padre: "Padre Eudásio" },
    { id: "57-2024-12-27-19h-Conego-Pinto", data: "2024-12-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Ivan" },


    { id: "43-2024-12-28-17h-Santa-Dulce", data: "2024-12-28", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "59-2024-12-28-17h-Abrigo", data: "2024-12-28", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "44-2024-12-28-19h-Outra-Banda", data: "2024-12-28", horario: "19h", local: "Outra Banda", padre: "Padre Eudásio" },
    { id: "60-2024-12-28-19h-Matriz", data: "2024-12-28", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "45-2024-12-29-07h-Divino", data: "2024-12-29", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "61-2024-12-29-07h-Matriz", data: "2024-12-29", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "46-2024-12-29-09h-Matriz", data: "2024-12-29", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "47-2024-12-29-17h-Centro-de-Pastoral", data: "2024-12-29", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "62-2024-12-29-17h-Divino", data: "2024-12-29", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "48-2024-12-29-19h-Matriz", data: "2024-12-29", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "63-2024-12-29-19h-Parque-Sao-Joao", data: "2024-12-29", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },


    { id: "49-2024-12-31-19h-Matriz", data: "2024-12-31", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "64-2024-12-31-19h-Divino", data: "2024-12-31", horario: "19h", local: "Divino", padre: "Padre Ivan" },

    { id: "66-2025-01-01-07h-Matriz", data: "2025-01-01", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "81-2025-01-01-07h-Divino", data: "2025-01-01", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "82-2025-01-01-17h-Divino", data: "2025-01-01", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "67-2025-01-01-19h-Matriz", data: "2025-01-01", horario: "19h", local: "Matriz (Missa pelas Famílias)", padre: "Padre Eudásio" },


    { id: "83-2025-01-02-08h-Confissoes-Matriz", data: "2025-01-02", horario: "08h", local: "Matriz", padre: "Padre Ivan" },
    { id: "84-2025-01-02-17h-Mororo", data: "2025-01-02", horario: "17h", local: "Mororó", padre: "Padre Ivan" },
    { id: "68-2025-01-02-19h-Parque-das-Rosas", data: "2025-01-02", horario: "19h", local: "Parque das Rosas", padre: "Padre Eudásio" },

    { id: "69-2025-01-03-18h-Centro-de-Pastoral", data: "2025-01-03", horario: "18h", local: "Centro de Pastoral (1ª sexta)", padre: "Padre Eudásio" },

    { id: "72-2025-01-04-17h-Santo-Antonio", data: "2025-01-04", horario: "17h", local: "Santo Antônio", padre: "Padre Eudásio" },
    { id: "85-2025-01-04-17h-Santa-Luzia", data: "2025-01-04", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "73-2025-01-04-19h-Coite", data: "2025-01-04", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "86-2025-01-04-19h-Matriz", data: "2025-01-04", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "87-2025-01-05-07h-Matriz", data: "2025-01-05", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "74-2025-01-05-07h-Matriz", data: "2025-01-05", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "75-2025-01-05-09h-Matriz", data: "2025-01-05", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "88-2025-01-05-09h-Sao-Jose", data: "2025-01-05", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "76-2025-01-05-11h-Sitio-Marista", data: "2025-01-05", horario: "11h", local: "Sítio Marista (Ação de Graças)", padre: "Padre Eudásio" },
    { id: "77-2025-01-05-17h-Centro-de-Pastoral", data: "2025-01-05", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "89-2025-01-05-17h-Parque-Sao-Joao", data: "2025-01-05", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-01-05-19h-Matriz", data: "2025-01-05", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "80-2025-01-10-18h-Procissao-Sao-Sebastiao", data: "2025-01-10", horario: "18h", local: "Abertura da Festa de São Sebastião", padre: "Padre Eudásio" },
    { id: "91-2025-01-10-18h-Procissao-Sao-Sebastiao", data: "2025-01-10", horario: "18h", local: "Abertura da Festa de São Sebastião", padre: "Padre Ivan" }
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
      />

    </div>
  );
};

export default CalendarioPadres;