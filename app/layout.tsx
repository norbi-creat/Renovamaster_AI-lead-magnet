export const metadata = {
  title: 'Kaheliszto Kft.',
  description: 'Felújítási csekklista',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
