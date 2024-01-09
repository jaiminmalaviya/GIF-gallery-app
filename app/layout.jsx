import '@app/styles/globals.css'
import fav from '@public/assets/icons/favicon.png'
import { Toaster } from 'react-hot-toast'
import Navbar from '@app/components/Navbar'

export const metadata = {
   title: 'GIF Gallery',
   description: 'GIF search gallery market',
}

export default function RootLayout({ children }) {
   return (
      <html lang="en">
         <head>
            <link
               rel="icon"
               href={fav.src}
               type="image/x-icon"
               sizes="any"
            />
         </head>
         <body>
            <main className="overflow-x-hidden flex flex-col min-h-screen mx-2 sm:mx-5">
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
               <Navbar />
               {children}
            </main>
         </body>
      </html>
   )
}
