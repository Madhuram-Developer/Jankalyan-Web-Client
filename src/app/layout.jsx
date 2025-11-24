import "./globals.css";
import { Inter } from 'next/font/google';



const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${inter.variable} antialiased font-display`}>
          {children}
      </body>
    </html>
  );
}
