'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import Link from 'next/link'
import { auth } from '@Firebase'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '@components/Loading'

const Login = () => {
    const [userData, setUserData] = useState({ email: '', password: '' })
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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                userData.email,
                userData.password
            )
            await updateProfile(auth.currentUser, {
                displayName: userCredential.user.displayName,
            })
            toast.success('Successfully Login!')
            router.push('/')
        } catch (error) {
            toast.error(error.message)
        }

        setUserData({ email: '', password: '' })
    }

    return (
        !user && (
            <div className="w-full m-auto bg-white rounded-2xl shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl ">
                        Login
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                            Log in
                        </button>
                        <p className="text-sm font-light text-gray-500 ">
                            Don’t have an account yet?
                            <Link
                                href="/registration/register"
                                className="font-medium text-blue-600 ps-0.5 hover:underline "
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        )
    )
}

export default Login
