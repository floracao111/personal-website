// Turns each page of a PDF into a JPG for the page reader on a project page.
// Uses macOS's built-in PDF engine — nothing to install.
//
//   osascript -l JavaScript scripts/pdf-pages.js <file.pdf> <output folder> [width]
//
// e.g. osascript -l JavaScript scripts/pdf-pages.js assets/projects/cueddata/portfolio.pdf assets/projects/cueddata/web/pages
// Writes page-01.jpg, page-02.jpg, … (default 2000px wide) and prints them, ready to paste into js/content.js.

ObjC.import('Foundation');
ObjC.import('AppKit');
ObjC.import('PDFKit');

function run(argv) {
  const [pdfPath, outDir, widthArg] = argv;
  if (!pdfPath || !outDir) return 'usage: osascript -l JavaScript scripts/pdf-pages.js <file.pdf> <output folder> [width]';
  const width = Number(widthArg) || 2000;

  const fm = $.NSFileManager.defaultManager;
  const cwd = fm.currentDirectoryPath.js;
  const abs = (p) => (p.startsWith('/') ? p : `${cwd}/${p}`);

  const doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(abs(pdfPath)));
  if (!doc || doc.isNil()) return `could not open ${pdfPath}`;
  fm.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(abs(outDir), true, $(), null);

  const written = [];
  for (let i = 0; i < doc.pageCount; i++) {
    const page = doc.pageAtIndex(i);
    const box = page.boundsForBox($.kPDFDisplayBoxCropBox);
    const height = Math.round((width * box.size.height) / box.size.width);

    // draw the page onto a white canvas at the exact pixel size
    const rep = $.NSBitmapImageRep.alloc.initWithBitmapDataPlanesPixelsWidePixelsHighBitsPerSampleSamplesPerPixelHasAlphaIsPlanarColorSpaceNameBytesPerRowBitsPerPixel(
      null, width, height, 8, 4, true, false, $.NSDeviceRGBColorSpace, 0, 0);
    const ctx = $.NSGraphicsContext.graphicsContextWithBitmapImageRep(rep);
    $.NSGraphicsContext.saveGraphicsState;
    $.NSGraphicsContext.setCurrentContext(ctx);
    $.NSColor.whiteColor.setFill;
    $.NSRectFill($.NSMakeRect(0, 0, width, height));
    const cg = ctx.CGContext;
    $.CGContextScaleCTM(cg, width / box.size.width, height / box.size.height);
    $.CGContextTranslateCTM(cg, -box.origin.x, -box.origin.y);
    page.drawWithBoxToContext($.kPDFDisplayBoxCropBox, cg);
    $.NSGraphicsContext.restoreGraphicsState;

    const jpg = rep.representationUsingTypeProperties($.NSBitmapImageFileTypeJPEG, $({ NSImageCompressionFactor: 0.82 }));
    const name = `page-${String(i + 1).padStart(2, '0')}.jpg`;
    jpg.writeToFileAtomically(`${abs(outDir)}/${name}`, true);
    written.push(`'${outDir.replace(/\/$/, '')}/${name}'`);
  }
  return `${written.length} pages (${width}px wide):\n  pages: [\n    ${written.join(',\n    ')},\n  ],`;
}
