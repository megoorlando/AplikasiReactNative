import React from 'react'
import { View, Text } from 'react-native'
import Axios from '../Axios/Config'

export const LoginContext = React.createContext()
const LoginContextProvider = (props) => {

    const [isLogin, setIsLogin] = React.useState(false)
    const [token ,setToken] = React.useState('')


    const addToken = (tokenValue) =>{
        setToken(tokenValue)
        Axios.defaults.headers.common['Authorization'] =`Bearer ${tokenValue}` ;
    }

    return (
        <LoginContext.Provider value ={{isLogin, setIsLogin, token, setToken ,addToken}}>
            {props.children}
        </LoginContext.Provider>
    )
}

export default LoginContextProvider
