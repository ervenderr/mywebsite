"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface PDFViewerProps {
  file: string;
}

export default function ResumePDFViewer({ file }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);

  // Fetch the PDF via API route as octet-stream to bypass PDF content-type blocking
  useEffect(() => {
    let cancelled = false;
    fetch("/api/resume")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.arrayBuffer();
      })
      .then((data) => {
        if (!cancelled) setPdfData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch PDF:", err);
        if (!cancelled) {
          setLoading(false);
          setError(true);
        }
      });
    return () => { cancelled = true; };
  }, []);

  // Memoize the file prop to prevent re-renders
  const fileData = useMemo(() => {
    if (!pdfData) return null;
    return { data: pdfData };
  }, [pdfData]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setLoading(false);
    },
    []
  );

  const goToPrevPage = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNextPage = () => setPageNumber((p) => Math.min(numPages, p + 1));
  const zoomIn = () => setScale((s) => Math.min(2.0, +(s + 0.2).toFixed(1)));
  const zoomOut = () => setScale((s) => Math.max(0.5, +(s - 0.2).toFixed(1)));

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <p className="text-muted-foreground">Unable to load PDF viewer.</p>
          <Button
            variant="outline"
            onClick={() => window.open(file, "_blank")}
          >
            Open PDF in new tab
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* PDF Controls */}
      <div className="px-4 py-2 border-b flex items-center justify-between bg-background/80 shrink-0">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goToPrevPage}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[80px] text-center">
            {pageNumber} / {numPages || "—"}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={goToNextPage}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={zoomOut}
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground min-w-[50px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={zoomIn}
            disabled={scale >= 2.0}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Document */}
      <div className="flex-1 min-h-0 overflow-auto bg-muted/30 flex justify-center relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">
                Loading resume...
              </p>
            </div>
          </div>
        )}
        {fileData && (
          <Document
            file={fileData}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(err) => {
              console.error("PDF parse error:", err);
              setLoading(false);
              setError(true);
            }}
            loading={null}
            className="py-4"
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg mx-auto"
            />
          </Document>
        )}
      </div>
    </>
  );
}
