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