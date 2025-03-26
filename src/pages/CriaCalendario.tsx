import { useState, useEffect } from "react";
import db from "../../firebaseCalendario";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";

interface Escala {
  id?: string;
  data: string;
  horario: string;
  local: string;
  padre: string;
}

export default function CalendarioPadres() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [novaEscala, setNovaEscala] = useState<Escala>({
    data: "",
    horario: "",
    local: "",
    padre: "",
  });

  // Carregar escalas do Firestore ao abrir a página
  useEffect(() => {
    const carregarEscalas = async () => {
      const snapshot = await getDocs(collection(db, "escalas"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Escala));
      setEscalas(lista);
    };

    carregarEscalas();
  }, []);

  // Adicionar nova escala no Firestore
  const adicionarEscala = async () => {
    if (!novaEscala.data || !novaEscala.horario || !novaEscala.local || !novaEscala.padre) {
      alert("Preencha todos os campos!");
      return;
    }

    const docRef = await addDoc(collection(db, "escalas"), novaEscala);
    setEscalas([...escalas, { id: docRef.id, ...novaEscala }]);
    setNovaEscala({ data: "", horario: "", local: "", padre: "" });
  };

  // Remover escala do Firestore
  const removerEscala = async (id: string) => {
    await deleteDoc(doc(db, "escalas", id));
    setEscalas(escalas.filter((escala) => escala.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Calendário dos Padres</h1>

      {/* Formulário para adicionar escalas */}
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={novaEscala.data}
          onChange={(e) => setNovaEscala({ ...novaEscala, data: e.target.value })}
          className="border p-2"
        />
        <input
          type="time"
          value={novaEscala.horario}
          onChange={(e) => setNovaEscala({ ...novaEscala, horario: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Local"
          value={novaEscala.local}
          onChange={(e) => setNovaEscala({ ...novaEscala, local: e.target.value })}
          className="border p-2"
        />
        <input
          type="text"
          placeholder="Padre"
          value={novaEscala.padre}
          onChange={(e) => setNovaEscala({ ...novaEscala, padre: e.target.value })}
          className="border p-2"
        />
        <button onClick={adicionarEscala} className="bg-blue-500 text-white p-2">
          Adicionar
        </button>
      </div>

      {/* Tabela de escalas */}
      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Data</th>
            <th className="border p-2">Horário</th>
            <th className="border p-2">Local</th>
            <th className="border p-2">Padre</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {escalas.map((escala) => (
            <tr key={escala.id}>
              <td className="border p-2">{escala.data}</td>
              <td className="border p-2">{escala.horario}</td>
              <td className="border p-2">{escala.local}</td>
              <td className="border p-2">{escala.padre}</td>
              <td className="border p-2">
                <button onClick={() => removerEscala(escala.id!)} className="bg-red-500 text-white p-1">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
