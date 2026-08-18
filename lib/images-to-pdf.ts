/**
 * Converts an array of image Files (JPEG or PNG) into a single PDF.
 * Each image fills its own page, scaled to A4 with padding.
 */
export async function imagesToPdf(images: File[]): Promise<Uint8Array> {
  const { PDFDocument } = await import("pdf-lib");

  const doc = await PDFDocument.create();

  for (const file of images) {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const isJpeg =
      file.type === "image/jpeg" ||
      file.name.toLowerCase().endsWith(".jpg") ||
      file.name.toLowerCase().endsWith(".jpeg");
    const isPng =
      file.type === "image/png" || file.name.toLowerCase().endsWith(".png");

    if (!isJpeg && !isPng) {
      throw new Error(
        `Unsupported image type: ${file.name}. Only JPEG and PNG are supported.`
      );
    }

    const img = isJpeg ? await doc.embedJpg(bytes) : await doc.embedPng(bytes);

    // A4 dimensions in points (72 dpi)
    const A4_WIDTH = 595.28;
    const A4_HEIGHT = 841.89;
    const PADDING = 20;

    const maxW = A4_WIDTH - PADDING * 2;
    const maxH = A4_HEIGHT - PADDING * 2;

    const scale = Math.min(maxW / img.width, maxH / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    const page = doc.addPage([A4_WIDTH, A4_HEIGHT]);
    page.drawImage(img, {
      x: (A4_WIDTH - drawWidth) / 2,
      y: (A4_HEIGHT - drawHeight) / 2,
      width: drawWidth,
      height: drawHeight,
    });
  }

  return doc.save();
}
