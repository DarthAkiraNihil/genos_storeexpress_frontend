import React, { createContext, useContext, useState, useEffect } from "react"
import {SignUpData, UserData, UserRole } from 'models/auth'
import { AuthApi } from 'services/api'

interface AuthContextProps {
    user: UserData | null
    signIn: (userName: string, password: string) => Promise<void>
    signUp: (data: SignUpData) => Promise<void>
    signOut: () => void

    role: UserRole | null
    token: string | null
}

const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserData | null>(null)

    useEffect(() => {
        console.log("Mounting AuthProvider")
        const token = AuthApi.getToken()
        if (token) {
            const storedUser = localStorage.getItem("user")
            if (storedUser) setUser(JSON.parse(storedUser))
        }
    }, [])

    const signIn = async (username: string, password: string) => {
        try {
            const response = await AuthApi.signIn({ username, password })
            AuthApi.storeToken(response.token)
            localStorage.setItem("user", JSON.stringify(response))
            setUser(response)
        } catch (error) {
            console.error("Ошибка входа:", error)
            throw error
        }
    }

    const signUp = async (data: SignUpData): Promise<any> => {
        try {
            return await AuthApi.signUp(data)
        } catch (error) {
            console.error("Ошибка регистрации:", error)
            throw error
        }
    }

    const signOut = () => {

        AuthApi.signOut().then(() => {
            AuthApi.removeToken()
            localStorage.removeItem("user")
            setUser(null)
        });

    }

    const role = UserRole[user?.role as keyof typeof UserRole];

    const token = AuthApi.getToken()

    return (
        <AuthContext.Provider value={{ user, signIn, signUp, signOut, role, token }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {

    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
