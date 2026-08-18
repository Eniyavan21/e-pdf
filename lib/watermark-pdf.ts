/**
 * Adds a text watermark to every page of a PDF.
 */
export interface WatermarkOptions {
  text: string;
  /** Font size in points (default: 50) */
  fontSize?: number;
  /** Opacity 0–1 (default: 0.25) */
  opacity?: number;
  /** Rotation in degrees (default: -45) */
  rotateDeg?: number;
  /** RGB color as 0–1 values (default: grey) */
  color?: { r: number; g: number; b: number };
}

export async function watermarkPdf(
  buffer: ArrayBuffer,
  options: WatermarkOptions
): Promise<Uint8Array> {
  const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");

  const {
    text,
    fontSize = 50,
    opacity = 0.25,
    rotateDeg = -45,
    color = { r: 0.5, g: 0.5, b: 0.5 },
  } = options;

  let doc: Awaited<ReturnType<typeof PDFDocument.load>>;
  try {
    doc = await PDFDocument.load(buffer);
  } catch {
    throw new Error(
      "Could not open the PDF. It may be password-protected or corrupted."
    );
  }

  const font = await doc.embedFont(StandardFonts.HelveticaBold);
  const pages = doc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: height / 2 - fontSize / 2,
      size: fontSize,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: degrees(rotateDeg),
    });
  }

  return doc.save();
}
