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
    { id: "78-2025-04-14-19h-Matriz", data: "2025-04-14", horario: "19h", local: "Matriz - Via sacra", padre: "Padre Eudásio" },
    { id: "78-2025-04-15-19h-Matriz", data: "2025-04-15", horario: "19h", local: "Matriz - Via sacra", padre: "Padre Eudásio" },
    { id: "78-2025-04-16-19h-Matriz", data: "2025-04-16", horario: "19h", local: "Matriz - Queima dos pecados", padre: "Padre Eudásio" },

    { id: "78-2025-04-17-19h-Matriz", data: "2025-04-17", horario: "19h", local: "Matriz - Santa Ceia e Lava pés", padre: "Padre Eudásio" },
    { id: "78-2025-04-17-19h-Divino", data: "2025-04-17", horario: "19h", local: "Divino - Santa Ceia e Lava pés", padre: "Padre Roberto" },
    { id: "78-2025-04-17-19h-NossaSenhoraParqueIracema", data: "2025-04-17", horario: "19h", local: "Novo Parque Iracema - Santa Ceia e Lava pés", padre: "Padre Rafael" },
    { id: "78-2025-04-17-19h-PqSaoJoao", data: "2025-04-17", horario: "19h", local: "Parque São João - Santa Ceia e Lava pés", padre: "Padre Ivan" },


    { id: "78-2025-04-18-15h-PaixaoMatriz", data: "2025-04-18", horario: "15h", local: "Matriz - Paixão e Morte do Senhor", padre: "Padre Eudásio" },
    { id: "78-2025-04-18-15h-PaixaoDivino", data: "2025-04-18", horario: "15h", local: "Divino - Paixão e Morte do Senhor", padre: "Padre Roberto" },
    { id: "78-2025-04-18-15h-NossaSenhoraParqueIracema", data: "2025-04-18", horario: "15h", local: "Novo Parque Iracema - Paixão e Morte do Senhor", padre: "Padre Rafael" },
    { id: "78-2025-04-18-15h-PaixaoPqSaoJoao", data: "2025-04-18", horario: "15h", local: "Parque São João - Paixão e Morte do Senhor", padre: "Padre Ivan" },

    { id: "78-2025-04-19-19h-Matriz", data: "2025-04-19", horario: "19h", local: "Matriz - Vigília Pascal", padre: "Padre Eudásio" },
    { id: "78-2025-04-19-19h-Divino", data: "2025-04-19", horario: "19h", local: "Divino - Vigília Pascal", padre: "Padre Roberto" },
    { id: "78-2025-04-19-19h-NossaSenhoraParqueIracema", data: "2025-04-19", horario: "19h", local: "Novo Parque Iracema - Vigília Pascal", padre: "Padre Rafael" },
    { id: "78-2025-04-19-19h-PqSaoJoao", data: "2025-04-19", horario: "19h", local: "Parque São João - Vigília Pascal", padre: "Padre Ivan" },

    { id: "78-2025-04-20-07h-Matriz", data: "2025-04-20", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-20-07h-Divino", data: "2025-04-20", horario: "07h", local: "Divino", padre: "Padre Roberto" },
    { id: "78-2025-04-20-09h-NovoParqueIracema", data: "2025-04-20", horario: "09h", local: "Batizado Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-04-20-09h-SaoJose", data: "2025-04-20", horario: "09h", local: "São José", padre: "Padre Ivan" },
    { id: "78-2025-04-20-09h-Matriz", data: "2025-04-20", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-20-17h-Divino", data: "2025-04-20", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-20-17h-PqSaoJoao", data: "2025-04-20", horario: "17h", local: "Parque São João", padre: "Padre Ivan" },
    { id: "78-2025-04-20-17h-CentroPastoral", data: "2025-04-20", horario: "17h", local: "Centro Pastoral", padre: "Padre Eudásio" },
    { id: "78-2025-04-20-19h-NovoParqueIracema", data: "2025-04-20", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Rafael" },
    { id: "78-2025-04-20-19h-Matriz", data: "2025-04-20", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    
    { id: "78-2025-04-22-19h-SerraPelada", data: "2025-04-22", horario: "19h", local: "Serra Pelada", padre: "Padre Rafael" },

    { id: "78-2025-04-23-19h-SantaCecilia", data: "2025-04-23", horario: "19h", local: "Santa Cecília", padre: "Padre Ivan" },
    { id: "78-2025-04-23-19h-Matriz", data: "2025-04-23", horario: "19h", local: "Matriz - Missa pelas familias", padre: "Convidado" },

    { id: "78-2025-04-24-19h-MaeRainha", data: "2025-04-24", horario: "19h", local: "Mãe Rainha", padre: "Padre Rafael" },
    { id: "78-2025-04-24-19h-CampoDelta", data: "2025-04-24", horario: "19h", local: "Campo Delta", padre: "Padre Ivan" },

    { id: "78-2025-04-25-19h-ConegoPinto", data: "2025-04-25", horario: "19h", local: "Cônego Pinto", padre: "Padre Rafael" },
    { id: "78-2025-04-25-19h-Rosario", data: "2025-04-25", horario: "19h", local: "Rosário", padre: "Padre Ivan" },

    { id: "78-2025-04-26-17h-Abrigo", data: "2025-04-26", horario: "17h", local: "Abrigo", padre: "Padre Ivan" },
    { id: "78-2025-04-26-17h-SantaDulce", data: "2025-04-26", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
    { id: "78-2025-04-26-19h-OutraBanda", data: "2025-04-26", horario: "19h", local: "Outra Banda", padre: "Padre Ivan" },
    { id: "78-2025-04-26-19h-Matriz", data: "2025-04-26", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },

    { id: "78-2025-04-27-07h-Matriz", data: "2025-04-27", horario: "07h", local: "Matriz", padre: "Padre Rafael" },
    { id: "78-2025-04-27-07h-Divino", data: "2025-04-27", horario: "07h", local: "Divino", padre: "Padre Ivan" },
    { id: "78-2025-04-27-09h-Matriz", data: "2025-04-27", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-15h30-SantosDumont", data: "2025-04-27", horario: "15h30", local: "Santos Dumont", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-17h-Divino", data: "2025-04-27", horario: "17h", local: "Divino", padre: "Padre Rafael" },
    { id: "78-2025-04-27-17h-CentroPastoral", data: "2025-04-27", horario: "17h", local: "Centro Pastoral", padre: "Padre Ivan" },
    { id: "78-2025-04-27-17h-PqSaoJoao", data: "2025-04-27", horario: "17h", local: "Parque São João", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-19h-Matriz", data: "2025-04-27", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
    { id: "78-2025-04-27-19h-NovoParqueIracema", data: "2025-04-27", horario: "19h", local: "Novo Parque Iracema", padre: "Padre Ivan" },
    
    { id: "78-2025-04-30-19h-Matriz", data: "2025-04-30", horario: "19h", local: "Matriz - Missa pelas famílias", padre: "Padre Rafael" }

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