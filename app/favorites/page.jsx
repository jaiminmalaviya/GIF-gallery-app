'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '@app/components/Loading'
import { getUserCookie } from '@app/helpers/action'
import toast from 'react-hot-toast'
import Pagination from '@app/components/Pagination'
import GifCard from '@app/components/GifCard'
import { LIMIT } from '@app/libs/constants'

const page = () => {
   const [currentPage, setCurrentPage] = useState(1)
   const [maxPages, setMaxPages] = useState(1)
   const [favorites, setFavorites] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchUserFavorites = async () => {
         const user = await getUserCookie()
         setFavorites(user.favorites)
         setMaxPages(Math.ceil(user.favorites.length / LIMIT))
         setLoading(false)
      }
      fetchUserFavorites()
   }, [])

   const handleFavoriteChange = async (gif) => {
      const shortGif = {
         id: gif.giphyId,
         url: gif.url,
         title: gif.title,
         username: gif.username,
         slug: gif.slug,
      }
      try {
         const response = await axios.post(`/api/favorites`, {
            shortGif,
         })
         setFavorites(response.data)
         setMaxPages(Math.ceil(response.data.length / LIMIT))
      } catch (error) {
         toast.error(error.response?.data)
      }
   }

   const getPageNumbers = () => {
      const pageNumbers = []

      const maxPage = Math.min(maxPages, Math.max(currentPage + 2, 5))
      const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4))

      for (let i = minPage; i <= maxPage; i++) {
         pageNumbers.push(i)
      }

      return pageNumbers
   }

   return (
      <main className="bg-white rounded-[20px] w-full shadow md:mt-0 sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl m-auto p-6 min-h-[72vh] relative mb-10">
         {loading ? (
            <Loading />
         ) : !favorites.length == 0 ? (
            <div>
               <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
                  {favorites.map((gif) => {
                     return (
                        <GifCard
                           key={gif.id}
                           gif={gif}
                           favorites={favorites}
                           handleFavoriteChange={handleFavoriteChange}
                           like={true}
                        />
                     )
                  })}
               </div>
               <Pagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  maxPages={maxPages}
                  getPageNumbers={getPageNumbers}
               />
            </div>
         ) : (
            <div className="p-5 bg-slate-200 m-auto absolute_center rounded-xl w-max">
               No any GIF found 🫡
            </div>
         )}
      </main>
   )
}

export default page
