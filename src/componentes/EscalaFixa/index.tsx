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
    { id: "78-2025-02-25-19h-SaoPedro", data: "2025-02-25", horario: "19h", local: "São Pedro", padre: "Padre Rafael" },

    { id: "78-2025-02-26-19h-SantosDumont", data: "2025-02-26", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },
    { id: "78-2025-02-26-19h-MatrizFamilias", data: "2025-02-26", horario: "19h", local: "Matriz (Missa pelas famílias)", padre: "Padre Rafael" },

    { id: "78-2025-02-27-19h-CampoDoNilo", data: "2025-02-27", horario: "19h", local: "Campo do Nilo", padre: "Padre Ivan" },
    { id: "78-2025-02-27-19h-MaeRainha", data: "2025-02-27", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },

    { id: "78-2025-03-01-07h30-CPP", data: "2025-03-01", horario: "07:30h", local: "CPP", padre: "Padre Eudásio" },
    { id: "79-2025-03-01-07h30-CPP", data: "2025-03-01", horario: "07:30h", local: "CPP", padre: "Padre Rafael" },
    { id: "78-2025-03-01-17h-SantaLuzia", data: "2025-03-01", horario: "17h", local: "Santa Luzia", padre: "Padre Eudásio" },
    { id: "78-2025-03-01-17h-SantoAntonio", data: "2025-03-01", horario: "17h", local: "Santo Antônio", padre: "Padre Rafael" },
    { id: "78-2025-03-01-19h-Matriz", data: "2025-03-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-01-19h-Coite", data: "2025-03-01", horario: "19h", local: "Coité", padre: "Padre Rafael" },

    { id: "78-2025-03-02-07h-Divino", data: "2025-03-02", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-07h-Matriz", data: "2025-03-02", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-02-09h-Matriz", data: "2025-03-02", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-09h-SaoJose", data: "2025-03-02", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-03-02-17h-CentroPastoral", data: "2025-03-02", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-17h-Divino", data: "2025-03-02", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-02-19h-Matriz", data: "2025-03-02", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-02-19h-NPqIracema", data: "2025-03-02", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-03-05-07h-Matriz", data: "2025-03-05", horario: "07h", local: "Matriz (Missa das Cinzas)", padre: "Padre Eudásio" },
    { id: "78-2025-03-05-07h-Divino", data: "2025-03-05", horario: "07h", local: "Divino (Missa das Cinzas)", padre: "Padre Rafael" },
    { id: "78-2025-03-05-17h-Divino", data: "2025-03-05", horario: "17h", local: "Divino (Missa das Cinzas)", padre: "Padre Eudásio" },
    { id: "78-2025-03-05-17h-ConfissoesMatriz", data: "2025-03-05", horario: "17h", local: "Confissões na Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-05-19h-Matriz", data: "2025-03-05", horario: "19h", local: "Missa pelas famílias e das Cinzas", padre: "Padre Rafael" },

    { id: "78-2025-03-06-08h-ConfissoesMatriz", data: "2025-03-06", horario: "08h", local: "Confissões na Matriz", padre: "Padre Ivan" },
    { id: "78-2025-03-06-19h-EncontroPastoral", data: "2025-03-06", horario: "19h", local: "Encontro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-03-06-19h-ParqueRosas", data: "2025-03-06", horario: "19h", local: "Parque das Rosas", padre: "Padre Rafael" },
    { id: "78-2025-03-06-19h-Mororo", data: "2025-03-06", horario: "19h", local: "Mororó", padre: "Padre Ivan" },

    { id: "78-2025-03-07-08h-VisitaEnfermos", data: "2025-03-07", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Eudásio" },
    { id: "78-2025-03-07-08h-VisitaEnfermos", data: "2025-03-07", horario: "08h", local: "Visita aos Enfermos", padre: "Padre Rafael" },
    { id: "78-2025-03-07-18h-ConfissoesCentroPastoral", data: "2025-03-07", horario: "18h", local: "Confissões no Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Eudásio" },
    { id: "79-2025-03-07-18h30-AdoracaoSS", data: "2025-03-07", horario: "18:30h", local: "Adoração (Centro Pastoral)", padre: "Padre Rafael" },


    { id: "78-2025-03-08-07h30-DiaDMissionario", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Eudásio" },
    { id: "78-2025-03-08-07h30-DiaDMissionarioPq", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Ivan" },
    { id: "78-2025-03-08-07h30-DiaDMissionarioPqSantaFe", data: "2025-03-08", horario: "07:30h", local: "Dia 'D' Missionário", padre: "Padre Rafael" },
    { id: "78-2025-03-08-19h-Matriz", data: "2025-03-08", horario: "19h", local: "Matriz (Missa votiva a N. Sra. da Penha)", padre: "Padre Eudásio" },

    { id: "78-2025-03-09-07h-Matriz", data: "2025-03-09", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-07h-Divino", data: "2025-03-09", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-03-09-07h-Abrigo", data: "2025-03-09", horario: "07h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "78-2025-03-09-09h-Matriz", data: "2025-03-09", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-17h-PqSaoJoao", data: "2025-03-09", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-17h-CentroPastoral", data: "2025-03-09", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-03-09-17h-Divino", data: "2025-03-09", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-03-09-19h-SaoJose", data: "2025-03-09", horario: "19h", local: "São José (Bandeira da festa)", padre: "Padre Eudásio" },
    { id: "78-2025-03-09-19h-Matriz", data: "2025-03-09", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-03-09-19h-NPqIracema", data: "2025-03-09", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" }
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