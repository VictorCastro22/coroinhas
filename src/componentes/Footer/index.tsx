const Footer: React.FC = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <title>Facebook</title>
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.495v-9.294H9.691V11.11h3.129V8.325c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.465.099 2.797.143v3.245h-1.92c-1.507 0-1.797.716-1.797 1.765v2.31h3.59l-.467 3.596h-3.123V24h6.116c.73 0 1.324-.593 1.324-1.326V1.326C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <title>Twitter</title>
                <path d="M24 4.557a9.846 9.846 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.713 0-4.917 2.205-4.917 4.917 0 .386.044.762.127 1.124A13.957 13.957 0 0 1 1.671 3.149a4.92 4.92 0 0 0-.665 2.473c0 1.705.869 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.062a4.92 4.92 0 0 0 3.946 4.827 4.936 4.936 0 0 1-2.224.084 4.926 4.926 0 0 0 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.211c9.142 0 14.307-7.721 14.307-14.415 0-.22-.004-.436-.015-.653A10.243 10.243 0 0 0 24 4.557z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <title>LinkedIn</title>
                <path d="M19 0h-14c-2.762 0-5 2.238-5 5v14c0 2.762 2.238 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.762-2.238-5-5-5zm-11.846 20.338h-3.074v-9.338h3.074v9.338zm-1.537-10.64c-1.012 0-1.836-.824-1.836-1.836s.824-1.836 1.836-1.836c1.011 0 1.835.824 1.835 1.836s-.824 1.836-1.835 1.836zm13.384 10.64h-3.072v-4.785c0-1.14-.021-2.603-1.584-2.603-1.584 0-1.827 1.236-1.827 2.515v4.873h-3.072v-9.338h2.948v1.276h.043c.41-.778 1.412-1.601 2.907-1.601 3.108 0 3.679 2.047 3.679 4.705v5.958z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;  