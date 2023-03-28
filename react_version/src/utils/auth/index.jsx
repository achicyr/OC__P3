import React, {useState, useEffect, createContext} from 'react'
import data from "./Data.js"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(false)
    , [user, setUser] = useState({})
    , [datas, setDatas] = useState(false) 
    , [onHome, setOnHome] = useState(document.location.pathname === "/") 
    , userActivated = false
    useEffect(() => {fetch('http://localhost:3000/api/data')
        .then((res) => {
            return res.json()
        })
        .then(contents => {
            console.log(contents)
            setDatas(contents)
        }).catch((first) => { setDatas(data) })
	}, [])

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, datas, setDatas, userActivated, onHome, setOnHome }}>
            {children}
        </AuthContext.Provider>
    )
}
