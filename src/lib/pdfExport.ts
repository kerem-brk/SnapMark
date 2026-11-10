/**
 * SnapMark Client-Side Multi-Page PDF 1.4 Generator
 * Generates standards-compliant, multi-page PDF documents for LinkedIn Carousel,
 * presentations, and documents directly in the browser without external dependencies.
 */

export interface PdfExportOptions {
  width?: number;
  height?: number;
  quality?: number; // JPEG quality (default 0.92)
}

/**
 * Converts a data URL (PNG/SVG/WebP) to raw JPEG binary bytes via HTML5 Canvas.
 */
export async function dataUrlToJpegBytes(
  dataUrl: string,
  targetWidth?: number,
  targetHeight?: number,
  quality = 0.92
): Promise<{ bytes: Uint8Array; width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const w = targetWidth || img.naturalWidth || img.width || 1200;
      const h = targetHeight || img.naturalHeight || img.height || 675;

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas 2D context not available"));
        return;
      }

      // Fill white background in case source has transparency
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);

      const jpegDataUrl = canvas.toDataURL("image/jpeg", quality);
      const base64Index = jpegDataUrl.indexOf(",");
      const base64 = base64Index >= 0 ? jpegDataUrl.slice(base64Index + 1) : jpegDataUrl;

      // Convert base64 to Uint8Array binary
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      resolve({ bytes, width: w, height: h });
    };
    img.onerror = (err) => reject(new Error(`Failed to load slide image for PDF export: ${err}`));
    img.src = dataUrl;
  });
}

/**
 * Builds a standards-compliant PDF 1.4 binary Blob from an array of slide JPEG images.
 * Designed specifically for LinkedIn Document/Carousel sharing and print-ready PDF export.
 */
export async function generatePdfFromImages(
  slidesDataUrls: string[],
  options?: PdfExportOptions
): Promise<Blob> {
  if (!slidesDataUrls || slidesDataUrls.length === 0) {
    throw new Error("En az bir slayt görseli gereklidir.");
  }

  // 1. Convert all slide images to JPEG bytes and gather dimensions
  const processedSlides = await Promise.all(
    slidesDataUrls.map((url) =>
      dataUrlToJpegBytes(url, options?.width, options?.height, options?.quality ?? 0.92)
    )
  );

  const numPages = processedSlides.length;
  const encoder = new TextEncoder();
  const chunks: (Uint8Array | string)[] = [];
  let currentOffset = 0;

  function write(data: string | Uint8Array) {
    if (typeof data === "string") {
      const encoded = encoder.encode(data);
      chunks.push(encoded);
      currentOffset += encoded.byteLength;
    } else {
      chunks.push(data);
      currentOffset += data.byteLength;
    }
  }

  // PDF Object offsets array (1-indexed for objects 1..totalObjects)
  // Total objects: 1 (Catalog) + 1 (Pages) + (3 * numPages) [Page, Contents, Image]
  const totalObjects = 2 + 3 * numPages;
  const offsets: number[] = new Array(totalObjects + 1).fill(0);

  // --- PDF Header ---
  // %PDF-1.4 followed by binary comment (bytes > 127) to ensure 8-bit clean transfer
  write("%PDF-1.4\n");
  write(new Uint8Array([0x25, 0xe2, 0xe3, 0xcf, 0xd3, 0x0a])); // %âãÏÓ\n

  // --- Object 1: Catalog ---
  offsets[1] = currentOffset;
  write("1 0 obj\n<<\n  /Type /Catalog\n  /Pages 2 0 R\n>>\nendobj\n");

  // Calculate object IDs for pages
  const pageObjectIds: number[] = [];
  for (let i = 0; i < numPages; i++) {
    pageObjectIds.push(3 + 3 * i);
  }

  // --- Object 2: Pages Collection ---
  offsets[2] = currentOffset;
  const kidsStr = pageObjectIds.map((id) => `${id} 0 R`).join(" ");
  write(`2 0 obj\n<<\n  /Type /Pages\n  /Kids [${kidsStr}]\n  /Count ${numPages}\n>>\nendobj\n`);

  // --- Objects for each Page ---
  for (let i = 0; i < numPages; i++) {
    const slide = processedSlides[i];
    const pageObjId = 3 + 3 * i;
    const contentsObjId = 3 + 3 * i + 1;
    const imageObjId = 3 + 3 * i + 2;

    const pw = slide.width;
    const ph = slide.height;

    // Page Object
    offsets[pageObjId] = currentOffset;
    write(
      `${pageObjId} 0 obj\n<<\n  /Type /Page\n  /Parent 2 0 R\n  /MediaBox [0 0 ${pw} ${ph}]\n  /Resources <<\n    /XObject << /Im${i + 1} ${imageObjId} 0 R >>\n  >>\n  /Contents ${contentsObjId} 0 R\n>>\nendobj\n`
    );

    // Contents Stream Object (maps unit square [0 0 1 1] to [0 0 pw ph])
    const streamContent = `q\n${pw} 0 0 ${ph} 0 0 cm\n/Im${i + 1} Do\nQ\n`;
    const streamLen = encoder.encode(streamContent).byteLength;

    offsets[contentsObjId] = currentOffset;
    write(
      `${contentsObjId} 0 obj\n<< /Length ${streamLen} >>\nstream\n${streamContent}endstream\nendobj\n`
    );

    // Image XObject (JPEG DCTDecode stream)
    offsets[imageObjId] = currentOffset;
    write(
      `${imageObjId} 0 obj\n<<\n  /Type /XObject\n  /Subtype /Image\n  /Width ${slide.width}\n  /Height ${slide.height}\n  /ColorSpace /DeviceRGB\n  /BitsPerComponent 8\n  /Filter /DCTDecode\n  /Length ${slide.bytes.byteLength}\n>>\nstream\n`
    );
    write(slide.bytes);
    write("\nendstream\nendobj\n");
  }

  // --- Cross-Reference Table (xref) ---
  const xrefOffset = currentOffset;
  write(`xref\n0 ${totalObjects + 1}\n`);
  write("0000000000 65535 f \r\n");

  for (let obj = 1; obj <= totalObjects; obj++) {
    const off = String(offsets[obj]).padStart(10, "0");
    write(`${off} 00000 n \r\n`);
  }

  // --- Trailer & EOF ---
  write(`trailer\n<<\n  /Size ${totalObjects + 1}\n  /Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return new Blob(chunks as BlobPart[], { type: "application/pdf" });
}

/**
 * Triggers a download of a PDF Blob in the browser with an auto-revoked Object URL.
 */
export function downloadPdfBlob(blob: Blob, filename = "snapmark-carousel.pdf"): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}

/**
 * Main export function to generate and download multi-slide PDF.
 */
export async function exportSlidesToPdf(
  slidesDataUrls: string[],
  filename = `snapmark-carousel-${Date.now()}.pdf`,
  options?: PdfExportOptions
): Promise<Blob> {
  const blob = await generatePdfFromImages(slidesDataUrls, options);
  downloadPdfBlob(blob, filename);
  return blob;
}
