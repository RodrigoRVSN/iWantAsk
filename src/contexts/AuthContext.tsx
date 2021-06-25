/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { AuthContextType } from '../@types/AuthContextType'
import { User } from '../@types/User'
import { auth, firebase } from '../services/firebase'

type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(
    props: AuthContextProviderProps
): JSX.Element {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user
                if (!displayName || !photoURL) {
                    throw new Error('Missing user information')
                }
                setuser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })
        return (): void => {
            unsubscribe()
        }
    }, [])

    const [user, setuser] = useState<User>()

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user
            if (!displayName || !photoURL) {
                throw new Error('Missing user information')
            }
            setuser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    )
}
