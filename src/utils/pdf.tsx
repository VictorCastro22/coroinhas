import jsPDF from "jspdf";

interface Coroinha {
  id: string;
  nome: string;
  foto: string;
}

interface Escala {
  id: string;
  data: string;
  horario: string;
  local: string;
  padre: string;
}

export const gerarPdfEscala = (
  escalas: Escala[],
  coroinhas: Coroinha[],
  searchTerm: string
) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Escala de Serviço - Coroinha", 14, 22);

  if (searchTerm) {
    const coroinha = coroinhas.find(
      (c) => c.nome.toLowerCase() === searchTerm.toLowerCase()
    );
    if (coroinha) {
      doc.setFontSize(14);
      doc.text(`Coroinha: ${coroinha.nome}`, 14, 30);
    }
  }

  escalas.forEach((escala, index) => {
    const y = 40 + index * 10;
    doc.setFontSize(12);
    doc.text(`Data: ${escala.data}`, 14, y);
    doc.text(`Horário: ${escala.horario}`, 50, y);
    doc.text(`Local: ${escala.local}`, 80, y);
    doc.text(`Padre: ${escala.padre}`, 160, y);
  });

  doc.save("escala-coroinha.pdf");
};