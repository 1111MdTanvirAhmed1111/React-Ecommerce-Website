import {createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext()

const url = `${import.meta.env.VITE_bApi}/User/`
import  axios  from 'axios';



export const UserProvider = ({children})=>{
    const [User, setUser] = useState({})

    const sUser = async ()=>{

        const  res = await axios.get(url, {
            headers: {
              Authorization: localStorage.getItem('jwt')
            }
           })
        setUser(res.data.userData)
    }

       useEffect(()=>{
        if(localStorage.getItem('jwt')){
            
        sUser()
        }
    
    },[])

    return <UserContext.Provider value={{User,setUser}}>
                    {children}
    </UserContext.Provider>
}



export const useUser = ()=>{
    return useContext(UserContext)
}