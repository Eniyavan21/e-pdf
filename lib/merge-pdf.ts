/**
 * Merges multiple PDF ArrayBuffers into a single PDF Uint8Array.
 * Uses pdf-lib (client-side only).
 */
export async function mergePdfs(pdfBuffers: ArrayBuffer[]): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");

  const merged = await PDFDocument.create();

  for (const buffer of pdfBuffers) {
    let doc: Awaited<ReturnType<typeof PDFDocument.load>>;
    try {
      doc = await PDFDocument.load(buffer);
    } catch {
      throw new Error(
        "One of the files could not be opened. It may be password-protected or corrupted."
      );
    }
    const indices = doc.getPageIndices();
    const pages = await merged.copyPages(doc, indices);
    pages.forEach((page) => merged.addPage(page));
  }

  return merged.save();
}
