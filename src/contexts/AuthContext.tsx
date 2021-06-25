/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
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
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user
                if (!displayName || !photoURL) {
                    throw new Error('Missing user information')
                }
                setUser({
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

    const [user, setUser] = useState<User>()

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, uid } = result.user
            if (!displayName || !photoURL) {
                throw new Error('Missing user information')
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    async function signOut() {
        await auth.signOut()
        setUser(undefined)
        history.push('/')
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}
