import CardDia from "./Card";
import { Escala } from "../../types/escala";

function gerarDiasDeJunho(ano: number = 2025) {
  const dias: Date[] = [];
  for (let d = 1; d <= 31; d++) {
    dias.push(new Date(ano, 7, d)); // mês 5 = junho
  }
  return dias;
}

interface GradeJunhoProps {
  escalas: Escala[];
  onAdd: (data: string) => void;
}

export default function GradeJunho({ escalas, onAdd }: GradeJunhoProps) {
  const diasDeJunho = gerarDiasDeJunho();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {diasDeJunho.map((date) => (
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