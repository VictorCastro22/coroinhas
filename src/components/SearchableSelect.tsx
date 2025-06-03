import React, { useState, useMemo } from "react";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface Props {
  coroinhas: Coroinha[];
  selectedIds: string[];
  onApply: (selected: Coroinha[]) => void;
  onClose: () => void;
}

const SearchableSelect: React.FC<Props> = ({ coroinhas, selectedIds, onApply, onClose }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(selectedIds);

  const filtered = useMemo(() => {
    return coroinhas.filter((c) =>
      c.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, coroinhas]);

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((sid) => sid !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleApply = () => {
    const selectedCoroinhas = coroinhas.filter((c) => selected.includes(c.id));
    onApply(selectedCoroinhas);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Selecione coroinhas</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <ul className="max-h-64 overflow-auto">
          {filtered.length === 0 && (
            <li className="text-gray-500">Nenhum coroinha encontrado.</li>
          )}
          {filtered.map((c) => (
            <li
              key={c.id}
              className="p-2 cursor-pointer hover:bg-blue-100 rounded flex items-center gap-3"
              onClick={() => toggleSelect(c.id)}
            >
              <input
                type="checkbox"
                checked={selected.includes(c.id)}
                onChange={() => toggleSelect(c.id)}
                onClick={(e) => e.stopPropagation()} 
              />
              <img
                src={c.foto}
                alt={c.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span>{c.nome}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Aplicar filtro
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;