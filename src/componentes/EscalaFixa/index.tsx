import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../CardEscala";
import jsPDF from "jspdf";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [coroinhas, setCoroinhasList] = useState<Coroinha[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const escalas = useMemo(() => [
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

    { id: "78-2025-02-04-19h-Vilares", data: "2025-02-04", horario: "19h", local: "Vilares", padre: "Padre Ivan" },

    { id: "78-2025-02-05-19h-Matriz", data: "2025-02-05", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Ivan" },

    { id: "78-2025-02-06-19h-ParqueDasRosas", data: "2025-02-06", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },

    { id: "77-2025-02-07-18h-AnoJubilarMatriz", data: "2025-02-07", horario: "18h", local: "Abertura do Ano Jubilar", padre: "Dom Gregório" },
    { id: "78-2025-02-07-18h-AnoJubilarMatriz", data: "2025-02-07", horario: "18h", local: "Abertura do Ano Jubilar", padre: "Padre Eudásio" },
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

  ], []);

  useEffect(() => {
    const fetchCoroinhas = async () => {
      const querySnapshot = await getDocs(collection(db, "coroinhas"));
      const coroinhasData: { [key: string]: Coroinha[] } = {};
      const coroinhasList: Coroinha[] = [];

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        const cardId = data.cardId;
        if (!coroinhasData[cardId]) coroinhasData[cardId] = [];
        const coroinha = { id: doc.id, nome: data.nome, foto: data.foto };
        coroinhasData[cardId].push(coroinha);
        coroinhasList.push(coroinha);
      }

      setCoroinhas(coroinhasData);
      setCoroinhasList(coroinhasList);
    };

    fetchCoroinhas();
  }, []);

  const filteredCoroinhas = coroinhas.filter(coroinha =>
    coroinha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEscalas = escalas.filter(escala =>
    filteredCoroinhas.some(coroinha =>
      coroinhasData[escala.id]?.some(c => c.id === coroinha.id)
    )
  );

  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.setFontSize(18);
    doc.text("Escala de Serviço - Coroinha", 14, 22);
  
    if (searchTerm) {
      const coroinha = coroinhas.find(c => c.nome.toLowerCase() === searchTerm.toLowerCase());
      if (coroinha) {
        doc.setFontSize(14);
        doc.text(`Coroinha: ${coroinha.nome}`, 14, 30);
      }
    }
  
    filteredEscalas.forEach((escala, index) => {
      const y = 40 + (index * 10);
      doc.setFontSize(12);
      doc.setFontSize(12);
      doc.text(`Data: ${escala.data}`, 14, y);
      doc.text(`Horário: ${escala.horario}`, 50, y);
      doc.text(`Local: ${escala.local}`, 80, y);
      doc.text(`Padre: ${escala.padre}`, 160, y);
    });
  
    doc.save("escala-coroinha.pdf");
  };  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Escala Fixa
      </h1>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar coroinha"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-center mb-6">
        <button
          type="button"
          onClick={generatePDF}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Imprimir Escala em PDF
        </button>
      </div>

      {filteredEscalas.map((escala) => (
        <CardEscala
          key={escala.id}
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          coroinhas={coroinhasData[escala.id]?.filter(coroinha => coroinha.nome.toLowerCase().includes(searchTerm.toLowerCase())) || []}
          onAddCoroinha={() => {}}
          onDeleteCoroinha={() => {}}
          isPublicView={true}
        />
      ))}
    </div>
  );
};

export default EscalaFixa;