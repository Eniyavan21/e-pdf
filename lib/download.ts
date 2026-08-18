/** Download a Uint8Array or Blob as a file in the browser */
export function downloadFile(
  data: Uint8Array | Blob,
  filename: string,
  mimeType = "application/pdf"
): void {
  const blob = data instanceof Uint8Array ? new Blob([data as unknown as ArrayBuffer], { type: mimeType }) : data;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
