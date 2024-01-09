'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Input from '@app/components/Input'
import Button from '@app/components/Button'
import axios from 'axios'

const Login = () => {
   const [userData, setUserData] = useState({ email: '', password: '' })
   const [pending, setPending] = useState(false)
   const router = useRouter()

   const handleSubmit = async (e) => {
      e.preventDefault()
      setPending(true)

      try {
         const response = await axios.post('/api/auth/login', {
            email: userData.email,
            password: userData.password,
         })
         toast.success(response?.data)
         router.refresh()
         router.push('/')
         setUserData({ email: '', password: '' })
      } catch (error) {
         toast.error(error.response.data)
      } finally {
         setPending(false)
      }
   }

   return (
      <div className="w-full m-auto bg-white rounded-2xl shadow  md:mt-0 sm:max-w-md xl:p-0 ">
         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl ">
               Login
            </h1>
            <form
               className="space-y-4 md:space-y-6"
               onSubmit={handleSubmit}
            >
               <Input
                  type="email"
                  label="Your email"
                  name="email"
                  id="email"
                  value={userData.email}
                  placeholder="name@company.com"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
               />
               <Input
                  type="password"
                  label="Password"
                  name="password"
                  id="password"
                  value={userData.password}
                  placeholder="••••••••"
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  required
               />
               <Button
                  type="submit"
                  disabled={pending}
               >
                  {pending ? 'Logging in...' : 'Log in'}
               </Button>
               <p className="text-sm font-light text-gray-500 ">
                  Don’t have an account yet?
                  <Link
                     href="/auth/register"
                     className="font-medium text-blue-600 ps-1 hover:underline "
                  >
                     Sign up
                  </Link>
               </p>
            </form>
         </div>
      </div>
   )
}

export default Login
