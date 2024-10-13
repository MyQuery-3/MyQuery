"use client"

import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import "./globals.css";
import "./animation.css"
import AuthProvider from "./provider/authProvider";

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
		src: [
			{
				path: "./fonts/MiSansTH/MiSansThai.woff2",
				weight: "400",
				style: "normal"
			},
		],
		variable: "--font-misans-th",
	}
)

const MiSans = localFont(
	{
		src: [
			{
				path: "./fonts/MiSans/MiSansLatin-Regular.woff2",
				weight: "400",
				style: "normal"
			}
		],
		variable: "--font-misans",
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
			<AuthProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} ${MiSans.variable} ${MiSansTH.variable}  font-misans text-foreground bg-background antialiased`}
				>
					<Header />∏
					{children}
				</body>
			</AuthProvider>
		</html>
	);
}
