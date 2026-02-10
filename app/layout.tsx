import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
    title: 'River Modern by GuocoLand',
    description: 'Experience the pinnacle of luxury living in Singapore\'s newest condominium launch.',
    icons: {
        icon: '/favicon.png',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <GoogleTagManager gtmId="GTM-MQFBGKPW" />
            <body className={clsx(inter.variable, playfair.variable, "bg-slate-950 text-white min-h-screen")}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
