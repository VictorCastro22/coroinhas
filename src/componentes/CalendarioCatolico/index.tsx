import { useState } from 'react';

// Interfaces
interface CalendarEvent {
  date: string;
  description: string;
}

const events: CalendarEvent[] = [
  { date: '2025-02-01', description: 'Santa Brígida' },
  { date: '2025-02-02', description: 'Apresentação do Senhor' },
  { date: '2025-02-03', description: 'São Lourenço de Cantuária e São Brás de Sebaste' },
  { date: '2025-02-04', description: 'São João de Brito e Santo André Corsini' },
  { date: '2025-02-05', description: 'Santa Águeda' },
  { date: '2025-02-06', description: 'Santa Doroteia' },
  { date: '2025-02-07', description: 'Cinco Chagas do Senhor' },
  { date: '2025-02-08', description: 'São Jerónimo Emiliano' },
  { date: '2025-02-09', description: 'Santa Apolônia' },
  { date: '2025-02-10', description: 'Santa Escolástica' },
  { date: '2025-02-11', description: 'Nossa Senhora de Lourdes' },
  { date: '2025-02-12', description: 'Santa Eulália de Barcelona' },
  { date: '2025-02-13', description: 'São Marciniano' },
  { date: '2025-02-14', description: 'São Valentim e Santos Cirilo e Metódio' },
  { date: '2025-02-15', description: 'São Cláudio Colombiere' },
  { date: '2025-02-16', description: 'Santo Onésimo' },
  { date: '2025-02-17', description: 'Santo Aleixo (um dos Sete Santos Fundadores da Ordem dos Servos de Maria)' },
  { date: '2025-02-18', description: 'Santa Engrácia de Braga' },
  { date: '2025-02-19', description: 'São Pedro Damião, bispo e doutor da Igreja' },
  { date: '2025-02-20', description: 'São José' },
  { date: '2025-02-21', description: 'São Pedro e São Paulo' },
  { date: '2025-02-22', description: 'Cátedra de São Pedro, apóstolo' },
  { date: '2025-02-23', description: 'Nossa Senhora do Carmo' },
  { date: '2025-02-24', description: 'São Matias' },
  { date: '2025-02-25', description: 'São Pancrácio' },
  { date: '2025-02-26', description: 'São Marcos' },
  { date: '2025-02-27', description: 'São Pio X' },
  { date: '2025-02-28', description: 'São Lourenço' },
];

const CalendarioCatolico: React.FC = () => {
  const [month, setMonth] = useState(1); // Definindo para Fevereiro

  const filteredEvents = events.filter(event => new Date(event.date).getMonth() === month);

  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendário Litúrgico</h1>
      <div className="mb-4">
        <select value={month} onChange={(e) => setMonth(Number(e.target.value))} className="p-2 border rounded">
          {months.map((m, index) => (
            <option key={m} value={index}>{m}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => {
            const date = new Date(event.date).toISOString().split('T')[0];
            return (
              <div key={date} className="border p-2">
                <div className="text-lg font-semibold">{date}</div>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <span className="text-sm">{event.description}</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="border p-2">
            <div className="text-lg font-semibold">Sem Eventos</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarioCatolico;