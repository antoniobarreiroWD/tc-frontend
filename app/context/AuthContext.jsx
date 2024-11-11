'use client'
import { createContext, useCallback, useContext, useMemo, useState, useEffect } from "react"
import Cookies from 'js-cookie'
import { navigate } from '../utils/Index'
import authService from '../services/auth.service';

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const setToken = useCallback(function (token) {
        return Cookies.set("token", token)
    }, [])

    const getToken = useCallback(function () {
        return Cookies.get("token")
    }, [])

    const getProfile = useCallback(async function () {
        try {
            const token = getToken()
            if (token) {
                const {user} = await authService.fetchProfile(token)
                setUser(user)
            }
        } catch (error) {
            console.log("Error =>", error)
        } finally {
            setIsLoading(false)
        }
    }, [])
    
    const login = useCallback(async function (data) {
        const { token } = await authService.fetchLogin(data)
        setToken(token)
        await getProfile()
        navigate('/restaurants/list')
    }, [])

    const logout = useCallback(function () {
        navigate('/')
        Cookies.remove("token")
        setUser(null)
    }, [])

    const removeUser = async () => {
        try {
            const token = getToken()
            logout()
            if (token) {
                await authService.deleteRestaurant(token)
            }
            navigate("/login")
            setUser(null)
        } catch (error) {
            console.log("Error => ", error)
        }
    }

    const value = useMemo(() => ({
            login, 
            logout,
            getProfile,
            getToken,
            user,
            isLoading,
            removeUser
        }),
        [login, logout, getProfile, getToken, user, isLoading, removeUser]
    )

    useEffect(() => {
        getProfile()
    }, [])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext)
}