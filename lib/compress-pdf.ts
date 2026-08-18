/**
 * Compresses a PDF by re-saving with object streams enabled.
 * Provides ~5-15% size reduction for text-based PDFs.
 * For image-heavy PDFs, images are not re-compressed (browser limitation).
 */
export async function compressPdf(buffer: ArrayBuffer): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");

  let doc: Awaited<ReturnType<typeof PDFDocument.load>>;
  try {
    doc = await PDFDocument.load(buffer);
  } catch {
    throw new Error(
      "Could not open the PDF. It may be password-protected or corrupted."
    );
  }

  // useObjectStreams packs cross-reference tables, reducing file size
  return doc.save({ useObjectStreams: true });
}
