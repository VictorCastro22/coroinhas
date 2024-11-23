import CardEscala from "../CardEscala";

// Escalas de ambos os padres
const escalasEudasio = [
  { data: "2024-11-23", horario: "17h", local: "Santa Dulce", padre: "Padre Eudásio" },
  { data: "2024-11-23", horario: "19h", local: "Outra Banda", padre: "Padre Eudásio" },
  { data: "2024-11-24", horario: "07h", local: "Divino", padre: "Padre Eudásio" },
  { data: "2024-11-24", horario: "09h", local: "Matriz", padre: "Padre Eudásio" },
  { data: "2024-11-24", horario: "17h", local: "Centro de Pastoral", padre: "Padre Eudásio" },
  { data: "2024-11-24", horario: "19h", local: "Matriz", padre: "Padre Eudásio" },
  { data: "2024-11-26", horario: "19h", local: "São Beneito", padre: "Padre Eudásio" },
  { data: "2024-11-27", horario: "08h", local: "Atendimento na Secretaria Paroquial", padre: "Padre Eudásio" },
  { data: "2024-11-27", horario: "19h", local: "Cônego Pinto (Festa de N. Sra. das Graças)", padre: "Padre Eudásio" },
  { data: "2024-11-28", horario: "19h", local: "Mãe Rainha", padre: "Padre Eudásio" },
  { data: "2024-11-30", horario: "20hs", local: "Casamento na Matriz", padre: "Padre Eudásio" },
  { data: "2024-12-01", horario: "07:30hs às 12hs", local: "Assembleia Paroquial", padre: "Padre Eudásio" },
];

const escalasIvan = [
  { data: "2024-11-23", horario: "17hs", local: "Abrigo", padre: "Padre Ivan" },
  { data: "2024-11-23", horario: "19hs", local: "Matriz", padre: "Padre Ivan" },
  { data: "2024-11-24", horario: "07hs", local: "Matriz", padre: "Padre Ivan" },
  { data: "2024-11-24", horario: "17hs", local: "Divino", padre: "Padre Ivan" },
  { data: "2024-11-24", horario: "19hs", local: "Pq. S. João", padre: "Padre Ivan" },
  { data: "2024-11-26", horario: "19hs", local: "São Pedro", padre: "Padre Ivan" },
  { data: "2024-11-27", horario: "19hs", local: "Santos Dumont", padre: "Padre Ivan" },
  { data: "2024-11-28", horario: "19hs", local: "Campo Delta", padre: "Padre Ivan" },
  { data: "2024-11-29", horario: "19hs", local: "Rosário", padre: "Padre Ivan" },
  { data: "2024-11-30", horario: "19hs", local: "Matriz", padre: "Padre Ivan" },
];

// Combina as escalas de ambos os padres e ordena por data
const escalasCombinadas = [...escalasEudasio, ...escalasIvan].sort((a, b) => {
  return new Date(a.data).getTime() - new Date(b.data).getTime();
});

const CalendarioPadres: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendário de Escalas</h1>
      
      {/* Renderiza as escalas por data */}
      {escalasCombinadas.map((escala) => (
        <CardEscala
          key={`${escala.data}-${escala.horario}-${escala.local}`} // Chave única
          padre={escala.padre}
          data={escala.data}
          horario={escala.horario}
          local={escala.local}
          onEdit={() => alert(`Editar escala de ${escala.padre} em ${escala.data}`)}
          onDelete={() => alert(`Excluir escala de ${escala.padre} em ${escala.data}`)}
        />
      ))}
    </div>
  );
};

export default CalendarioPadres;