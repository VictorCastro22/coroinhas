import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../../../firebaseConfig";
import { escalas } from "../../dados/escalaPadres";
import coroinhasLista from "../../dados/coroinhas";
import { Coroinha } from "../../types/coroinhas";

// Ícones para a barra inferior
import { 
  FiCalendar, 
  FiUsers, 
  FiAlertCircle, 
  FiLogOut 
} from "react-icons/fi";

const PainelCoordenacao: React.FC = () => {
  const [abaAtiva, setAbaAtiva] = useState<"escala" | "dados" | "faltas">("escala");
  const [coroinhasData, setCoroinhas] = useState<{ [key: string]: Coroinha[] }>({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "coroinhas"));
        const data: { [key: string]: Coroinha[] } = {};
        querySnapshot.docs.forEach((doc) => {
          const item = doc.data();
          const cardId = item.cardId;
          if (!data[cardId]) data[cardId] = [];
          data[cardId].push({
            id: doc.id,
            nome: item.nome,
            foto: item.foto,
            funcao: item.funcao,
          });
        });
        setCoroinhas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
    fetchDados();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_coordenacao");
    window.location.href = "/login-coordenacao";
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24"> {/* pb-24 dá espaço para a barra inferior */}
      
      {/* HEADER FIXO NO TOPO */}
      <header className="sticky top-0 bg-white shadow-sm p-4 z-40 flex justify-between items-center border-b border-gray-100">
        <div>
          <h1 className="text-lg font-bold text-[#535043] font-playfair uppercase">Coordenação</h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Paróquia da Penha</p>
        </div>
        <button onClick={handleLogout} className="text-red-400 p-2">
          <FiLogOut size={20} />
        </button>
      </header>

      <main className="p-4 max-w-4xl mx-auto">
        {carregando ? (
          <div className="flex justify-center items-center py-20 text-gray-400 animate-pulse">Sincronizando...</div>
        ) : (
          <>
            {/* CONTEÚDO DAS ESCALAS */}
            {abaAtiva === "escala" && (
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Histórico de Escalas</h2>
                {escalas.map((missa) => (
                  <div key={missa.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-[#D4AF37]">
                    <p className="font-bold text-gray-700 text-sm">{missa.local}</p>
                    <p className="text-[10px] text-gray-400 mb-2">{missa.data} • {missa.horario}</p>
                    <div className="flex flex-wrap gap-2">
                      {coroinhasData[missa.id]?.map(c => (
                        <img key={c.id} src={c.foto} className="w-8 h-8 rounded-full border border-gray-100" title={c.nome} alt={c.nome} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CONTEÚDO DOS DADOS (COROINHAS) */}
            {abaAtiva === "dados" && (
              <div className="grid grid-cols-1 gap-3">
                <h2 className="text-sm font-bold text-gray-400 uppercase mb-4">Base de Coroinhas</h2>
                {coroinhasLista.map((c) => (
                  <div key={c.id} className="bg-white p-3 rounded-xl flex items-center gap-4 shadow-sm">
                    <img src={c.foto} className="w-10 h-10 rounded-full object-cover" alt={c.nome} />
                    <span className="text-sm font-medium text-gray-700">{c.nome}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CONTEÚDO DAS FALTAS */}
            {abaAtiva === "faltas" && (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <FiAlertCircle size={40} className="mx-auto text-amber-200 mb-2" />
                <p className="text-gray-400 text-sm">Controle de faltas em desenvolvimento.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* BARRA INFERIOR FIXA (ESTILO MOBILE APP) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setAbaAtiva("escala")}
          className={`flex flex-col items-center gap-1 transition-all ${abaAtiva === "escala" ? "text-[#535043]" : "text-gray-300"}`}
        >
          <FiCalendar size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Escalas</span>
        </button>

        <button 
          onClick={() => setAbaAtiva("dados")}
          className={`flex flex-col items-center gap-1 transition-all ${abaAtiva === "dados" ? "text-[#535043]" : "text-gray-300"}`}
        >
          <FiUsers size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Dados</span>
        </button>

        <button 
          onClick={() => setAbaAtiva("faltas")}
          className={`flex flex-col items-center gap-1 transition-all ${abaAtiva === "faltas" ? "text-[#535043]" : "text-gray-300"}`}
        >
          <FiAlertCircle size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">Faltas</span>
        </button>
      </nav>
    </div>
  );
};

export default PainelCoordenacao;