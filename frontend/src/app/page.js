"use client"

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { Upload, History, LogIn } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Welcome to PDFly</h1>
        <p className="text-center text-gray-600 mb-12">
          Secure PDF upload and management system
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/auth">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <LogIn className="w-8 h-8 mb-4 text-primary" />
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Authenticate to access your account
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/upload">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <Upload className="w-8 h-8 mb-4 text-primary" />
                <CardTitle>Upload PDF</CardTitle>
                <CardDescription>
                  Drag & drop your PDF files
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <History className="w-8 h-8 mb-4 text-primary" />
                <CardTitle>View History</CardTitle>
                <CardDescription>
                  Access your upload history
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}