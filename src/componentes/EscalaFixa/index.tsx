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
    { id: "78-2025-02-11-19h-PlanaltoDosCajueiros", data: "2025-02-11", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Ivan" },
    { id: "78-2025-02-11-19h-SaoPedro", data: "2025-02-11", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "78-2025-02-12-19h-MatrizFamilias", data: "2025-02-12", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Rafael" },
    { id: "78-2025-02-12-19h-SantosDumont", data: "2025-02-12", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-02-13-12h-Matriz", data: "2025-02-13", horario: "12h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-02-13-17h-Vilares", data: "2025-02-13", horario: "17h", local: "Vilares", padre: "Padre Ivan" },
    { id: "78-2025-02-13-19h-MaeRainha", data: "2025-02-13", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-02-13-19h-PqSaoJoao", data: "2025-02-13", horario: "19h", local: "Pq. São João", padre: "Padre Ivan" },


    { id: "78-2025-02-14-19h-ConegoPinto", data: "2025-02-14", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "78-2025-02-14-19h-Rosario", data: "2025-02-14", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "78-2025-02-15-17h-SantoAntonio", data: "2025-02-15", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-02-15-17h-SantaLuzia", data: "2025-02-15", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },
    { id: "78-2025-02-15-19h-Matriz", data: "2025-02-15", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-02-15-19h-Coite", data: "2025-02-15", horario: "19h", local: "Coité", padre: "Padre Ivan" },

    { id: "78-2025-02-16-07h-Divino", data: "2025-02-16", horario: "07h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-02-16-07h-Matriz", data: "2025-02-16", horario: "07h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-02-16-09h-Matriz", data: "2025-02-16", horario: "09h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-02-16-09h-SaoJose", data: "2025-02-16", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-02-16-17h-CentroDePastoral", data: "2025-02-16", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-02-16-17h-Divino", data: "2025-02-16", horario: "17h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-02-16-19h-Matriz", data: "2025-02-16", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-02-16-19h-PqSaoJoao", data: "2025-02-16", horario: "19h", local: "Pq. São João", padre: "Padre Ivan" },

    { id: "78-2025-02-18-19h-Urucara", data: "2025-02-18", horario: "19h", local: "Urucará", padre: "Padre Rafael" },
    { id: "78-2025-02-18-19h-Pirapora", data: "2025-02-18", horario: "19h", local: "Pirapora", padre: "Padre Ivan" },

    { id: "78-2025-02-19-19h-Guabiraba", data: "2025-02-19", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    { id: "78-2025-02-19-19h-PadreCledisonFamilias", data: "2025-02-19", horario: "19h", local: "Missa pelas Famílias", padre: "Padre Cledison" },

    { id: "78-2025-02-20-19h-PqDasRosas", data: "2025-02-20", horario: "19h", local: "Pq. das Rosas", padre: "Padre Ivan" },
    { id: "78-2025-02-20-19h-AreaSecaCDD", data: "2025-02-20", horario: "19h", local: "Área Seca (CDD)", padre: "Padre Rafael" },

    { id: "78-2025-02-21-19h-AreaVerdeAreinha", data: "2025-02-21", horario: "19h", local: "Área Verde (Areinha)", padre: "Padre Ivan" },
    { id: "78-2025-02-21-19h-Rosario", data: "2025-02-21", horario: "19h", local: "Rosário", padre: "Padre Rafael" },

    { id: "78-2025-02-22-17h-SantaDulce", data: "2025-02-22", horario: "17h", local: "Santa Dulce", padre: "Padre Ivan" },
    { id: "78-2025-02-22-17h-Abrigo", data: "2025-02-22", horario: "17h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "78-2025-02-22-19h-Matriz", data: "2025-02-22", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-02-22-19h-OutraBanda", data: "2025-02-22", horario: "19h", local: "Outra Banda", padre: "Padre Rafael" },

    { id: "78-2025-02-23-07h-Divino", data: "2025-02-23", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-02-23-07h-Matriz", data: "2025-02-23", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-02-23-09h-Matriz", data: "2025-02-23", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-02-23-15h30-SantosDumont", data: "2025-02-23", horario: "15h30", local: "Santos Dumont", padre: "Padre Rafael" },
    { id: "78-2025-02-23-17h-CentroDePastoral", data: "2025-02-23", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-02-23-17h-Divino", data: "2025-02-23", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-02-23-19h-Matriz", data: "2025-02-23", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-02-23-19h-NovoParqueIracema", data: "2025-02-23", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-02-25-19h-SaoPedro", data: "2025-02-25", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "78-2025-02-26-19h-SantosDumont", data: "2025-02-26", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-02-26-19h-MatrizFamilias", data: "2025-02-26", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Rafael" },

    { id: "78-2025-02-27-19h-CampoDoNilo", data: "2025-02-27", horario: "19h", local: "Campo do Nilo", padre: "Padre Ivan" },
    { id: "78-2025-02-27-19h-MaeRainha", data: "2025-02-27", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-02-28-19h-ConegoPinto", data: "2025-02-28", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "78-2025-02-28-05-03-Chaval", data: "2025-02-28", horario: "28/02 a 05/03", local: "Chaval", padre: "Padre Ivan" }
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