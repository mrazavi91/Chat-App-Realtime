import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, signupUser, userLogout } from "../helpers/api-communicator";

type User = {
    name: string
    email: string
}
type UserAuth = {
    isLoggedIn: boolean
    user: User | null
    login: (email: string, password: string) => Promise<void>
    signup: (name: string, email: string, password: string) => Promise<void>
    logout: ()=> Promise<void>
}

const AuthContext = createContext<UserAuth | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [user, setUser] = useState<User | null>(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => { 
        const checkStatus = async () => {
            try {
                const data = await checkAuthStatus()
                console.log(data, 'data')
                if (data !== undefined) {
                    setUser({ name: data.name, email: data.email })
                    setIsLoggedIn(true)
                } else {
                    setUser(null)
                    setIsLoggedIn(false)
                }     
                
            } catch (error) {
                throw new Error("Sorry you are not Authorized")
                
            }
            
        }
            checkStatus()
        
        
    }, [])
    
    const login = async (email: string, password: string) => { 
        const data = await loginUser(email, password)
        if (data) {
            setUser({ name: data.name, email: data.email })
            setIsLoggedIn(true)
        }
    }
    const signup = async (name: string, email: string, password: string) => {
        const data = await signupUser(name, email, password)
        if (data) {
            setUser({ name: data.name, email: data.email })
            setIsLoggedIn(true)
        }
     }
    const logout = async () => {
        await userLogout()
        setIsLoggedIn(false)
        setUser(null)
        window.location.reload()
     }
    
    const value = {
        user, isLoggedIn, login, signup, logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>useContext(AuthContext)