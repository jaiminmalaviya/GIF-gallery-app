const GifCard = ({ gif, favorites, handleFavoriteChange, like }) => {
   const isFavorite = favorites?.some((favGif) => favGif.giphyId === gif.id) || like

   return (
      <div
         key={gif.id}
         className="relative"
      >
         <img
            className="rounded-md mb-4 w-full"
            src={like ? gif?.url : gif?.images.fixed_height.url}
            alt={gif.title}
         />

         {!isFavorite ? (
            <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-opacity-50 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100">
               <button
                  className="absolute top-4 right-4"
                  onClick={() => handleFavoriteChange(gif)}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="white"
                     viewBox="0 0 24 24"
                     strokeWidth="1.5"
                     stroke="white"
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
         ) : (
            <>
               <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-opacity-50 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
               <button
                  className="absolute top-4 right-4"
                  onClick={() => handleFavoriteChange(gif)}
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
            </>
         )}
      </div>
   )
}

export default GifCard
