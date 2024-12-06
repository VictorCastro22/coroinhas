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

const Festejos: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [coroinhas, setCoroinhasList] = useState<Coroinha[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const escalas = useMemo(
    () => [
      { id: "01-Festejos", data: "2025-01-10", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "02-Festejos", data: "2025-01-11", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "03-Festejos", data: "2025-01-12", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "04-Festejos", data: "2025-01-13", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "05-Festejos", data: "2025-01-14", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "06-Festejos", data: "2025-01-15", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "07-Festejos", data: "2025-01-16", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "08-Festejos", data: "2025-01-17", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "09-Festejos", data: "2025-01-18", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "10-Festejos", data: "2025-01-19", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
      { id: "11-Festejos", data: "2025-01-20", horario: "18h", local: "Matriz", padre: "Padre Eudásio" },
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
    doc.text("Escala de Festejos São Sebastião", 14, 22);

    filteredEscalas.forEach((escala, index) => {
      const y = 40 + index * 10;
      doc.setFontSize(12);
      doc.text(`Data: ${escala.data}`, 14, y);
      doc.text(`Horário: ${escala.horario}`, 60, y);
      doc.text(`Local: ${escala.local}`, 110, y);
      doc.text(`Padre: ${escala.padre}`, 160, y);
    });

    doc.save("festejos-sao-sebastiao.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mb-6">
        <img
          src="/logo-coroinha.jpeg"
          alt="Logo Festejos"
          className="w-full h-32 md:h-48 lg:h-64 object-cover"
        />
      </div>
      <h1 className="text-2xl font-bold text-center mb-6">Festejos São Sebastião</h1>

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
          className="px-4 py-2 bg-red-500 text-white rounded-md"
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

export default Festejos;