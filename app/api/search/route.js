import { LIMIT } from '@app/libs/constants'
import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb'
import axios from 'axios'

export async function POST(request) {
   const { currentPage, search } = await request.json()

   try {
      const response = await axios.get(
         `https://api.giphy.com/v1/gifs/search?api_key=${
            process.env.GIPHY_API_KEY
         }&q=${search}&limit=${LIMIT}&offset=${LIMIT * (currentPage - 1)}`
      )

      const data = response.data

      if (currentPage === 1) {
         await prisma.searchKeyword.upsert({
            where: { keyword: search },
            create: {
               keyword: search,
               timestamps: [new Date()],
            },
            update: {
               timestamps: { push: new Date() },
               latestSearch: new Date(),
            },
         })
      }

      return NextResponse.json(data, { status: 200 })
   } catch (error) {
      console.error('Error fetching data from Giphy API:', error)
      return NextResponse.json('Failed to fetch data', { status: 500 })
   }
}
