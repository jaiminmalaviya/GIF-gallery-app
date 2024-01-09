import { auth } from '@Firebase'
import { signOut } from 'firebase/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
   await signOut(auth)
   cookies().delete('user')
   return NextResponse.json({ status: 200 })
}
