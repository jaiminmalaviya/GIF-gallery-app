'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from './Loading'
import { LIMIT } from '@app/libs/constants'
import { getUserCookie } from '@app/helpers/action'
import toast from 'react-hot-toast'
import Pagination from './Pagination'
import GifCard from './GifCard'
import SearchBar from './SearchBar'

const Feed = () => {
   const [search, setSearch] = useState('')
   const [gifs, setGifs] = useState([])
   const [currentPage, setCurrentPage] = useState(1)
   const [maxPages, setMaxPages] = useState(1)
   const [favorites, setFavorites] = useState([])
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      const fetchUserFavorites = async () => {
         const user = await getUserCookie()
         setFavorites(user.favorites)
      }
      fetchUserFavorites()
   }, [])

   useEffect(() => {
      let cancelRequest = null
      let isMounted = true

      const fetchData = async () => {
         try {
            setLoading(true)
            let data = []
            if (cancelRequest) cancelRequest()

            if (search.trim().length === 0) {
               try {
                  const response = await axios.post(
                     '/api/trending',
                     { currentPage },
                     {
                        cancelToken: new axios.CancelToken((c) => (cancelRequest = c)),
                     }
                  )
                  data = response.data
               } catch (error) {
                  toast.error(error.response?.data)
               }
            } else {
               try {
                  const response = await axios.post(
                     '/api/search',
                     { currentPage, search },
                     {
                        cancelToken: new axios.CancelToken((c) => (cancelRequest = c)),
                     }
                  )
                  data = response.data
               } catch (error) {
                  toast.error(error.response?.data)
               }
            }

            if (isMounted) {
               const uniqueGifs = Array.from(new Set(data.data.map((obj) => obj.id))).map((id) =>
                  data.data.find((obj) => obj.id === id)
               )
               setMaxPages(Math.ceil(data.pagination.total_count / LIMIT))
               setGifs(uniqueGifs)
            }
         } catch (error) {
            if (axios.isCancel(error)) console.log('Request canceled', error.message)
            else toast.error(error)
         } finally {
            if (isMounted) setLoading(false)
         }
      }

      const timeout = setTimeout(fetchData, 1000)
      return () => {
         clearTimeout(timeout)
         isMounted = false
      }
   }, [search, currentPage])

   useEffect(() => {
      setCurrentPage(1)
   }, [search])

   const handleFavoriteChange = async (gif) => {
      const shortGif = {
         id: gif.id,
         url: gif.images.fixed_height.url,
         title: gif.title,
         username: gif.username,
         slug: gif.slug,
      }
      try {
         const response = await axios.post(`/api/favorites`, {
            shortGif,
         })
         setFavorites(response.data)
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
         <SearchBar
            search={search}
            setSearch={setSearch}
         />
         {loading ? (
            <Loading />
         ) : !gifs.length == 0 ? (
            <div>
               <div className="lg:columns-4 md:columns-3 sm:columns-2 columns-1">
                  {gifs.map((gif) => {
                     return (
                        <GifCard
                           key={gif.id}
                           gif={gif}
                           favorites={favorites}
                           handleFavoriteChange={handleFavoriteChange}
                           like={false}
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

export default Feed
