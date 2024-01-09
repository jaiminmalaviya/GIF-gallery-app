'use server'

import { cookies } from 'next/headers'

export async function setUserCookie(user) {
   try {
      cookies().set('user', JSON.stringify(user))
   } catch (error) {
      console.error('Error setting user cookie:', error)
   }
}

export async function getUserCookie() {
   const userCookie = cookies().get('user')?.value
   try {
      if (userCookie) {
         return JSON.parse(userCookie)
      } else {
         return null
      }
   } catch (error) {
      console.error('Error parsing user cookie:', error)
      return null
   }
}

export async function clearUserCookie() {
   try {
      cookies().remove('user')
   } catch (error) {
      console.error('Error clearing user cookie:', error)
   }
}
