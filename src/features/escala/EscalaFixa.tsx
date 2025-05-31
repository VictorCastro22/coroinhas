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
    { id: "78-2025-05-31-18h-CentroPastoral", data: "2025-05-31", horario: "18h", local: "Centro Pastoral - Procissão com as imagens peregrinas nas novenas", padre: "Padre Eudásio" },
    { id: "78-2025-05-31-18h-Procissao", data: "2025-05-31", horario: "18h", local: "Centro Pastoral (Procissão com as imagens peregrinas nas novenas)", padre: "Padre Rafael" },
    { id: "78-2025-05-31-19h-Matriz-Coroacao", data: "2025-05-31", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-05-31-19h-MatrizCoroacao", data: "2025-05-31", horario: "19h", local: "Matriz", padre: "Padre Rafael" },

    { id: "78-2025-06-01-07h-Matriz", data: "2025-06-01", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-01-07h-Divino", data: "2025-06-01", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-06-01-09h-Matriz", data: "2025-06-01", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-01-09h-SaoJose", data: "2025-06-01", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-06-01-10h30-CentroPastoral", data: "2025-06-01", horario: "10h30", local: "Centro de Pastoral - Coordenação dos MEPs", padre: "Padre Rafael" },
    { id: "78-2025-06-01-17h-CentroPastoral", data: "2025-06-01", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-06-01-17h-Divino", data: "2025-06-01", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-06-01-17h-PqSaoJoao", data: "2025-06-01", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-06-01-19h-Matriz", data: "2025-06-01", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-01-19h-SantoAntonio", data: "2025-06-01", horario: "19h", local: "Santo Antônio - Bandeira da Festa", padre: "Padre Ivan" },
    { id: "78-2025-06-01-19h-NovoPqIracema", data: "2025-06-01", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-06-03-19h-Urucara", data: "2025-06-03", horario: "19h", local: "Urucará", padre: "Padre Eudásio" },
    { id: "78-2025-06-03-19h-VilaresDaSerra", data: "2025-06-03", horario: "19h", local: "Vilares da Serra", padre: "Padre Ivan" },
    
    { id: "78-2025-06-04-19h-Matriz", data: "2025-06-04", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },  
    { id: "78-2025-06-04-19h-Guabiraba", data: "2025-06-04", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },
    
    { id: "78-2025-06-05-19h-Mororo", data: "2025-06-05", horario: "19h", local: "Mororó", padre: "Padre Rafael" },
    { id: "78-2025-06-05-19h-PqDasRosas", data: "2025-06-05", horario: "19h", local: "Parque das Rosas", padre: "Padre Ivan" },

    { id: "78-2025-06-06-18h30-CentroPastoral", data: "2025-06-06", horario: "18h30", local: "Centro de Pastoral - Adoração ao Santíssimo Sacramento", padre: "Padre Rafael" },
    { id: "78-2025-06-06-19h-CentroPastoral", data: "2025-06-06", horario: "19h", local: "Centro de Pastoral - Missa", padre: "Padre Eudásio" },

    { id: "78-2025-06-07-17h-SantaLuzia", data: "2025-06-07", horario: "17h", local: "Santa Luzia", padre: "Padre Ivan" },    
    { id: "78-2025-06-07-19h-Matriz", data: "2025-06-07", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-07-19h-Coite", data: "2025-06-07", horario: "19h", local: "Coité", padre: "Padre Ivan" },

    { id: "78-2025-06-08-07h-Matriz", data: "2025-06-08", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-08-07h-Divino", data: "2025-06-08", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-06-08-07h-Abrigo", data: "2025-06-08", horario: "07h", local: "Abrigo", padre: "Padre Rafael" },
    { id: "78-2025-06-08-09h-Matriz", data: "2025-06-08", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-08-17h-CentroPastoral", data: "2025-06-08", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-06-08-17h-PqSaoJoao", data: "2025-06-08", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-06-08-19h-Matriz", data: "2025-06-08", horario: "19h", local: "Matriz - Missa votiva de Nossa Senhora da Penha", padre: "Padre Rafael" },
    { id: "78-2025-06-08-19h-NovoPqIracema", data: "2025-06-08", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-06-10-19h-SantaDulce", data: "2025-06-10", horario: "19h", local: "Santa Dulce", padre: "Padre Ivan" },

    { id: "78-2025-06-11-19h-Matriz", data: "2025-06-11", horario: "19h", local: "Matriz - Missa pelas famílias (Chegada das relíquias Carlo Acutis)", padre: "Padre Rafael" },
    { id: "78-2025-06-11-19h-SantosDumont", data: "2025-06-11", horario: "19h", local: "Santos Dumont", padre: "Padre Ivan" },

    { id: "78-2025-06-12-19h-MaeRainha", data: "2025-06-12", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
    { id: "78-2025-06-12-19h-Pirapora", data: "2025-06-12", horario: "19h", local: "Pirapora", padre: "Padre Ivan" },

    { id: "78-2025-06-13-12h-Matriz", data: "2025-06-13", horario: "12h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-13-17h-Vilares", data: "2025-06-13", horario: "17h", local: "Vilares da Serra", padre: "Padre Ivan" },
    { id: "78-2025-06-13-19h-PqSaoJoao", data: "2025-06-13", horario: "19h", local: "Parque São João", padre: "Padre Ivan" }, 

    { id: "78-2025-06-14-19h-Matriz", data: "2025-06-14", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-06-15-07h-Matriz", data: "2025-06-15", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-15-07h-Divino", data: "2025-06-15", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-06-15-09h-Matriz", data: "2025-06-15", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-15-09h-SaoJose", data: "2025-06-15", horario: "09h", local: "São José", padre: "Padre Rafael" },
    { id: "78-2025-06-15-10h-Tijuca", data: "2025-06-15", horario: "10h", local: "Tijuca", padre: "Padre Ivan" },
    { id: "78-2025-06-15-11h-CentroPastoral", data: "2025-06-15", horario: "11h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-06-15-17h-Divino", data: "2025-06-15", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-06-15-17h-CentroPastoral", data: "2025-06-15", horario: "17h", local: "Centro de Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-06-15-17h-PqSaoJoao", data: "2025-06-15", horario: "17h", local: "Parque São João", padre: "Padre Rafael" },
    { id: "78-2025-06-15-19h-Matriz", data: "2025-06-15", horario: "19h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-06-15-19h-NovoPqIracema", data: "2025-06-15", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },

    { id: "78-2025-06-17-19h-PlanaltoCajueiros", data: "2025-06-17", horario: "19h", local: "Planalto dos Cajueiros", padre: "Padre Eudásio" },
    { id: "78-2025-06-17-19h-Urucara", data: "2025-06-17", horario: "19h", local: "Urucará", padre: "Padre Rafael" },
    { id: "78-2025-06-17-19h-Coite", data: "2025-06-17", horario: "19h", local: "Coité - Bandeira da Festa do Sagrado Coração de Jesus", padre: "Padre Ivan" },

    { id: "78-2025-06-18-19h-Matriz", data: "2025-06-18", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "78-2025-06-18-19h-Guabiraba", data: "2025-06-18", horario: "19h", local: "Guabiraba", padre: "Padre Ivan" },

    { id: "78-2025-06-19-17h-Divino", data: "2025-06-19", horario: "17h", local: "Divino - Corpus Christi", padre: "Padre Rafael" },
    { id: "78-2025-06-19-19h-Matriz", data: "2025-06-19", horario: "19h", local: "Matriz - Corpus Christi", padre: "Padre Eudásio" },
    { id: "78-2025-06-19-19h-Matriz2", data: "2025-06-19", horario: "19h", local: "Matriz - Corpus Christi", padre: "Padre Ivan" },


    { id: "78-2025-06-20-19h-Matriz", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Eudásio" },
    { id: "78-2025-06-20-19h-Matriz2", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Rafael" },
    { id: "78-2025-06-20-19h-Matriz3", data: "2025-06-20", horario: "19h", local: "Matriz - Missa Jubilar", padre: "Padre Ivan" },

    { id: "78-2025-06-21-17h-SantaLuzia", data: "2025-06-21", horario: "17h", local: "Santa Luzia", padre: "Padre Rafael" },
    { id: "78-2025-06-21-17h-SantoAntonio", data: "2025-06-21", horario: "17h", local: "Santo Antônio", padre: "Padre Ivan" },
    { id: "78-2025-06-21-19h-Matriz", data: "2025-06-21", horario: "19h", local: "Matriz", padre: "Padre Ivan" },

    { id: "78-2025-06-22-07h-Matriz", data: "2025-06-22", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-22-07h-Divino", data: "2025-06-22", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-06-22-09h-Matriz", data: "2025-06-22", horario: "09h", local: "Matriz", padre: "Padre Ivan" },
    { id: "78-2025-06-22-15h30-SantosDumont", data: "2025-06-22", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "78-2025-06-22-17h-CentroPastoral", data: "2025-06-22", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-06-22-17h-Divino", data: "2025-06-22", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-06-22-17h-PqSaoJoao", data: "2025-06-22", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-06-22-19h-Matriz", data: "2025-06-22", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-22-19h-NovoPqIracema", data: "2025-06-22", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },

    { id: "78-2025-06-24-19h-SerraPelada", data: "2025-06-24", horario: "19h", local: "Serra Pelada", padre: "Padre Rafael" },

    { id: "78-2025-06-25-19h-Matriz", data: "2025-06-25", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" },
    { id: "78-2025-06-25-19h-SaoPedro", data: "2025-06-25", horario: "19h", local: "São Pedro - Bandeira da Festa", padre: "Padre Ivan" },
    { id: "78-2025-06-25-19h-SantosDumont", data: "2025-06-25", horario: "19h", local: "Santos Dumont", padre: "Padre Eudásio" },

    { id: "78-2025-06-26-19h-MaeRainha", data: "2025-06-26", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-06-26-19h-CampoDelta", data: "2025-06-26", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "78-2025-06-27-19h-ConegoPinto", data: "2025-06-27", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "78-2025-06-27-19h-Rosario", data: "2025-06-27", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "78-2025-06-28-17h-SantaDulce", data: "2025-06-28", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "78-2025-06-28-17h-Abrigo", data: "2025-06-28", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-06-28-19h-Matriz", data: "2025-06-28", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-28-19h-OutraBanda", data: "2025-06-28", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },

    { id: "78-2025-06-29-07h-Matriz", data: "2025-06-29", horario: "07h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-29-07h-Divino", data: "2025-06-29", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-06-29-09h-Matriz", data: "2025-06-29", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-06-29-17h-CentroPastoral", data: "2025-06-29", horario: "17h", local: "Centro de Pastoral", padre: "Padre Rafael" },
    { id: "78-2025-06-29-17h-Divino", data: "2025-06-29", horario: "17h", local: "Divino", padre: "Padre Eudásio" },
    { id: "78-2025-06-29-17h-PqSaoJoao", data: "2025-06-29", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-06-29-19h-Matriz", data: "2025-06-29", horario: "19h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-06-29-19h-NovoPqIracema", data: "2025-06-29", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
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

  const filteredCoroinhas = useMemo(() => {
    return coroinhas.filter((coroinha) =>
      coroinha.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coroinhas, searchTerm]);
  
  const filteredEscalas = useMemo(() => {
    return escalas.filter((escala) =>
      coroinhasData[escala.id]?.some((coroinha) =>
        filteredCoroinhas.some((c) => c.id === coroinha.id)
      )
    );
  }, [escalas, coroinhasData, filteredCoroinhas]);
  
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
          coroinhas={coroinhasData[escala.id]?.filter((coroinha) =>
            coroinha.nome.toLowerCase().includes(searchTerm.toLowerCase())
          ) || []}
          onAddCoroinha={() => {}}
          onDeleteCoroinha={() => {}}
          isPublicView={true}
        />
      ))}
    </div>
  );
};

export default EscalaFixa;