interface CardEscalaProps {
  padre: string;
  data: string;
  horario: string;
  local: string;
  onEdit: () => void;
  onDelete: () => void;
}

const CardEscala: React.FC<CardEscalaProps> = ({
  padre,
  data,
  horario,
  local,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="border rounded shadow-md p-4 mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{padre}</h3>
        <p className="text-gray-600">{data}</p>
        <p className="text-gray-600">{horario}</p>
        <p className="text-gray-600">{local}</p>
      </div>
      <div className="flex gap-2">
        <button
        type="button"
        onClick={onEdit}
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Editar
        </button>
        <button
        type="button"
        onClick={onDelete}
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default CardEscala;
