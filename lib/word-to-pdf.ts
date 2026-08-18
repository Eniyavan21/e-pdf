/**
 * Converts a DOCX file into a PDF using mammoth (DOCX → HTML) + html2pdf.js (HTML → PDF).
 * Returns a Blob of the resulting PDF.
 *
 * Note: Layout fidelity is approximate. Complex formatting may not render perfectly.
 * SECURITY: mammoth output HTML is rendered in a hidden off-screen div — never injected
 * into a visible DOM. html2pdf.js uses html2canvas for rasterisation.
 */
export async function wordToPdf(file: File): Promise<Blob> {
  const mammoth = await import("mammoth");
  const html2pdf = (await import("html2pdf.js")).default;

  const arrayBuffer = await file.arrayBuffer();

  let html: string;
  try {
    const result = await mammoth.convertToHtml({ arrayBuffer });
    html = result.value;
  } catch {
    throw new Error(
      "Could not parse the DOCX file. Make sure it is a valid Word document."
    );
  }

  // Sanitize: strip javascript: hrefs before rendering (per mammoth security advisory)
  const sanitized = html.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

  return new Promise((resolve, reject) => {
    // Render in a hidden off-screen element
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "794px"; // A4 at 96dpi
    container.innerHTML = sanitized;
    document.body.appendChild(container);

    const opt = {
      margin: 10,
      filename: file.name.replace(/\.docx$/i, ".pdf"),
      image: { type: "jpeg" as const, quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
    };

    html2pdf()
      .set(opt)
      .from(container)
      .outputPdf("blob")
      .then((blob: Blob) => {
        document.body.removeChild(container);
        resolve(blob);
      })
      .catch((err: unknown) => {
        document.body.removeChild(container);
        reject(err);
      });
  });
}
