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
    { id: "1-2024-11-28-19h-Mãe-Rainha", data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Thallys" },
    { id: "2-2024-11-28-19h-Campo-Delta", data: "2024-11-28", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "2-2024-11-29-19h-Rosário", data: "2024-11-29", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "2-2024-11-30-19h-Matriz", data: "2024-11-30", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "1-2024-11-30-20h-Casamento-na-Matriz", data: "2024-11-30", horario: "20h", local: "Casamento na Matriz", padre: "Padre Eudásio" },

    { id: "19-2024-12-01-07h-Matriz", data: "2024-12-01", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "34-2024-12-01-07h-Divino", data: "2024-12-01", horario: "07h", local: "Divino", padre: "Diác. João Paulo" },
    { id: "20-2024-12-01-09h-Matriz", data: "2024-12-01", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "35-2024-12-01-09h-Sao-Jose", data: "2024-12-01", horario: "09h", local: "São José", padre: "Celebrante Leanderson" },
    { id: "2-2024-12-01-17h-Centro-de-Pastoral", data: "2024-12-01", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "21-2024-12-01-17h-Divino", data: "2024-12-01", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "3-2024-12-01-19h-Matriz", data: "2024-12-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "22-2024-12-01-19h-Parque-Sao-Joao", data: "2024-12-01", horario: "19h", local: "Parque São João", padre: "Padre Ivan" },

    { id: "5-2024-12-03-19h-Vila-da-Serra-do-Lagedo", data: "2024-12-03", horario: "19h", local: "Vila da Serra do Lagêdo", padre: "Padre Eudásio" },
    { id: "24-2024-12-03-19h-Santa-Luzia", data: "2024-12-03", horario: "19h", local: "Santa Luzia (Procissão e Missa)", padre: "Padre Ivan" },
    { id: "36-2024-12-03-19h-Vilares", data: "2024-12-03", horario: "19h", local: "Vilares", padre: "Marquinhos/Elzir" },
    { id: "36-2024-12-03-19h-Urucará", data: "2024-12-03", horario: "19h", local: "Urucará", padre: "Diác. João Paulo" },

    { id: "8-2024-12-04-19h-Missa-pelas-familias", data: "2024-12-04", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Eudásio" },
    { id: "25-2024-12-04-19h-Guabiraba", data: "2024-12-04", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "27-2024-12-05-19h-Parque-Rosas", data: "2024-12-05", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },
    { id: "27-2024-12-05-19h-Mororó", data: "2024-12-05", horario: "19h", local: "Mororó", padre: "Celebrante Edilson " },

    { id: "11-2024-12-06-18h-Centro-de-Pastoral", data: "2024-12-06", horario: "18h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "12-2024-12-06-19h-Adoracao-SS-Sacramento", data: "2024-12-06", horario: "19h", local: "Adoração ao SS. Sacramento", padre: "Padre Eudásio" },
    { id: "28-2024-12-06-19h-Lages", data: "2024-12-06", horario: "19h", local: "Lages", padre: "Padre Ivan" },

   
    { id: "29-2024-12-07-17h-Santo-Antonio", data: "2024-12-07", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "14-2024-12-07-19h-Coite", data: "2024-12-07", horario: "19h", local: "Coité (Missa e batizados)", padre: "Padre Eudásio" },
    { id: "30-2024-12-07-19h-Matriz", data: "2024-12-07", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "15-2024-12-08-07h-Matriz", data: "2024-12-08", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "31-2024-12-08-07h-Divino", data: "2024-12-08", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "16-2024-12-08-09h-Matriz", data: "2024-12-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "17-2024-12-08-17h-Centro-de-Pastoral", data: "2024-12-08", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "32-2024-12-08-17h-Divino", data: "2024-12-08", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "18-2024-12-08-19h-Matriz", data: "2024-12-08", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "33-2024-12-08-19h-Nova-Parque-Iracema", data: "2024-12-08", horario: "19h", local: "Nova Parque Iracema", padre: "Padre Ivan" }, 
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
      doc.text(`Data: ${escala.data}`, 14, y);
      doc.text(`Horário: ${escala.horario}`, 60, y);
      doc.text(`Local: ${escala.local}`, 110, y);
      doc.text(`Padre: ${escala.padre}`, 160, y);
    });
  
    doc.save("escala-coroinha.pdf");
  };  

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mb-6">
        <img src="/logo-coroinha.jpeg" alt="Logo Coroinha" className="w-full h-32 md:h-48 lg:h-64 object-cover" />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">
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