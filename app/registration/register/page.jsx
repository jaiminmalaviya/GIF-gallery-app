'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { auth, db } from '@Firebase'
import { setDoc, doc } from 'firebase/firestore'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '@components/Loading'

const Register = () => {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' })
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(authUser)
                router.push('/')
            } else {
                setUser(null)
            }
            setIsLoading(false)
        })
        return () => unsubscribe()
    }, [router])

    if (isLoading) {
        return <Loading />
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            )
            await updateProfile(auth.currentUser, {
                displayName: userData.name,
            })

            toast.success('Successfully account created!')
            const userId = userCredential.user.uid
            await setDoc(doc(db, 'users', userId), {
                userId,
                name: userData.name,
                email: userData.email,
                favoriteGif: [],
            })
            router.push('/')
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        setUserData({ name: '', email: '', password: '' })
    }

    return (
        !user && (
            <div className="w-full m-auto bg-white rounded-2xl shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl ">
                        Create Account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Your name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={userData.name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                placeholder="John Doe"
                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={userData.email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                placeholder="name@company.com"
                                onChange={(e) =>
                                    setUserData({ ...userData, email: e.target.value })
                                }
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={userData.password}
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                                onChange={(e) =>
                                    setUserData({ ...userData, password: e.target.value })
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >
                            Sign up
                        </button>
                        <p className="text-sm font-light text-gray-500 ">
                            Already have an account?
                            <Link
                                href="/registration/login"
                                className="font-medium text-blue-600 ps-0.5 hover:underline "
                            >
                                Login here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    )
}

export default Register
