import { useState, useEffect } from "react";

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [escala, setEscala] = useState([]);
  const [formData, setFormData] = useState({ nome: "", data: "", horario: "", igreja: "" });
  
  const correctPassword = "607080";
  const googleScriptURL = "https://script.google.com/macros/s/AKfycby9L9bNTYHUpLRAgwOSXTC6jpfTR9E2eGD8x2i-y-5vgxUGBl81T-6lt6Ty7fxKLhd2yg/exec"; // Substitua pela URL gerada no Apps Script

  useEffect(() => {
    fetchEscala();
  }, []);

  const fetchEscala = async () => {
    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        body: JSON.stringify({ action: "get" }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEscala(data.slice(1));
    } catch (error) {
      console.error("Erro ao buscar escala:", error);
    }
  };

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch(googleScriptURL, {
        method: "POST",
        body: JSON.stringify({ action: "add", id: Date.now(), ...formData }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchEscala();
      setFormData({ nome: "", data: "", horario: "", igreja: "" });
    } catch (error) {
      console.error("Erro ao adicionar escala:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isAuthenticated ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Área Administrativa</h2>
          <input
            type="password"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Entrar
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold">Gerenciar Escala dos Padres</h2>
          <form onSubmit={handleSubmit} className="mt-4">
            <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="border p-2 rounded w-full mb-2" required />
            <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 rounded w-full mb-2" required />
            <input type="text" name="horario" placeholder="Horário" value={formData.horario} onChange={handleChange} className="border p-2 rounded w-full mb-2" required />
            <input type="text" name="igreja" placeholder="Igreja" value={formData.igreja} onChange={handleChange} className="border p-2 rounded w-full mb-2" required />
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Adicionar Escala</button>
          </form>
          <h3 className="text-lg font-bold mt-6">Escala Atual:</h3>
          <ul className="mt-2">
            {escala.map((item, index) => (
              <li key={index} className="border p-2 rounded bg-white shadow-md mt-2">
                {item[1]} - {item[2]} - {item[3]} - {item[4]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Admin;