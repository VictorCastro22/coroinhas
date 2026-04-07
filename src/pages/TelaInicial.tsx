import React from "react";
import ProximasMissas from "../features/missas/ProximasMissas";
import ProximaConfissao from "../features/confissoes/ProximaConfissao";


const TelaInicial: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
    

      {/* 2. SEÇÃO DE MISSAS DO DIA */}
      <section className="py-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-playfair font-bold text-[#535043] mb-4 text-center uppercase tracking-widest">
            Celebrações de Hoje
          </h2>
          <ProximasMissas />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-2">
        <hr className="border-gray-200" />
      </div>

      {/* 3. SEÇÃO DE CONFISSÕES */}
      <section className="pb-12">
        <div className="max-w-6xl mx-auto">
          <ProximaConfissao />
        </div>
      </section>

      <footer className="py-10 bg-white border-t border-gray-100 mt-auto text-center space-y-2 text-gray-400">
        <p className="text-xs uppercase font-bold tracking-widest font-playfair">
          Paróquia Nossa Senhora da Penha
        </p>
        <p className="text-[10px]">Centro • Maranguape - Ceará</p>
      </footer>
    </div>
  );
};

export default TelaInicial;