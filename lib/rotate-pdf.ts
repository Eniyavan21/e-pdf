/**
 * Rotates pages in a PDF.
 * @param buffer - Source PDF ArrayBuffer
 * @param rotations - Map of 0-based page index → rotation degrees (90 | 180 | 270)
 */
export async function rotatePdf(
  buffer: ArrayBuffer,
  rotations: Record<number, 90 | 180 | 270>
): Promise<Uint8Array> {
  const { PDFDocument, degrees } = await import("pdf-lib");

  let doc: Awaited<ReturnType<typeof PDFDocument.load>>;
  try {
    doc = await PDFDocument.load(buffer);
  } catch {
    throw new Error(
      "Could not open the PDF. It may be password-protected or corrupted."
    );
  }

  const pages = doc.getPages();
  for (const [indexStr, deg] of Object.entries(rotations)) {
    const index = Number(indexStr);
    if (index >= 0 && index < pages.length) {
      const current = pages[index].getRotation().angle;
      pages[index].setRotation(degrees((current + deg) % 360));
    }
  }

  return doc.save();
}
