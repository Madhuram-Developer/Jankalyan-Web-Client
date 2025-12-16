import "./globals.css";
import { Inter } from 'next/font/google';



const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/png/appicon.png" type="image/png" />
        <title>Jankalyan</title>
        <meta name="description" content="Jankalyan Admin Application" />
      </head>
      <body className={`${inter.variable} antialiased font-display`}>
          {children}
      </body>
    </html>
  );
}
