import './globals.css'
import {Inter} from 'next/font/google'
import ToasterContext from "@messenger-clone/app/context/ToasterContext";
import AuthContext from "@messenger-clone/app/context/AuthContext";

const inter = Inter({subsets: ['latin']})

export const metadata = {
	title: 'Messenger clone',
	description: 'This is a clone of messenger',
}

interface Props {
	children: React.ReactNode
}

export default function RootLayout({children}: Props) {
	return (
		<html lang="en">
		<body className={inter.className}>
		<AuthContext>
			{children}
			<ToasterContext/>
		</AuthContext>
		</body>
		</html>
	)
}
