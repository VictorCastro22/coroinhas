import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className="sticky top-0 z-50 bg-[#F2EDD4] text-[#535043] shadow-md py-4"
      style={{ fontFamily: "Playfair Display, Sans-serif" }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">

      <h1 className="text-2xl font-bold">PNSP</h1>

          
        <div className="flex items-center gap-4">
          {!menuOpen && (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              className="p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Ícone de menu</title>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          )}

          {menuOpen && (
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <title>Ícone de fechar menu</title>
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>


      {menuOpen && (
        <div
          className="absolute left-0 w-full bg-[#FFFFFF] text-[#063265] p-4 shadow-md"
          style={{ top: "100%" }}
        >
          <ul className="flex flex-col gap-4">
            <li>
              <button
                type="button"
                onClick={() => navigate("/escala-fixa")}
                className="hover:underline text-left"
                style={{
                  fontFamily: "Playfair Display, Sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                Escala Fixa
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate("/festejos")}
                className="hover:underline text-left"
                style={{
                  fontFamily: "Playfair Display, Sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                Nossa Senhora das Candeias
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="hover:underline text-left"
                style={{
                  fontFamily: "Playfair Display, Sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 400,
                  textTransform: "uppercase",
                }}
              >
                Mestres
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
