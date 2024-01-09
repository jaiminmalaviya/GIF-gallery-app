import { auth } from '@Firebase'
import prisma from '@/app/libs/prismadb'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
   try {
      const { name = '', email = '', password = '' } = await request.json()

      if (!name || !email || !password) {
         return new NextResponse('Missing Info', { status: 400 })
      }

      await createUserWithEmailAndPassword(auth, email, password)

      const user = await prisma.user.create({
         data: {
            name,
            email,
            // loginTimes: [new Date()],
         },
      })

      await prisma.loginTime.create({
         data: {
            userId: user.id,
         },
      })

      const localUser = {
         id: user.id,
         name: user.name,
         email: user.email,
         favorites: [],
      }

      cookies().set('user', JSON.stringify(localUser))
   } catch (error) {
      return NextResponse.json(error.message, { status: 400 })
   }
   return NextResponse.json('Successfully account created!', { status: 200 })
}
