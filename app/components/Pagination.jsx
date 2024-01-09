const Pagination = ({ currentPage, setCurrentPage, maxPages, getPageNumbers }) => {
   return (
      <div className="mt-8 mb-5 flex justify-center gap-5">
         <button
            className="text-sm font-semibold"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
         >
            Previous
         </button>
         {getPageNumbers().map((pageNumber) => (
            <button
               key={pageNumber}
               className={`text-sm p-2.5 px-3 ${
                  currentPage === pageNumber ? 'border-b-4 bg-pink-100 border-b-pink-600' : ''
               }`}
               onClick={() => setCurrentPage(pageNumber)}
            >
               {pageNumber}
            </button>
         ))}
         <button
            className="text-sm font-semibold"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === maxPages}
         >
            Next
         </button>
      </div>
   )
}

export default Pagination
