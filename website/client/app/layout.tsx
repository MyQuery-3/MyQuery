import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./animation.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const MiSansTH = localFont(
  {
    src : [
      {
        path : "./fonts/MiSansTH/MiSansThai.woff2",
        weight : "400",
        style : "normal"
      },
    ] ,
    variable : "--font-misans-th",
  } 
)

const MiSans = localFont(
  {
    src : [
      {
        path : "./fonts/MiSans/MiSansLatin-Regular.woff2",
        weight : "400",
        style : "normal"
      }
    ] ,
    variable : "--font-misans",
  }
)

export const metadata: Metadata = {
  title: "MyQuery | MySQL Leaning Platform For IT Faculty(None official)",
  description: "MyQuery is a MySQL leaning platform for IT faculty. It is a none official platform for learning MySQL.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${MiSans.variable} ${MiSansTH.variable}  font-misans text-foreground bg-background antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
