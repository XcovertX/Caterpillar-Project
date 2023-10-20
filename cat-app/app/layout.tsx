
import './globals.css'
export const metadata = {
  title: 'Cat',
  description: 'Built by James Covert',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-200 h-screen">{children}</body>
    </html>
  )
}
