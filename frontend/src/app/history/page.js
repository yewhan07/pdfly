"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Download, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data - will be replaced with real data from API
const mockUploads = [
  {
    id: 1,
    filename: "document1.pdf",
    uploadDate: "2024-01-17T08:00:00",
    size: "2.4 MB",
    // For demo purposes - replace with actual URLs in production
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  },
  {
    id: 2,
    filename: "presentation.pdf",
    uploadDate: "2024-01-16T15:30:00",
    size: "1.8 MB",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  }
]

export default function HistoryPage() {
  const [previewFile, setPreviewFile] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handlePreview = (file) => {
    setPreviewFile(file)
    setIsPreviewOpen(true)
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Upload History</h1>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUploads.map((file) => (
              <TableRow key={file.id}>
                <TableCell>{file.filename}</TableCell>
                <TableCell>
                  {new Date(file.uploadDate).toLocaleString()}
                </TableCell>
                <TableCell>{file.size}</TableCell>
                <TableCell className="space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handlePreview(file)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(file.url, '_blank')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* PDF Preview Dialog */}
      <Dialog 
        open={isPreviewOpen} 
        onOpenChange={setIsPreviewOpen}
      >
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {previewFile?.filename}
            </DialogTitle>
          </DialogHeader>
          {previewFile && (
            <div className="flex-1 w-full h-full min-h-[60vh]">
              <iframe
                src={`${previewFile.url}#toolbar=0`}
                className="w-full h-full rounded-md"
                style={{ border: "none" }}
                title={`Preview of ${previewFile.filename}`}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}