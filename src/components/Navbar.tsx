import { useState } from "react";
import { useNavigate} from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiCalendar,
  FiActivity,
  FiHeart,
  FiPhone,
} from "react-icons/fi";

// Ícones do menu e fechar
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-black"
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
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-black"
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
);

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sobreSubmenuOpen, setSobreSubmenuOpen] = useState(false);
  const [coroinhasSubmenuOpen, setCoroinhasSubmenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
    setSobreSubmenuOpen(false);
    setCoroinhasSubmenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    closeMenu();
  };

  return (
    <nav
      className="sticky top-0 z-50 bg-[#F2EDD4] text-black shadow-md py-4 font-poppins"
    >
      <div className="container mx-auto flex justify-between items-center px-4">


        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            className="p-2"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`${
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } absolute left-0 w-full bg-white text-black p-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ top: "100%" }}
      >
        <div className="flex flex-col gap-3 text-sm">
          <button
            onClick={() => handleNavigation("/")}
            className="text-left flex items-center gap-3 hover:underline"
          >
            <FiHome className="text-lg" /> PÁGINA INICIAL
          </button>

          {/* SOBRE A PARÓQUIA */}
          <div>
            <button
              type="button"
              onClick={() => setSobreSubmenuOpen(!sobreSubmenuOpen)}
              className="text-left flex items-center gap-3 hover:underline"
            >
              <FiBook className="text-lg" /> SOBRE A PARÓQUIA
              <svg className="h-4 w-4 ml-auto" viewBox="0 0 448 512">
                <title>Seta</title>
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </svg>
            </button>
            {sobreSubmenuOpen && (
              <ul className="mt-2 ml-2 flex flex-col gap-2 text-black">
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="text-left hover:underline"
                  >
                    História da Paróquia
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="text-left hover:underline"
                  >
                    O Pároco
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="text-left hover:underline"
                  >
                    Secretária
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* COROINHAS */}
          <div>
            <button
              type="button"
              onClick={() => setCoroinhasSubmenuOpen(!coroinhasSubmenuOpen)}
              className="text-left flex items-center gap-3 hover:underline"
            >
              <FiUsers className="text-lg" /> COROINHAS
              <svg className="h-4 w-4 ml-auto" viewBox="0 0 448 512">
                <title>Seta</title>
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </svg>
            </button>
            {coroinhasSubmenuOpen && (
              <ul className="mt-2 ml-2 flex flex-col gap-2 text-black">
                <li>
                  <button
                    onClick={() => handleNavigation("/coroinhas")}
                    className="text-left hover:underline"
                  >
                    A Pastoral
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/escala-fixa")}
                    className="text-left hover:underline"
                  >
                    Escala
                  </button>
                </li>
              </ul>
            )}
          </div>

          <button
            onClick={() => handleNavigation("/")}
            className="text-left flex items-center gap-3 hover:underline"
          >
            <FiCalendar className="text-lg" /> AGENDAMENTOS
          </button>
          <button
            onClick={() => handleNavigation("/")}
            className="text-left flex items-center gap-3 hover:underline"
          >
            <FiActivity className="text-lg" /> AÇÃO PASTORAL
          </button>
          <button
            onClick={() => handleNavigation("/")}
            className="text-left flex items-center gap-3 hover:underline"
          >
            <FiHeart className="text-lg" /> SEJA DIZIMISTA
          </button>
          <button
            onClick={() => handleNavigation("/")}
            className="text-left flex items-center gap-3 hover:underline"
          >
            <FiPhone className="text-lg" /> CONTATO
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;