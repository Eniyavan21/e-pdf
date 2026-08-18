/**
 * Extracts text from a PDF (using pdfjs-dist) and builds a DOCX file (using docx).
 * Returns a Blob of the DOCX file.
 *
 * Note: This is text extraction only — formatting, images, and tables are not preserved.
 * This is a browser-side limitation.
 */
export async function pdfToWord(buffer: ArrayBuffer): Promise<Blob> {
  // Dynamically import heavy libs to keep initial bundle small
  const pdfjsLib = await import("pdfjs-dist");

  // Point the worker to the CDN copy to avoid bundling issues
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const { Document, Paragraph, Packer, HeadingLevel } = await import("docx");

  let pdf: Awaited<ReturnType<typeof pdfjsLib.getDocument>["promise"]>;
  try {
    pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer) }).promise;
  } catch {
    throw new Error(
      "Could not open the PDF. It may be password-protected or corrupted."
    );
  }

  const paragraphs: InstanceType<typeof Paragraph>[] = [
    new Paragraph({
      text: "Converted from PDF by e-pdf",
      heading: HeadingLevel.TITLE,
    }),
  ];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .trim();

    if (pageText) {
      paragraphs.push(
        new Paragraph({
          text: `— Page ${i} —`,
          heading: HeadingLevel.HEADING_2,
        }),
        new Paragraph({ text: pageText })
      );
    }
  }

  const doc = new Document({
    sections: [{ children: paragraphs }],
  });

  return Packer.toBlob(doc);
}
