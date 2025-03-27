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

const locais = [
  "Guabiraba", "Novo Parque Iracema", "Coité", "Tangueira", "Rosário", "Divino", "Santa Luzia", "Horto", 
  "Cônego Pinto", "Urucará", "Pirapora", "Parque Santa Fé", "Parque das Rosas", "Parque São João", 
  "Vilares da Serra", "São Benedito", "São José", "Mororó", "Mãe Rainha", "Serra Pelada", "Santos Dumont", 
  "São Pedro", "São João Batista", "Matriz", "Centro Pastoral"
];

const horarios = ["00h", "07h", "09h", "12h", "15h", "15h30", "17h", "19h"];
const padres = ["Padre Eudásio", "Padre Ivan", "Padre Rafael"];

export default function CalendarioPadres() {
  const [escalas, setEscalas] = useState<Escala[]>([]);
  const [novaEscala, setNovaEscala] = useState<Escala>({
    data: "",
    horario: "",
    local: "",
    padre: "",
  });

  useEffect(() => {
    const carregarEscalas = async () => {
      const snapshot = await getDocs(collection(db, "escalas"));
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Escala));
      setEscalas(lista);
    };
    carregarEscalas();
  }, []);

  const adicionarEscala = async () => {
    if (!novaEscala.data || !novaEscala.horario || !novaEscala.local || !novaEscala.padre) {
      alert("Preencha todos os campos!");
      return;
    }
    const docRef = await addDoc(collection(db, "escalas"), novaEscala);
    setEscalas([...escalas, { id: docRef.id, ...novaEscala }]);
    setNovaEscala({ data: "", horario: "", local: "", padre: "" });
  };

  const removerEscala = async (id: string) => {
    await deleteDoc(doc(db, "escalas", id));
    setEscalas(escalas.filter((escala) => escala.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendário dos Padres</h1>
      <div className="grid gap-4 p-4 border rounded-lg shadow-md bg-white md:grid-cols-2">
        <input type="date" value={novaEscala.data} onChange={(e) => setNovaEscala({ ...novaEscala, data: e.target.value })} className="border p-2 rounded-md w-full" />
        <select value={novaEscala.horario} onChange={(e) => setNovaEscala({ ...novaEscala, horario: e.target.value })} className="border p-2 rounded-md w-full">
          <option value="">Selecione o horário</option>
          {horarios.map((h) => <option key={h} value={h}>{h}</option>)}
        </select>
        <select value={novaEscala.local} onChange={(e) => setNovaEscala({ ...novaEscala, local: e.target.value })} className="border p-2 rounded-md w-full">
          <option value="">Selecione o local</option>
          {locais.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={novaEscala.padre} onChange={(e) => setNovaEscala({ ...novaEscala, padre: e.target.value })} className="border p-2 rounded-md w-full">
          <option value="">Selecione o padre</option>
          {padres.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <button onClick={adicionarEscala} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full">Adicionar</button>
      </div>
      <table className="border w-full mt-6 text-sm bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Data</th>
            <th className="border p-2">Horário</th>
            <th className="border p-2">Local</th>
            <th className="border p-2">Padre</th>
            <th className="border p-2">Ação</th>
          </tr>
        </thead>
        <tbody>
          {escalas.map((escala) => (
            <tr key={escala.id} className="hover:bg-gray-100">
              <td className="border p-2">{escala.data}</td>
              <td className="border p-2">{escala.horario}</td>
              <td className="border p-2">{escala.local}</td>
              <td className="border p-2">{escala.padre}</td>
              <td className="border p-2">
                <button onClick={() => removerEscala(escala.id!)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}