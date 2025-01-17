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
import { Download } from "lucide-react"

// Mock data - will be replaced with real data from API
const mockUploads = [
  {
    id: 1,
    filename: "document1.pdf",
    uploadDate: "2024-01-17T08:00:00",
    size: "2.4 MB",
    url: "#"
  },
  {
    id: 2,
    filename: "presentation.pdf",
    uploadDate: "2024-01-16T15:30:00",
    size: "1.8 MB",
    url: "#"
  }
]

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Upload History</h1>
      
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
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}