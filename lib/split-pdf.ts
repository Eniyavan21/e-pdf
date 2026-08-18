/**
 * Splits a PDF into separate PDFs, one per page range.
 * @param buffer - Source PDF ArrayBuffer
 * @param ranges - Array of [startPage, endPage] (1-based, inclusive)
 * Returns an array of Uint8Arrays (one per range).
 */
export async function splitPdf(
  buffer: ArrayBuffer,
  ranges: [number, number][]
): Promise<Uint8Array[]> {
  const { PDFDocument } = await import("pdf-lib");

  let src: Awaited<ReturnType<typeof PDFDocument.load>>;
  try {
    src = await PDFDocument.load(buffer);
  } catch {
    throw new Error(
      "Could not open the PDF. It may be password-protected or corrupted."
    );
  }

  const totalPages = src.getPageCount();
  const results: Uint8Array[] = [];

  for (const [start, end] of ranges) {
    const clampedStart = Math.max(1, start);
    const clampedEnd = Math.min(totalPages, end);

    if (clampedStart > clampedEnd) {
      throw new Error(
        `Invalid range ${start}–${end}. The PDF has ${totalPages} pages.`
      );
    }

    const part = await PDFDocument.create();
    // pdf-lib uses 0-based indices
    const indices = Array.from(
      { length: clampedEnd - clampedStart + 1 },
      (_, i) => clampedStart - 1 + i
    );
    const pages = await part.copyPages(src, indices);
    pages.forEach((p) => part.addPage(p));
    results.push(await part.save());
  }

  return results;
}
