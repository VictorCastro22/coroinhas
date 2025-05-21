import { useEffect, useState } from "react";
import db from "../../firebaseCalendario";
import { collection, getDocs, addDoc } from "firebase/firestore";
import GradeJunho from "../components/admin/Grade";
import EscalaModal from "../components/admin/EscalaModal";
import { Escala } from "../types/escala";

export default function CalendarioPadres() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const carregarEscalas = async () => {
      const snapshot = await getDocs(collection(db, "escalas"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Escala));
      setEscalas(lista);
    };
    carregarEscalas();
  }, []);

  const adicionarEscala = async (novaEscala: Escala) => {
    const docRef = await addDoc(collection(db, "escalas"), novaEscala);
    setEscalas([...escalas, { id: docRef.id, ...novaEscala }]);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Calendário dos Padres - Junho</h1>

      <GradeJunho escalas={escalas} onAdd={(data) => {
        setDataSelecionada(data);
        setIsModalOpen(true);
      }} />

      {isModalOpen && dataSelecionada && (
        <EscalaModal
          dataSelecionada={dataSelecionada}
          onSalvar={(novaEscala) => {
            adicionarEscala(novaEscala);
            setIsModalOpen(false);
            setDataSelecionada(null);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setDataSelecionada(null);
          }}
        />
      )}
    </div>
  );
}