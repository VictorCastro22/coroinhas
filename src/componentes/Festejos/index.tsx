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
      { id: "78-2025-01-23-18:30h-Urucara", data: "2025-01-23", horario: "19h", local: "Urucará (abertura da festa de N. Sra. das Candeias)", padre: "Padre Eudásio" },
      { id: "80-2025-01-24-19h-Urucara", data: "2025-01-24", horario: "19h", local: "Urucará", padre: "Padre Rafhael" },
      { id: "80-2025-01-27-19h-Urucara", data: "2025-01-27", horario: "19h", local: "Urucará", padre: "Padre Antônio" },
      { id: "80-2025-01-28-19h-Urucara", data: "2025-01-28", horario: "19h", local: "Urucará", padre: "Padre João Paulo" },
      { id: "80-2025-01-29-19h-Urucara", data: "2025-01-29", horario: "19h", local: "Urucará", padre: "Padre Cláudio" },
      { id: "80-2025-01-31-19h-Urucara", data: "2025-01-31", horario: "19h", local: "Urucará", padre: "Padre John Lennon" },
      { id: "80-2025-02-01-19h-Urucara", data: "2025-02-01", horario: "19h", local: "Urucará", padre: "Padre Aurénio" },
      { id: "78-2025-02-02-19h-Urucara", data: "2025-02-02", horario: "19h", local: "Urucará (Encerramento)", padre: "Padre Ivan" },
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
    doc.text("Escala N.S das Candeias", 14, 22);

    filteredEscalas.forEach((escala, index) => {
      const y = 40 + index * 10;
      doc.setFontSize(12);
      doc.text(`Data: ${escala.data}`, 14, y);
      doc.text(`Horário: ${escala.horario}`, 50, y);
      doc.text(`Local: ${escala.local}`, 80, y);
      doc.text(`Padre: ${escala.padre}`, 160, y);
    });

    doc.save("n.s-candeias.pdf");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full mb-6">
        <img
          src="/n.s-candeias.png"
          alt="Logo Festejos"
          style={{ height: '180px' }}
          className="w-full object-cover"
        />
      </div>


      <h1 className="text-2xl font-bold text-center mb-6">Nossa Senhora das Candeias</h1>

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
        className="px-4 py-2 bg-blue-300 hover:bg-blue-600 text-white rounded-md"
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