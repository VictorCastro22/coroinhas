import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore"; 
import db from "../../../firebaseConfig";
import CardEscala from "../../components/CardEscala";

interface CoroinhaEscalado {
  nome: string;
  funcao: string;
}

interface EscalaMissa {
  id: string;
  data: string;
  horario: string;
  local: string;
  padre: string;
  coroinhas_escalados?: CoroinhaEscalado[];
}

const CalendarioPadres: React.FC = () => {
  const [escalas, setEscalas] = useState<EscalaMissa[]>([]);
  const [loadingEscalas, setLoadingEscalas] = useState(true);

  // Busca as missas do mês no Firebase e converte a String em Objeto
  useEffect(() => {
    const fetchEscalasMensais = async () => {
      try {
        const docRef = doc(db, "escalas_mensais", "mes_atual"); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dadosBrutos = docSnap.data().missas;
          
          if (typeof dadosBrutos === "string") {
            setEscalas(JSON.parse(dadosBrutos));
          } else if (Array.isArray(dadosBrutos)) {
            setEscalas(dadosBrutos);
          }
        } else {
          console.log("Nenhuma escala encontrada para este mês no Firebase.");
        }
      } catch (error) {
        console.error("Erro ao buscar a escala:", error);
      } finally {
        setLoadingEscalas(false);
      }
    };

    fetchEscalasMensais();
  }, []);

  // Função para os meninos atualizarem a função direto no Select
  const handleUpdateFuncao = async (escalaId: string, nomeCoroinha: string, novaFuncao: string) => {
    // 1. Atualiza visualmente na tela na mesma hora
    const novasEscalas = escalas.map(escala => {
      if (escala.id === escalaId && escala.coroinhas_escalados) {
        return {
          ...escala,
          coroinhas_escalados: escala.coroinhas_escalados.map(c => 
            c.nome === nomeCoroinha ? { ...c, funcao: novaFuncao } : c
          )
        };
      }
      return escala;
    });

    setEscalas(novasEscalas);

    // 2. Salva o JSON atualizado lá no Firebase
    try {
      const docRef = doc(db, "escalas_mensais", "mes_atual");
      await updateDoc(docRef, {
        missas: JSON.stringify(novasEscalas)
      });
    } catch (error) {
      console.error("Erro ao salvar nova função no Firebase:", error);
    }
  };

<<<<<<< HEAD
const escalas = [
  { "id": "escalaoutubro-rafael-2026-10-21-19hs-matriz-1", "data": "2026-10-21", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-21-19hs-nsdores-1", "data": "2026-10-21", "horario": "19hs", "local": "NS Dores", "padre": "Padre Ivan" },

  // --- 22/10 (Quinta-feira) ---
  { "id": "escalaoutubro-rafael-2026-10-22-0615-irmas-1", "data": "2026-10-22", "horario": "06:15", "local": "Irmãs", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-22-19hs-matriz-1", "data": "2026-10-22", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 23/10 (Sexta-feira) ---
  { "id": "escalaoutubro-aurenio-2026-10-23-19hs-matriz-1", "data": "2026-10-23", "horario": "19hs", "local": "Matriz", "padre": "Padre Aurênio" },
  { "id": "escalaoutubro-rafael-2026-10-23-19hs-staterezinha-1", "data": "2026-10-23", "horario": "19hs", "local": "Santa Terezinha", "padre": "Padre Rafael" },

  // --- 24/10 (Sábado) ---
  { "id": "escalaoutubro-rafael-2026-10-24-17hs-starita-1", "data": "2026-10-24", "horario": "17hs", "local": "Santa Rita", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-24-19hs-matriz-1", "data": "2026-10-24", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-24-19hs-sjbatista-1", "data": "2026-10-24", "horario": "19hs", "local": "São João Batista", "padre": "Padre Rafael" },

  // --- 25/10 (Domingo) ---
  { "id": "escalaoutubro-ivan-2026-10-25-07hs-matriz-1", "data": "2026-10-25", "horario": "07hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-07hs-divino-1", "data": "2026-10-25", "horario": "07hs", "local": "Divino", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-09hs-matriz-1", "data": "2026-10-25", "horario": "09hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-09hs-Nossa Senhora Aparecida-1", "data": "2026-10-25", "horario": "09hs", "local": "Nossa Senhora Aparecida", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-1530-staedwiges-1", "data": "2026-10-25", "horario": "15:30", "local": "Santa Edwiges", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-16hs-matriz-1", "data": "2026-10-25", "horario": "16hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-17hs-divino-1", "data": "2026-10-25", "horario": "17hs", "local": "Divino", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-25-17hs-psjoao-1", "data": "2026-10-25", "horario": "17hs", "local": "Parque São João", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-25-19hs-candeias-1", "data": "2026-10-25", "horario": "19hs", "local": "Candeias", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-25-19hs-matriz-2", "data": "2026-10-25", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 27/10 (Terça-feira) ---
  { "id": "escalaoutubro-ivan-2026-10-27-19hs-matriz-1", "data": "2026-10-27", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-rafael-2026-10-27-19hs-delta-1", "data": "2026-10-27", "horario": "19hs", "local": "Delta", "padre": "Padre Rafael" },

  // --- 28/10 (Quarta-feira) ---
  { "id": "escalaoutubro-ivan-2026-10-28-19hs-matriz-1", "data": "2026-10-28", "horario": "19hs", "local": "Matriz", "padre": "Padre Ivan" },

  // --- 29/10 (Quinta-feira) ---
  { "id": "escalaoutubro-rafael-2026-10-29-0615-irmas-1", "data": "2026-10-29", "horario": "06:15", "local": "Irmãs", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-29-0830-visitas-1", "data": "2026-10-29", "horario": "08:30", "local": "Visitas", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-rafael-2026-10-29-19hs-matriz-1", "data": "2026-10-29", "horario": "19hs", "local": "Matriz", "padre": "Padre Rafael" },
  { "id": "escalaoutubro-ivan-2026-10-29-19hs-nspiedade-1", "data": "2026-10-29", "horario": "19hs", "local": "NS Piedade", "padre": "Padre Ivan" },

  // --- 30/10 (Sexta-feira) ---
  { "id": "escalaoutubro-ivanerafael-2026-10-30-19hs-amanari-1", "data": "2026-10-30", "horario": "19hs", "local": "Amanari", "padre": "Padre Ivan e Padre Rafael" },

  // --- 31/10 (Sábado) ---
  { "id": "escalaoutubro-ivan-2026-10-31-17hs-saobenedito-1", "data": "2026-10-31", "horario": "17hs", "local": "São Benedito", "padre": "Padre Ivan" },
  { "id": "escalaoutubro-antoniocarlos-2026-10-31-19hs-matriz-1", "data": "2026-10-31", "horario": "19hs", "local": "Matriz", "padre": "Dom Antônio" },
  { "id": "escalaoutubro-rafael-2026-10-31-19hs-scjesus-1", "data": "2026-10-31", "horario": "19hs", "local": "Sagrado Coração de Jesus", "padre": "Padre Rafael" }
];

  
=======
>>>>>>> 2e1deebe9e332ba550e5ceffbea3e05bd0afe44b
  return (
    <div>
      <h1 className="text-[30px] font-playfair font-semibold text-[#535043] text-center mb-6">
        Calendário das Missas
      </h1>

      {loadingEscalas ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-500 font-medium">Carregando calendário de missas...</p>
        </div>
      ) : escalas.length > 0 ? (
        escalas.map((escala) => (
          <CardEscala
            key={escala.id}
            padre={escala.padre}
            data={escala.data}
            horario={escala.horario}
            local={escala.local}
            coroinhasEscalados={escala.coroinhas_escalados || []}
            onUpdateFuncao={(nome, novaFuncao) => handleUpdateFuncao(escala.id, nome, novaFuncao)}
          />
        ))
      ) : (
        <div className="flex justify-center items-center py-10">
          <p className="text-lg text-gray-500 font-medium">Nenhuma missa agendada no momento.</p>
        </div>
      )}
    </div>
  );
};

export default CalendarioPadres;