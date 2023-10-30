'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@components/Loading'
import { db } from '@Firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'

const Favorite = () => {
    const [gifs, setGifs] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [favorites, setFavorites] = useState([])
    const limit = 20
    const [userId, setUserId] = useState()

    const searchParams = useSearchParams()

    useEffect(() => {
        setLoading(true)
        setUserId(() => searchParams.get('uid'))
        ;(async () => {
            const userFavoriteGif = await getDoc(doc(db, 'users', searchParams.get('uid')))
            setFavorites(userFavoriteGif.data().favoriteGif)
        })()
        setLoading(false)
    }, [])

    useEffect(() => {
        setLoading(true)

        const fetchGIFs = async () => {
            const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'
            const fetchedGIFs = []

            await Promise.all(
                favorites.map(async (item) => {
                    const url = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${item}`
                    const response = await axios.get(url)
                    fetchedGIFs.push(...response.data.data)
                })
            )

            setGifs(fetchedGIFs)
            setLoading(false)
        }

        fetchGIFs()
    }, [favorites])

    const handleFavoriteChange = async (gifId) => {
        const res = await fetch(`/api/user/${userId}?gifId=${gifId}`)
        const data = await res.json()
        setFavorites(data)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    const totalPages = Math.floor(favorites.length / limit + 1)

    const getPageNumbers = () => {
        const pageNumbers = []
        const maxPages = Math.min(totalPages, 3)
        let startPage = 1
        if (currentPage > 2 && totalPages > 3) {
            startPage = Math.min(currentPage - 1, totalPages - 2)
        }
        for (let i = 0; i < maxPages; i++) {
            pageNumbers.push(startPage)
            startPage++
        }
        return pageNumbers
    }

    return (
        <main className="bg-white rounded-[20px] w-full shadow md:mt-0 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl m-auto p-6 min-h-[72vh] relative mb-10">
            {loading ? (
                <Loading />
            ) : !gifs.length == 0 ? (
                <div>
                    <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
                        {gifs.map((gif) => {
                            return (
                                <div key={gif.id} className="relative">
                                    <img
                                        className="rounded-md mb-4 w-full hover:"
                                        src={gif.images.fixed_height.url}
                                        alt={gif.title}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-opacity-50 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                                    <button
                                        className="absolute top-4 right-4"
                                        onClick={() => handleFavoriteChange(gif.id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="red"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="red"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-8 mb-5 flex justify-center gap-5">
                        <button
                            className="text-sm font-semibold"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {getPageNumbers().map((pageNumber) => (
                            <button
                                key={pageNumber}
                                className={`text-sm p-2.5 px-3 ${
                                    currentPage === pageNumber
                                        ? 'border-b-4 bg-pink-100 border-b-pink-600'
                                        : ''
                                }`}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        <button
                            className="text-sm font-semibold"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="p-5 bg-slate-200 m-auto absolute_center rounded-xl w-max">
                    No any GIF found 🫡
                </div>
            )}
        </main>
    )
}

export default Favorite
