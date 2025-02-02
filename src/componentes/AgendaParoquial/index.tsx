import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  start: string;
  category: 'Memória' | 'paroquia' | 'especial' | 'Festa' | 'nossa_senhora';
}

const allEvents: Event[] = [
  { id: '1', title: 'Apresentação do Senhor', start: '2025-02-02', category: 'Festa' },
  { id: '4', title: 'São Brás, bispo e mártir', start: '2025-02-03', category: 'Memória' },
  { id: '5', title: 'Santa Águeda, virgem e mártir', start: '2025-02-05', category: 'Memória' },
  { id: '6', title: 'São Paulo Miki e Companheiros, mártires', start: '2025-02-06', category: 'Memória' },
  { id: '2', title: 'Abertura Jubilar na Paróquia', start: '2025-02-07', category: 'paroquia' },
  { id: '7', title: 'Santa Josefina Bakhita, virgem', start: '2025-02-08', category: 'Memória' },
  { id: '8', title: 'Dia "D" na Paróquia', start: '2025-02-08', category: 'paroquia' },
  { id: '9', title: 'Missa Votiva de Nossa Senhora da Penha', start: '2025-02-08', category: 'paroquia' },
  { id: '3', title: 'Missa do Novo Vigário', start: '2025-02-09', category: 'paroquia' },
  { id: '10', title: 'Santa Escolástica, virgem', start: '2025-02-10', category: 'Memória' },
  { id: '11', title: 'Nossa Senhora de Lourdes', start: '2025-02-11', category: 'nossa_senhora' },
  { id: '12', title: 'São Valentim (Valentine\'s Day)', start: '2025-02-14', category: 'Memória' },
  { id: '13', title: 'São Pedro Damião, bispo e doutor', start: '2025-02-21', category: 'Memória' },
  { id: '14', title: 'Cátedra de São Pedro', start: '2025-02-22', category: 'Festa' },
  { id: '15', title: 'São Policarpo', start: '2025-02-23', category: 'Memória' }
];

export default function Agenda2025() {
  const [selectedMonth, setSelectedMonth] = useState('02');

  const filteredEvents = allEvents.filter(event => 
    new Date(event.start).getMonth() + 1 === Number(selectedMonth)
  );

  const getCardColor = (category: string) => {
    switch (category) {
      case 'Memória': return 'bg-blue-100';
      case 'paroquia': return 'bg-green-100';
      case 'especial': return 'bg-yellow-100';
      case 'festa': return 'bg-orange-100';
      case 'nossa_senhora': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-screen-lg mx-auto">
      <h2
        className="text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px",
          color: "#535043",
          fontWeight: 600,
        }}
      >
        Agenda 2025
      </h2>
      
      <div className="mt-4 flex justify-center">
        <select
          className="p-2 border rounded-lg"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>
      
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex justify-center gap-4 mb-4">
          <span className="bg-blue-100 px-2 py-1 rounded">Memória</span>
          <span className="bg-green-100 px-2 py-1 rounded">Paróquia</span>
          <span className="bg-orange-100 px-2 py-1 rounded">Festa</span>
          <span className="bg-purple-100 px-2 py-1 rounded">N. Sra</span>
        </div>
        {filteredEvents.map((event) => (
          <div key={event.id} className={`${getCardColor(event.category)} p-6 rounded-lg shadow text-center w-full max-w-sm mx-auto`}>
            <h3
              className="text-lg font-semibold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                color: "#535043",
                fontWeight: 600,
              }}
            >
              {event.title}
            </h3>
            <p className="text-gray-700 mt-2">
              {new Date(`${event.start}T00:00:00`).toLocaleDateString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
