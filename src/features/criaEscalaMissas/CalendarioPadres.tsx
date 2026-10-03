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