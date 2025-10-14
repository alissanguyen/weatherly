import '../src/index.css'

export const metadata = {
  title: 'Weatherly',
  description: 'Weather forecast application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
