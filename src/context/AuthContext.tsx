import React, { createContext, useContext, useState, useEffect } from "react"
import {SignUpData, UserData, UserRole } from 'models/auth'
import { AuthApi } from 'services/api'

/**
 * Пропсы контекста авторизации
 */
interface AuthContextProps {
    user: UserData | null
    /**
     * Метод входа в систему
     * @param username Имя пользователя
     * @param password Пароль
     */
    signIn: (userName: string, password: string) => Promise<void>
    /**
     * Метод регистрации в система
     * @param data Регистрационные данные
     */
    signUp: (data: SignUpData) => Promise<void>
    /**
     * Метод выхода из системы
     */
    signOut: () => void

    /**
     * Текущая роль пользователя
     */
    role: UserRole | null
    /**
     * Токен пользователя
     */
    token: string | null
}

const AuthContext = createContext<AuthContextProps | null>(null)

/**
 * Провайдер авторизационных методов
 * @param children дети
 * @constructor стандартный конструктор
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserData | null>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")!) : null)

    useEffect(() => {
        const token = AuthApi.getToken()
        if (token) {
            const storedUser = localStorage.getItem("user")
            if (storedUser) setUser(JSON.parse(storedUser))
        }
    }, [])

    /**
     * Метод входа в систему
     * @param username Имя пользователя
     * @param password Пароль
     */
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

    /**
     * Метод регистрации в система
     * @param data Регистрационные данные
     */
    const signUp = async (data: SignUpData): Promise<any> => {
        try {
            return await AuthApi.signUp(data)
        } catch (error) {
            console.error("Ошибка регистрации:", error)
            throw error
        }
    }

    /**
     * Метод выхода из системы
     */
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

/**
 * Хук для получения авторизационных данных. Нужен в том месте, где доступ имеют только авторизованные пользователи
 */
export const useAuth = () => {

    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
