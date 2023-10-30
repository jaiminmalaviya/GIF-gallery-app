import '@styles/globals.css'
import fav from '@public/assets/icons/favicon.png'

export const metadata = {
    title: 'GIF Gallery',
    description: 'GIF search gallery market',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href={fav.src} type="image/x-icon" sizes="any" />
            </head>
            <body>{children}</body>
        </html>
    )
}
