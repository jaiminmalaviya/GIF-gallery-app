'use client'

import toast from 'react-hot-toast'

const LogoutButton = () => {
   async function handleSignOut() {
      await fetch('/api/auth/logout')
      toast.success('Logged out successfully!')
      location.reload()
   }

   return (
      <button
         className="bg-black sm:px-7 sm:py-4 px-4 py-3 text-white rounded-xl"
         onClick={handleSignOut}
      >
         Log Out
      </button>
   )
}

export default LogoutButton
