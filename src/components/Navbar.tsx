import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const MenuIcon = () => (
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
);

const CloseIcon = () => (
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
      className="sticky top-0 z-50 bg-[#F2EDD4] text-[#535043] shadow-md py-4"
      style={{ fontFamily: "Playfair Display, Sans-serif" }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold hover:underline link-style">
          PNSP
        </Link>

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
        } absolute left-0 w-full bg-[#FFFFFF] text-[#063265] p-4 shadow-md overflow-hidden transition-all duration-500 ease-in-out`}
        style={{ top: "100%" }}
      >
        <div className="flex flex-col gap-3 text-sm">
          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">PÁGINA INICIAL</button>

          {/* SOBRE A PARÓQUIA */}
          <div>
            <button
              type="button"
              onClick={() => setSobreSubmenuOpen(!sobreSubmenuOpen)}
              className="text-left flex items-center gap-2 hover:underline"
            >
              SOBRE A PARÓQUIA
              <svg className="h-4 w-4" viewBox="0 0 448 512">
                <title>Seta</title>
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </svg>
            </button>
            {sobreSubmenuOpen && (
              <ul className="mt-2 ml-2 flex flex-col gap-2 text-x text-[#063265]">
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


          <div>
            <button
              type="button"
              onClick={() => setCoroinhasSubmenuOpen(!coroinhasSubmenuOpen)}
              className="text-left flex items-center gap-2 hover:underline"
            >
              COROINHAS
              <svg className="h-4 w-4" viewBox="0 0 448 512">
                <title>Seta</title>
                <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </svg>
            </button>
            {coroinhasSubmenuOpen && (
              <ul className="mt-2 ml-2 flex flex-col gap-2 text-x text-[#063265]">
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

          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">AGENDAMENTOS</button>
          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">AÇÃO PASTORAL</button>
          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">COMUNICAÇÃO</button>
          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">SEJA DIZIMISTA</button>
          <button onClick={() => handleNavigation("/")} className="text-left hover:underline">CONTATO</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;