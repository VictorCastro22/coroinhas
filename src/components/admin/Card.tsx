import { Escala } from "../../types/escala";

interface CardDiaProps {
  date: Date;
  escalas: Escala[];
  onAdd: (data: string) => void;
}

export default function CardDia({ date, escalas, onAdd }: CardDiaProps) {
  const dataStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const dia = date.getDate();
  const diaSemana = date.toLocaleDateString("pt-BR", { weekday: "short" });

  const escalasDoDia = escalas.filter((e) => e.data === dataStr);

  return (
    <div className="border rounded-xl p-3 shadow-sm bg-white flex flex-col gap-2 relative">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-bold">{dia}</div>
          <div className="text-xs text-gray-500 uppercase">{diaSemana}</div>
        </div>
        <button
          onClick={() => onAdd(dataStr)}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
        >
          +
        </button>
      </div>

      {escalasDoDia.length > 0 ? (
        <div className="text-xs mt-2">
          {escalasDoDia.map((e, idx) => (
            <div key={idx} className="border-t pt-1 mt-1">
              <strong>{e.horario}</strong> - {e.local} <br />
              <span className="text-gray-600">{e.padre}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-xs mt-2">Sem escala</p>
      )}
    </div>
  );
}