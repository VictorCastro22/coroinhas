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
  { "id": "302-2025-09-10-19h-MissaFamilias", "data": "2025-09-10", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "203-2025-09-10-19h-SantosDumont", "data": "2025-09-10", "horario": "19hs", "local": "Santos Dumont", "padre": "Padre Ivan" },
  { "id": "303-2025-09-11-19h-Pirapora", "data": "2025-09-11", "horario": "19hs", "local": "Pirapora", "padre": "Padre Rafael" },
  { "id": "205-2025-09-11-19h-MaeRainha", "data": "2025-09-11", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Ivan" },
  { "id": "306-2025-09-12-19h-MatrizMissaJubilar", "data": "2025-09-12", "horario": "19hs", "local": "Matriz (Missa Jubilar)", "padre": "Padre Rafael" },
  { "id": "307-2025-09-13-12h-Matriz", "data": "2025-09-13", "horario": "12hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "207-2025-09-13-17h-Vilares", "data": "2025-09-13", "horario": "17hs", "local": "Vilares", "padre": "Padre Ivan" },
  { "id": "309-2025-09-13-19h-PqDasRosasFesta", "data": "2025-09-13", "horario": "19hs", "local": "Parque das Rosas (Festa de Nossa Sra. das Dores)", "padre": "Padre Rafael" },
  { "id": "208-2025-09-13-19h-PqSaoJoao", "data": "2025-09-13", "horario": "19hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "310-2025-09-14-07h-Divino", "data": "2025-09-14", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "209-2025-09-14-07h-Matriz", "data": "2025-09-14", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "210-2025-09-14-09h-Matriz", "data": "2025-09-14", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "312-2025-09-14-17h-CentroPastoralAdmissao", "data": "2025-09-14", "horario": "17hs", "local": "Centro de Pastoral (Admissão dos adultos na Catequese)", "padre": "Padre Rafael" },
  { "id": "211-2025-09-14-17h-Divino", "data": "2025-09-14", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "313-2025-09-14-19h-MatrizReinvestidura", "data": "2025-09-14", "horario": "19hs", "local": "Matriz (Reinvestidura dos Coroinhas veteranos)", "padre": "Padre Rafael" },
  { "id": "212-2025-09-14-19h-NovoPqIracema", "data": "2025-09-14", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
  { "id": "213-2025-09-15-19h-PqDasRosasFesta", "data": "2025-09-15", "horario": "19hs", "local": "Parque das Rosas (Festa da Mãe das Dores)", "padre": "Padre Ivan" },
  { "id": "214-2025-09-16-19h-TangueiraBandeira", "data": "2025-09-16", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra da Piedade)", "padre": "Padre Ivan" },
  { "id": "316-2025-09-17-19h-MissaFamilias", "data": "2025-09-17", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "215-2025-09-17-19h-Guabiraba", "data": "2025-09-17", "horario": "19hs", "local": "Guabiraba", "padre": "Padre Ivan" },
  { "id": "317-2025-09-18-19h-TangueiraFesta", "data": "2025-09-18", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra. da Piedade)", "padre": "Padre Rafael" },
  { "id": "217-2025-09-18-19h-PqSantaFe", "data": "2025-09-18", "horario": "19hs", "local": "Parque Santa Fé", "padre": "Padre Ivan" },
  { "id": "319-2025-09-19-19h-Rosario", "data": "2025-09-19", "horario": "19hs", "local": "Rosário", "padre": "Padre Rafael" },
  { "id": "218-2025-09-19-19h-AreaVerde", "data": "2025-09-19", "horario": "19hs", "local": "Área Verde (Areninha)", "padre": "Padre Ivan" },
  { "id": "85-2025-09-20-17h-SantaLuzia", "data": "2025-09-20", "horario": "17hs", "local": "Santa Luzia", "padre": "Padre Eudásio" },
  { "id": "219-2025-09-20-17h-SantoAntonio", "data": "2025-09-20", "horario": "17hs", "local": "Santo Antônio", "padre": "Padre Ivan" },
  { "id": "86-2025-09-20-18h-BatismoMatriz", "data": "2025-09-20", "horario": "18hs", "local": "Batismo na Matriz", "padre": "Padre Eudásio" },
  { "id": "87-2025-09-20-19h-Matriz", "data": "2025-09-20", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "220-2025-09-20-19h-Coite", "data": "2025-09-20", "horario": "19hs", "local": "Coité", "padre": "Padre Ivan" },
  { "id": "88-2025-09-20-20h-CasamentoMatriz", "data": "2025-09-20", "horario": "20hs", "local": "Casamento na Matriz", "padre": "Padre Eudásio" },
  { "id": "320-2025-09-21-07h-Matriz", "data": "2025-09-21", "horario": "07hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "221-2025-09-21-07h-Divino", "data": "2025-09-21", "horario": "07hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "89-2025-09-21-09h-Matriz", "data": "2025-09-21", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "222-2025-09-21-09h-SaoJose", "data": "2025-09-21", "horario": "09hs", "local": "São José", "padre": "Padre Ivan" },
  { "id": "90-2025-09-21-17h-CentroPastoral", "data": "2025-09-21", "horario": "17hs", "local": "Centro de Pastoral (Admissão de Adultos na Catequese)", "padre": "Padre Eudásio" },
  { "id": "321-2025-09-21-17h-Divino", "data": "2025-09-21", "horario": "17hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "223-2025-09-21-17h-PqSaoJoao", "data": "2025-09-21", "horario": "17hs", "local": "Parque São João", "padre": "Padre Ivan" },
  { "id": "91-2025-09-21-19h-Matriz", "data": "2025-09-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "322-2025-09-21-19h-NPqIracema", "data": "2025-09-21", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Rafael" },
  { "id": "224-2025-09-22-19h-SerraPeladaBandeira", "data": "2025-09-22", "horario": "19hs", "local": "Serra Pelada (Festa de Santa Terezinha)", "padre": "Padre Ivan" },
  { "id": "92-2025-09-23-Pirapora", "data": "2025-09-23", "horario": "", "local": "Pirapora (Festa de São Francisco)", "padre": "Padre Eudásio" },
  { "id": "325-2025-09-24-19h-MissaFamilias", "data": "2025-09-24", "horario": "19hs", "local": "Missa pelas famílias", "padre": "Padre Rafael" },
  { "id": "226-2025-09-24-19h-MororoBandeira", "data": "2025-09-24", "horario": "19hs", "local": "Mororó (Festa de São Francisco)", "padre": "Padre Ivan" },
  { "id": "94-2025-09-25-19h-MaeRainha", "data": "2025-09-25", "horario": "19hs", "local": "Mãe Rainha", "padre": "Padre Eudásio" },
  { "id": "228-2025-09-25-19h-SaoBeneditoBandeira", "data": "2025-09-25", "horario": "19hs", "local": "São Benedito (Festa de São Benedito)", "padre": "Padre Ivan" },
  { "id": "328-2025-09-26-19h-TangueiraFesta", "data": "2025-09-26", "horario": "19hs", "local": "Tangueira (Festa de Nossa Sra. da Piedade)", "padre": "Padre Rafael" },
  { "id": "229-2025-09-26-19h-ConegoPinto", "data": "2025-09-26", "horario": "19hs", "local": "Cônego Pinto", "padre": "Padre Ivan" },
  { "id": "96-2025-09-27-17h-SantaDulce", "data": "2025-09-27", "horario": "17hs", "local": "Santa Dulce", "padre": "Padre Eudásio" },
  { "id": "230-2025-09-27-17h-Abrigo", "data": "2025-09-27", "horario": "17hs", "local": "Abrigo", "padre": "Padre Ivan" },
  { "id": "97-2025-09-27-19h-OutraBanda", "data": "2025-09-27", "horario": "19hs", "local": "Outra Banda", "padre": "Padre Eudásio" },
  { "id": "329-2025-09-27-19h-SaoBeneditoFesta", "data": "2025-09-27", "horario": "19hs", "local": "São Benedito (Festa)", "padre": "Padre Rafael" },
  { "id": "231-2025-09-27-19h-RosarioBandeira", "data": "2025-09-27", "horario": "19hs", "local": "Rosário (Festa de Nossa Sra. do Rosário)", "padre": "Padre Ivan" },
  { "id": "330-2025-09-28-07h-Divino", "data": "2025-09-28", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "232-2025-09-28-07h-Matriz", "data": "2025-09-28", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "98-2025-09-28-08h15-BatismoMatriz", "data": "2025-09-28", "horario": "08:15hs", "local": "Batismo na Matriz", "padre": "Padre Eudásio" },
  { "id": "99-2025-09-28-09h-Matriz", "data": "2025-09-28", "horario": "09hs", "local": "Matriz", "padre": "Padre Eudásio" },
  { "id": "100-2025-09-28-15h30-SantosDumont", "data": "2025-09-28", "horario": "15:30hs", "local": "Santos Dumont", "padre": "Padre Eudásio" },
  { "id": "101-2025-09-28-17h-PqSaoJoao", "data": "2025-09-28", "horario": "17hs", "local": "Parque São João", "padre": "Padre Eudásio" },
  { "id": "331-2025-09-28-17h-CentroPastoral", "data": "2025-09-28", "horario": "17hs", "local": "Centro de Pastoral", "padre": "Padre Rafael" },
  { "id": "233-2025-09-28-17h-Divino", "data": "2025-09-28", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "332-2025-09-28-19h-Matriz", "data": "2025-09-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "234-2025-09-28-19h-NPqIracema", "data": "2025-09-28", "horario": "19hs", "local": "Novo Parque Iracema", "padre": "Padre Ivan" },
  { "id": "333-2025-09-30-19h-AbrigoTriduo", "data": "2025-09-30", "horario": "19hs", "local": "Abrigo (Tríduo de São Francisco)", "padre": "Padre Rafael" }
           
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