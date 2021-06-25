import { User } from './User'

export type AuthContextType = {
    user: User | undefined
    signInWithGoogle: () => Promise<void>
    signOut: () => Promise<void>
}
