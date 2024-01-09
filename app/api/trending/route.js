import { LIMIT } from '@app/libs/constants'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(request) {
   const { currentPage } = await request.json()

   try {
      const response = await axios.get(
         `https://api.giphy.com/v1/gifs/trending?api_key=${
            process.env.GIPHY_API_KEY
         }&limit=${LIMIT}&offset=${LIMIT * (currentPage - 1)}`
      )

      return NextResponse.json(response.data, { status: 200 })
   } catch (error) {
      console.error('Error fetching data from Giphy API:', error)
      return NextResponse.json('Failed to fetch data', { status: 500 })
   }
}
