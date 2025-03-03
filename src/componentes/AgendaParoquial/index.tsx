import { agendaParoquial } from "../../dados/agenda";

const AgendaParoquial = () => {
  return (
    <div className="max-w-2xl md:max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Festejos São José - 2025
      </h2>
      <div className="space-y-6">
        {agendaParoquial.map((dia, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-blue-700">{dia.data}</h3>
            <ul className="mt-3 space-y-3">
              {dia.eventos.map((evento, idx) => (
                <li
                  key={idx}
                  className="p-3 border-l-4 border-blue-500 bg-white shadow-sm rounded-lg"
                  aria-label={`${evento.horario} - ${evento.descricao}`}
                >
                  <p className="font-medium text-gray-800">
                    {evento.horario} - {evento.descricao}
                  </p>
                  {evento.mesc && (
                    <p className="text-gray-700">
                      <strong>MESC:</strong> {evento.mesc.join(", ")}
                    </p>
                  )}
                  {evento.liturgia && (
                    <p className="text-gray-700">
                      <strong>Liturgia:</strong> {evento.liturgia.join(", ")}
                    </p>
                  )}
                  {evento.canto && (
                    <p className="text-gray-700">
                      <strong>Canto:</strong> {evento.canto}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgendaParoquial;