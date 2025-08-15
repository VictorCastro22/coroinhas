import CardDia from "./Card";
import { Escala } from "../../types/escala";

interface GradeProps {
  escalas: Escala[];
  onAdd: (data: string, horario: string, local: string) => void;
}

// Gera todas as datas de agosto
function gerarDiasDeAgosto(ano: number = 2025) {
  const dias: Date[] = [];
  const ultimoDia = new Date(ano, 8, 0).getDate(); // 0 do mês seguinte = último dia do mês
  for (let d = 1; d <= ultimoDia; d++) {
    dias.push(new Date(ano, 7, d)); // mês 7 = agosto
  }
  return dias;
}

export default function Grade({ escalas, onAdd }: GradeProps) {
  const diasDeAgosto = gerarDiasDeAgosto();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {diasDeAgosto.map((date) => (
          <CardDia
            key={date.toISOString()}
            date={date}
            escalas={escalas}
            onAdd={onAdd}
          />
        ))}
      </div>
    </div>
  );
}
