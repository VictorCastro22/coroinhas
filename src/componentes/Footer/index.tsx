import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#3677A2] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.instagram.com/coroinhas_pnsp/"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>

          <a
            href="https://www.instagram.com/senhoradapenha_mpe/"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram Paróquia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>

          <a
            href="https://www.facebook.com/senhoradapenhampe/"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook Paróquia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="w-6 h-6" />
          </a>

          <a
            href="https://www.youtube.com/c/senhoradapenhatv"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="YouTube Paróquia"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
