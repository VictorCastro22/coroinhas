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

const EscalaFixa: React.FC = () => {
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [coroinhas, setCoroinhasList] = useState<Coroinha[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const escalas = useMemo(() => [
    { id: "78-2025-04-01-19h-Villares", data: "2025-04-01", horario: "19h", local: "Vilares", padre: "Padre Ivan" },
    { id: "78-2025-04-01-19h-Urucará", data: "2025-04-01", horario: "19h", local: "Urucará", padre: "Padre Eudásio" },

    { id: "78-2025-04-02-19h-Matriz", data: "2025-04-02", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-02-19h-Guabiraba", data: "2025-04-02", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-04-03-19h-Matriz", data: "2025-04-03", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "78-2025-04-03-19h-Guabiraba", data: "2025-04-03", horario: "19h", local: "Mororó", padre: "Padre Ivan" },

    { id: "78-2025-04-04-18h-CP", data: "2025-04-04", horario: "18h30", local: "Centro Pastoral (Primeira sexta)", padre: "Padre Eudásio" },
    { id: "78-2025-04-04-18h-CP", data: "2025-04-04", horario: "18h30", local: "Centro Pastoral (Primeira sexta)", padre: "Padre Rafael" },

    { id: "78-2025-04-05-17h-SantoAntonio", data: "2025-04-05", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-04-05-17h-SantaLuzia", data: "2025-04-05", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "78-2025-04-05-19h-Coite", data: "2025-04-05", horario: "19h", local: "Coité", padre: "Padre Eudásio" },
    { id: "78-2025-04-05-19h-Matriz", data: "2025-04-05", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-05-19h-BatismoDivino", data: "2025-04-05", horario: "19h", local: "Batismo no Divino", padre: "Padre Rafael" },

    { id: "78-2025-04-06-07h-Matriz", data: "2025-04-06", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-07h-Divino", data: "2025-04-06", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-06-09h-Matriz", data: "2025-04-06", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-09h-SaoJose", data: "2025-04-06", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-04-06-10h30-BatismoMatriz", data: "2025-04-06", horario: "10h30", local: "Batismo na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-06-17h-CentroPastoral", data: "2025-04-06", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-06-17h-Divino", data: "2025-04-06", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-06-17h-PqSaoJoao", data: "2025-04-06", horario: "17h", local: "Parque São João com Batismo", padre: "Padre Rafael" },
    { id: "78-2025-04-06-19h-NPIracema", data: "2025-04-06", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    { id: "78-2025-04-06-19h-Matriz", data: "2025-04-06", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-04-08-19h-Matriz", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Eudásio" },
    { id: "78-2025-04-08-19h-Matriz", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Rafael" },
    { id: "78-2025-04-08-19h-Matriz", data: "2025-04-08", horario: "19h", local: "Matriz (Missa Votiva a NSP)", padre: "Padre Ivan" },

    { id: "78-2025-04-09-19h-MissaFamilias", data: "2025-04-09", horario: "19h", local: "Missa pelas famílias", padre: "Padre Rafael" },
    { id: "78-2025-04-09-19h-SantosDumont", data: "2025-04-09", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-04-11-19h-MatrizJubilar", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Eudásio" },
    { id: "78-2025-04-11-19h-MatrizJubilar", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Rafael" },
    { id: "78-2025-04-11-19h-MatrizJubilar", data: "2025-04-11", horario: "19h", local: "Matriz (Missa Jubilar)", padre: "Padre Ivan" },

    { id: "78-2025-04-12-19h-Matriz", data: "2025-04-12", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-12-19h-OutraBanda", data: "2025-04-12", horario: "18h", local: "Outra Banda", padre: "Padre Eudásio" },
    { id: "78-2025-04-12-19h-BatismoOutraBanda", data: "2025-04-12", horario: "19h", local: "Batismo na Outra Banda", padre: "Padre Rafael" },

    { id: "78-2025-04-13-07h-Matriz", data: "2025-04-13", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-07h-Abrigo", data: "2025-04-13", horario: "07h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-04-13-07h-Divino", data: "2025-04-13", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-13-09h-Matriz", data: "2025-04-13", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-09h-BatismoCoite", data: "2025-04-13", horario: "09h", local: "Batismo no Coité", padre: "Padre Rafael" },
    { id: "78-2025-04-13-12h-Matriz", data: "2025-04-13", horario: "12h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-04-13-15h30-Vilares", data: "2025-04-13", horario: "15h30", local: "Vilares", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-17h-CentroPastoral", data: "2025-04-13", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-13-17h-PqSaoJoao", data: "2025-04-13", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-04-13-17h-Divino", data: "2025-04-13", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-13-19h-Matriz", data: "2025-04-13", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-13-19h-NPIracema", data: "2025-04-13", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
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