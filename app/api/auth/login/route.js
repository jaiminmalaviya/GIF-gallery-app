import { auth } from '@Firebase'
import prisma from '@/app/libs/prismadb'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
   try {
      const { email, password } = await request.json()

      if (!email || !password) {
         return new NextResponse('Missing Info', { status: 400 })
      }

      await signInWithEmailAndPassword(auth, email, password)

      const user = await prisma.user.findFirst({
         where: {
            email: email,
         },
         include: {
            favorites: {
               include: {
                  gif: true,
               },
            },
         },
      })

      if (!user) {
         return NextResponse.json('User not found', { status: 400 })
      }

      await prisma.loginTime.create({
         data: {
            userId: user.id,
         },
      })

      const localUser = {
         id: user.id,
         name: user.name,
         email: email,
         favorites: user.favorites.map((fav) => fav.gif),
      }

      cookies().set('user', JSON.stringify(localUser))
   } catch (e) {
      return NextResponse.json(e.message, { status: 400 })
   }
   return NextResponse.json('Successfully Login!', { status: 200 })
}
