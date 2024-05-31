import type { Metadata } from "next";
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import "./globals.css";
import Header from "~/components/header";
import Footer from "~/components/footer";
 
const Menlo = localFont({
  src: '../fonts/Menlo-Regular.ttf',
  display: 'swap',
})
 

export const metadata: Metadata = {
  title: "!00",
  description: "100 Days of Code Challenge",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" href="/!00.svg" sizes="any" />
      <body className={Menlo.className}>
        <ThemeProvider>
          <main className="max-w-screen-md mx-auto h-screen flex flex-col py-2 px-4 md:px-32">
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
