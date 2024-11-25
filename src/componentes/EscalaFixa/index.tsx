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
    { id: "1-2024-11-26-19h-São-Benedito", data: "2024-11-26", horario: "19h", local: "São Benedito", padre: "Padre Eudásio" },
    { id: "2-2024-11-26-19h-São-Pedro", data: "2024-11-26", horario: "19h", local: "São Pedro", padre: "Padre Ivan" },
    { id: "1-2024-11-27-19h-Cônego-Pinto", data: "2024-11-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Eudásio" },
    { id: "2-2024-11-27-19h-Santos-Dumont", data: "2024-11-27", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "1-2024-11-28-19h-Mãe-Rainha", data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "2-2024-11-28-19h-Campo-Delta", data: "2024-11-28", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },
    { id: "2-2024-11-29-19h-Rosário", data: "2024-11-29", horario: "19h", local: "Rosário", padre: "Padre Ivan" },
    { id: "2-2024-11-30-19h-Matriz", data: "2024-11-30", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "1-2024-11-30-20h-Casamento-na-Matriz", data: "2024-11-30", horario: "20h", local: "Casamento na Matriz", padre: "Padre Eudásio" },
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