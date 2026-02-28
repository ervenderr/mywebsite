"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Download,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface ResumeModalProps {
  trigger?: React.ReactNode;
  className?: string;
}

// Dynamically import the PDF viewer to avoid SSR issues with DOMMatrix
const PDFViewer = dynamic(() => import("./resume-pdf-viewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Loading viewer...</p>
      </div>
    </div>
  ),
});

export default function ResumeModal({ trigger, className }: ResumeModalProps) {
  const [open, setOpen] = useState(false);
  const resumePath = "/resume.pdf";

  const handleOpen = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }, []);

  const handleDownload = useCallback(() => {
    const a = document.createElement("a");
    a.href = resumePath;
    a.download = "Erven_Idjad_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  return (
    <>
      {trigger ? (
        <span onClick={handleOpen} className="cursor-pointer">
          {trigger}
        </span>
      ) : (
        <Button size="sm" className={className} onClick={handleOpen}>
          Resume <FileText className="ml-2 h-4 w-4" />
        </Button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-[95vw] h-[85vh] p-0 gap-0 overflow-hidden [&>button]:z-20">
          <DialogHeader className="px-4 py-3 border-b flex flex-row items-center justify-between shrink-0 bg-background">
            <DialogTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Resume - Erven Idjad
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(resumePath, "_blank")}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Open
              </Button>
              <Button variant="default" size="sm" onClick={handleDownload}>
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download
              </Button>
            </div>
          </DialogHeader>

          {open && <PDFViewer file={resumePath} />}
        </DialogContent>
      </Dialog>
    </>
  );
}
