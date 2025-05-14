'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({ user: null, loading: true })

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + '/auth/me', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
