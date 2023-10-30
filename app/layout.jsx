import '@styles/globals.css'
import fav from '@public/assets/icons/favicon.png'
import toast, { Toaster } from 'react-hot-toast'
import Nav from '@components/Nav'

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
            <body>
                <main className=" overflow-x-hidden min-h-screen mx-2 sm:mx-5">
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                        toastOptions={{
                            duration: 5000,
                            style: {
                                background: '#333',
                                color: '#fff',
                                minWidth: '270px',
                            },
                        }}
                    />
                    <Nav />
                    {children}
                </main>
            </body>
        </html>
    )
}
