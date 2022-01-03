import React,{useState,useContext} from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions, TouchableOpacity} from 'react-native'
import ButtonCustome from '../component/ButtonCustome';
import InputCustome from '../component/InputCustome';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from '../Axios/Config'
import CryptoJS from 'crypto-js'
import {LoginContext} from '../Contex/LoginContextProvider'
import Async from '@react-native-async-storage/async-storage'


const Login = ({navigation}) => {

    const {setIsLogin,addToken} = useContext(LoginContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [SecurePass, setSecurePass] = useState(true)
    const [ErrorMessage, setErrorMessage] = useState('')
    const LoginButton = ()=>{
         console.log("Email:", email)
         console.log("Password:", password)
        if(!email || !password){
            setErrorMessage('Lengkapi')
        }
        else{
            let newPass = CryptoJS.AES.encrypt(password, 'PikedProject').toString();
            const dataSend = {
                email:email,
                password:newPass
            }
            Axios.post('userLoginP/Login',dataSend)
            .then((response)=>{
                if(response.status == 200){
                    saveToken(response.data.data)
                    setErrorMessage(response.data.message)
                }
            })
            .catch((err)=>{
               if(err.response && err.response.status == 401){
                   setErrorMessage(err.response.data.message)
                }else{
                    console.log(err)
                }
            })
        } 
    }

    
    const saveToken = async (token) => {
        try {
          await Async.setItem('@token', token)
          console.log(token)
          addToken(token)
          setIsLogin(true)

        } catch (e) {
          // saving error
        }
      }
    
    const RegisterButton = ()=>{
        navigation.navigate('Register')
    }

    const changeEmail =(text)=>{
        setEmail(text)
    }
    const changePass =(text)=>{
        setPassword(text)
    }
    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff'}} 
        showsVerticalScrollIndicator={false}>
            <ImageBackground
            style={{
                height:Dimensions.get('window').height/3,
                backgroundColor:'#deb887'
            }
            }>
            <View style={{flex:1,justifyContent:'flex-end',marginBottom:50}}>
            <Text style={{fontSize:40,color:'#fff',fontWeight:'bold',marginLeft:20}}>Welcome !</Text>
            </View>
            </ImageBackground>
            <View style={styles.mainview}>
                <View style={{padding:30}}>
                <Text style={{fontSize:15}}>Use your credential below and login to</Text>
                <Text style={{fontSize:15}}>your account</Text>
                </View>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <InputCustome nilai={email} 
                iconName='mail-outline'
                place='Your Email'
                onChangeText={changeEmail}/>
                <InputCustome nilai={password} 
                iconName='lock-open' iconName2={SecurePass?'visibility-off':'visibility'}
                place='Your Password' 
                secureTextEntry={SecurePass}
                change={()=>setSecurePass((prevState)=>{return !prevState})}
                onChangeText={changePass}/>
            </View>
            <Text style={{color:'red',textAlign:'center',fontWeight:'bold'}}>{ErrorMessage}</Text>
            <View>
                <ButtonCustome text='Sign In'  textColor='#fff'
                    press ={LoginButton} color ='#deb887'>
                </ButtonCustome>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                    <Text>Don't have an account ? </Text>
                    <TouchableOpacity onPress={RegisterButton}><Text style={{textDecorationLine:'underline',color:'#deb887'}}>Sign Up</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default Login;

const styles = StyleSheet.create({
    header:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    mainview:{
        flex:1,
        backgroundColor:'#fff',
        bottom:40,
        borderTopStartRadius:50,
        borderTopEndRadius:50
    }
})
