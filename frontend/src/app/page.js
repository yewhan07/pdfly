"use client"

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Upload, History, LogIn, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const { toast } = useToast()

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (!file.type === 'application/pdf') {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file only",
      })
      return
    }

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        toast({
          title: "Upload complete",
          description: "Your PDF has been successfully uploaded",
        })
      }
    }, 100)
  }, [toast])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Login Button */}
      <div className="w-full border-b bg-white">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">PDFly</h1>
          <Link href="/auth">
            <Button variant="outline" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Upload Your PDF</h2>
          <p className="text-center text-gray-600 mb-8">
            Drag and drop your PDF file to securely upload and share
          </p>
          
          <Card>
            <CardContent className="pt-6">
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors
                  ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
              >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-lg font-medium">
                  {isDragActive ? "Drop your PDF here" : "Drag & drop your PDF here"}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  or click to select a file
                </p>
              </div>

              {uploadProgress > 0 && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              <Alert className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Only PDF files are accepted. Maximum file size: 10MB
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* View History Button */}
          <div className="mt-6 text-center">
            <Link href="/history">
              <Button variant="outline" size="lg">
                <History className="h-5 w-5 mr-2" />
                View Upload History
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}