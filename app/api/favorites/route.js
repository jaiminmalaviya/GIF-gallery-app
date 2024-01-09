import prisma from '@/app/libs/prismadb'
import { cookies } from 'next/headers'
import { getUserCookie } from '@app/helpers/action'
import { NextResponse } from 'next/server'

export async function POST(request) {
   try {
      const { shortGif: gif } = await request.json()
      const user = await getUserCookie()

      if (!user) {
         return NextResponse.json({
            type: 'error',
            message: 'User not found',
            status: 400,
         })
      }

      const gifData = await prisma.gif.upsert({
         where: {
            giphyId: gif.id,
         },
         create: {
            giphyId: gif.id,
            slug: gif.slug,
            title: gif.title,
            url: gif.url,
            username: gif.username,
         },
         update: {},
      })

      const favoriteRecord = await prisma.favorite.findUnique({
         where: {
            FavoriteUniqueId: {
               gifId: gifData.id,
               userId: user.id,
            },
         },
      })

      if (!favoriteRecord) {
         await prisma.favorite.create({
            data: {
               gifId: gifData.id,
               userId: user.id,
            },
         })
      } else {
         await prisma.favorite.delete({
            where: {
               FavoriteUniqueId: {
                  gifId: gifData.id,
                  userId: user.id,
               },
            },
         })
      }

      const userData = await prisma.user.findFirst({
         where: {
            id: user.id,
         },
         include: {
            favorites: {
               include: {
                  gif: true,
               },
            },
         },
      })

      if (!userData) {
         return NextResponse.json('User not found', { status: 404 })
      }

      const localUser = {
         id: user.id,
         name: user.name,
         email: user.email,
         favorites: userData.favorites.map((fav) => fav.gif),
      }

      cookies().set('user', JSON.stringify(localUser))

      return NextResponse.json(localUser.favorites, { status: 200 })
   } catch (error) {
      console.error('Error:', error)
      return NextResponse.json('Internal Server Error', { status: 500 })
   }
}
