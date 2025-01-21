
import "./globals.css";
import Link from 'next/link';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <button> 
          <Link href="/"> Home </Link>
        </button>
        {children}
      </body>
    </html>
  );
}
