'use client'

import Feed from '@components/Feed'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { auth } from '@Firebase'
import Loading from '@components/Loading'

export default function Home() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
                router.push('/registration/login')
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [router])

    if (isLoading) {
        return <Loading />
    }

    return (
        user && (
            <section>
                <Feed authUser={user} />
            </section>
        )
    )
}
