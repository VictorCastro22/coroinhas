import React, { useState, useMemo } from "react";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface Props {
  coroinhas: Coroinha[];
  selectedId: string | null;
  onApply: (selected: Coroinha) => void;
}

const SearchableSelect: React.FC<Props> = ({ coroinhas, selectedId, onApply }) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(selectedId);

  const filtered = useMemo(() => {
    return coroinhas.filter((c) =>
      c.nome.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, coroinhas]);

  const toggleSelect = (id: string) => {
    setSelected(id);
  };

  const handleApply = () => {
    const selectedCoroinha = coroinhas.find((c) => c.id === selected) || coroinhas[0];
    onApply(selectedCoroinha);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-center items-center mb-4">
          <h2 className="text-xl font-semibold">Selecione um coroinha</h2>
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
              className={`p-2 cursor-pointer hover:bg-blue-100 rounded flex items-center gap-3 ${selected === c.id ? "bg-blue-200" : ""}`}
              onClick={() => toggleSelect(c.id)}
            >
              <input
                type="radio"
                checked={selected === c.id}
                onChange={() => toggleSelect(c.id)}
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
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchableSelect;
