import "./globals.css";
import { Inter } from 'next/font/google';
import FontLoader from '../components/FontLoader';
import Navigation from "@/components/Navigation";
import ThemeWrapper from "@/contexts/ThemeWrapper";


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const isDark = theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-display pb-20 bg-(--color-background)`}>
        <FontLoader />
        <ThemeWrapper>
          {children}
          <Navigation/>
        </ThemeWrapper>
      </body>
    </html>
  );
}
