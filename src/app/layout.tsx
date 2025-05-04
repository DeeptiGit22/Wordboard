import type { Metadata } from "next";
import "./globals.css";
import Providers from "./store/Providers";

export const metadata: Metadata = {
	title: "Workboard",
	description: "Better management through task organisation",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
