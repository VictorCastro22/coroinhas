const CapaComLogo: React.FC = () => {
  return (
    <section className="flex items-center justify-center bg-cover bg-center relative w-full h-[221px]">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/capa.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative z-10 flex flex-col items-center text-white w-full sm:w-[400px]">
        <img
          src="/logo.png"
          alt="Logo da Paróquia"
          className="w-36 h-36 object-contain mb-2"
        />
        <h2 className="text-center font-playfair text-[1.0rem] font-medium uppercase leading-[1.2em] text-shadow-lg text-[#F1DA93]">
          Coroinhas de
        </h2>
        <h1 className="text-center font-playfair text-[1.4rem] font-bold uppercase leading-[1.0em] text-shadow-lg text-[#F1DA93]">
          Maranguape
        </h1>
      </div>
    </section>
  );
};

export default CapaComLogo;