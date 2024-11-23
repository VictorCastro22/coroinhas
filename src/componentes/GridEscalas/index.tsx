import { useState, useEffect } from "react";
import db from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

interface Escala {
  id: string;
  coroinha: string;
  local: string;
  horario: string;
  data: string;
}

const GridEscalas: React.FC = () => {
  const [escalas, setEscalas] = useState<Escala[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "escalas"));
      const escalasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Escala[];
      setEscalas(escalasData);
    };

    fetchData();
  }, []);

  const groupedEscalas = escalas.reduce((acc, escala) => {
    const { data, horario, local } = escala;
    acc[data] = acc[data] || {};
    acc[data][horario] = acc[data][horario] || {};
    acc[data][horario][local] = acc[data][horario][local] || [];
    acc[data][horario][local].push(escala.coroinha);
    return acc;
  }, {} as Record<string, Record<string, Record<string, string[]>>>);

  return (
    <div
      className="p-4 min-h-screen"
      style={{
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        color: "#ffffff",
      }}
    >
      <h2 className="text-3xl font-bold mb-6">Escala</h2>
      {Object.entries(groupedEscalas).map(([data, horarios]) => (
        <div key={data} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Data: {new Date(data).toLocaleDateString("pt-BR")}
          </h3>
          {Object.entries(horarios).map(([horario, locais]) => (
            <div key={horario} className="mb-4">
              <h4 className="text-lg font-medium mb-2">Horário: {horario}</h4>
              {Object.entries(locais).map(([local, coroinhas]) => (
                <div
                  key={local}
                  className="p-4 border rounded shadow-md mb-2"
                  style={{
                    background: "rgba(255, 255, 255, 0.85)",
                    color: "#333333",
                  }}
                >
                  <h5 className="font-bold mb-2">Local: {local}</h5>
                  <ul className="list-disc pl-4">
                    {coroinhas.map((coroinha) => (
                      <li key={coroinha}>{coroinha}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GridEscalas;