import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Binario Store',
  description: 'Admin dashboard of binario store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
