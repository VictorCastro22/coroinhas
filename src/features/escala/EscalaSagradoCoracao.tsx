import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";
import jsPDF from "jspdf";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

const EscalaSagradoCoracao: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [coroinhas, setCoroinhasList] = useState<Coroinha[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const escalas = useMemo(
    () => [
        { id: "80-2025-06-16-19h-SCoração", data: "2025-06-16", horario: "19h", local: "Sagrado Coração", padre: "Padre Ivan" },
        { id: "80-2025-06-17-19h-SCoração", data: "2025-06-17", horario: "19h", local: "Sagrado Coração", padre: "Padre Geisso" },
        { id: "80-2025-06-21-19h-SCoração", data: "2025-06-21", horario: "19h", local: "Sagrado Coração", padre: "Padre Rafael" },
        { id: "80-2025-06-23-19h-SCoração", data: "2025-06-23", horario: "19h", local: "Sagrado Coração", padre: "Padre João Paulo" },
        { id: "80-2025-06-24-19h-SCoração", data: "2025-06-24", horario: "19h", local: "Sagrado Coração", padre: "Padre Cosmo" },
        { id: "80-2025-06-27-19h-SCoração", data: "2025-06-27", horario: "19h", local: "Sagrado Coração", padre: "Padre Eudásio" },
    ],
    []
  );

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

  const filteredCoroinhas = coroinhas.filter((coroinha) =>
    coroinha.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEscalas = escalas.filter((escala) =>
    filteredCoroinhas.some((coroinha) =>
      coroinhasData[escala.id]?.some((c) => c.id === coroinha.id)
    )
  );

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Escala Sagrado Coração", 14, 22);

    filteredEscalas.forEach((escala, index) => {
      const y = 40 + index * 10;
      doc.setFontSize(12);
      doc.text(`Data: ${escala.data}`, 14, y);
      doc.text(`Horário: ${escala.horario}`, 50, y);
      doc.text(`Local: ${escala.local}`, 80, y);
      doc.text(`Padre: ${escala.padre}`, 160, y);
    });

    doc.save("sagrado-coração.pdf");
  };

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Sagrado Coração
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
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
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
          coroinhas={coroinhasData[escala.id] || []}
          onAddCoroinha={() => {}}
          onDeleteCoroinha={() => {}}
          isPublicView={true}
        />
      ))}
    </div>
  );
};

export default EscalaSagradoCoracao;