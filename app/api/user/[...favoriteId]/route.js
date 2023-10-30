import {
    doc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    query,
    where,
    getDoc,
    collection,
    getDocs,
} from 'firebase/firestore'
import { db } from '@Firebase'

export const GET = async (request, { params }) => {
    const url = new URL(request.url)
    const gifId = url.searchParams.get('gifId')
    const userRef = doc(db, 'users', ...params.favoriteId)
    const usersRef = collection(db, 'users')

    const querySnapshot = await getDocs(
        query(
            usersRef,
            where('favoriteGif', 'array-contains', gifId),
            where('userId', '==', ...params.favoriteId)
        )
    )

    const userFavoriteGif = await getDoc(userRef)
    const isGifInFavorites = !querySnapshot.empty

    const updateObject = isGifInFavorites
        ? { favoriteGif: arrayRemove(gifId) }
        : { favoriteGif: arrayUnion(gifId) }

    await updateDoc(userRef, updateObject)

    return new Response(JSON.stringify(userFavoriteGif.data()?.favoriteGif), { status: 200 })
}
