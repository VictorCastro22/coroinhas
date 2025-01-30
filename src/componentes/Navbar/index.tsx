import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false);
    setSubmenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-[#F2EDD4] text-[#535043] shadow-md py-4"
      style={{ fontFamily: "Playfair Display, Sans-serif" }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold hover:underline">
          PNSP
        </Link>

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

      <div
        className={`${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } absolute left-0 w-full bg-[#FFFFFF] text-[#063265] p-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ top: "100%" }}
      >
        <ul className="flex flex-col gap-4">
          <li>
            <button type="button" onClick={() => handleNavigation("/")} className="hover:underline text-left">
              INÍCIO
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setSubmenuOpen(!submenuOpen)}
              className="hover:underline text-left flex items-center gap-2"
            >
              ESCALA
              <span className="sub-arrow">
                <svg className="h-4 w-4" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                  <title>Seta para abrir submenu</title>
                  <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
                </svg>
              </span>
            </button>
            {submenuOpen && (
              <ul className="ml-4 flex flex-col gap-2">
                <li>
                  <button type="button" onClick={() => handleNavigation("/escala-fixa")} className="hover:underline text-left">
                    ESCALA FIXA
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => handleNavigation("/festejos")} className="hover:underline text-left">
                    NOSSA SENHORA DAS CANDEIAS
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button type="button" onClick={() => handleNavigation("/mestres")} className="hover:underline text-left">
              MESTRES
            </button>
          </li>
          <li className="text-gray-400">
            <button type="button" className="text-left" disabled>
              CALENDÁRIO CATÓLICO
            </button>
          </li>
          <li className="text-gray-400">
            <button type="button" className="text-left" disabled>
              TERÇO
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;