import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserContextProvider } from "@/utils/contexts/UserContext";
const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next template',
  description: 'boiler plate for next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<body
				className={
					inter.className
				}>
				<UserContextProvider>
					{children}
				</UserContextProvider>
			</body>
		</html>
	);
}
