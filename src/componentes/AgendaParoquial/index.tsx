import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import type { DateClickArg } from '@fullcalendar/interaction';
import { useState } from 'react';

interface Event {
  id: string;
  title: string;
  start: string;
  end?: string;
}

export default function Agenda2025() {
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Apresentação do Senhor', start: '2025-02-02' },
    { id: '2', title: 'Abertura Jubilar na Paroquia', start: '2025-02-07' },
    { id: '3', title: 'Missa do Novo Vigário', start: '2025-02-09' }
  ]);

  const handleDateClick = (info: DateClickArg) => {
    const title = prompt('Digite o nome do evento:');
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title,
        start: info.dateStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg w-full max-w-screen-lg mx-auto">
      <h2
        className="elementor-heading-title elementor-size-default text-center"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "30px",
          color: "#535043",
          fontWeight: 600,
        }}
      >
        Agenda 2025
      </h2>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="pt-br"
        events={events}
        dateClick={handleDateClick}
        editable
        selectable
        height="auto"
        timeZone="America/Sao_Paulo"
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next'
        }}
      />
      
      <div className="mt-6">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 p-4 rounded-lg shadow mb-4 text-center">
            <h3
              className="elementor-heading-title elementor-size-default"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                color: "#535043",
                fontWeight: 600,
              }}
            >
              {event.title}
            </h3>
            <p className="text-gray-700">
              {new Date(new Date(event.start).getTime() + new Date(event.start).getTimezoneOffset() * 60000).toLocaleDateString('pt-BR', {
                timeZone: 'America/Sao_Paulo'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
