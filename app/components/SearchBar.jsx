import Image from 'next/image'
import searchIcon from '@public/assets/icons/Search icon.svg'

const SearchBar = ({ search, setSearch }) => {
   return (
      <div className="flex mb-6 relative">
         <Image
            className="absolute top-[50%] left-4 translate-y-[-50%]"
            src={searchIcon.src}
            width={20}
            height={20}
            alt="search icon"
         />
         <input
            type="text"
            className="w-full bg-slate-100 px-7 py-4 ps-12 mr-4 rounded-xl"
            placeholder="Article name or keywords..."
            value={search}
            onChange={(e) => {
               setSearch(e.target.value)
            }}
         />
         <button
            className="bg-black px-7 py-4 text-white rounded-xl"
            value="Search"
         >
            Search
         </button>
      </div>
   )
}

export default SearchBar
