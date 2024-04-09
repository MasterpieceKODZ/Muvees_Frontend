import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { bungee_shade, ojuju, titillium_web } from "@/fonts/main.fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Movie Streaming App",
	description: "a simple movie streaming app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${ojuju.variable} ${titillium_web.variable} ${bungee_shade.variable}`}>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
