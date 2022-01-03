import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, ImageBackground, Dimensions} from 'react-native'
import {Picker} from '@react-native-picker/picker';
import ButtonCustome from '../component/ButtonCustome';
import InputCustome from '../component/InputCustome';
import Axios from '../Axios/Config'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CryptoJS from 'crypto-js'

const Register = ({navigation}) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [selectedValue, setSelectedValue] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [messageConfirm, setMessageConfirm] = useState("")
    const [city, setCity] = useState([])
  const valConfirmPass = () => {
    if (password != confirmPass) {
      setMessageConfirm('Password tidak sama');
      return false
    } else {
      setMessageConfirm('');
      return true
    }
  };

  const valEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log('valEmail')
      if (reg.test(email) === true) {
        setMessageConfirm('');
        return true
      } else {
        setMessageConfirm('Format Email Salah');
        return false
      }
  }


    const onChangeEmail =(text) =>{
        setEmail(text)
    }
    const onChangePassword =(text) =>{
        setPassword(text)
    }
    const onChangeConfirmPassword = (text) =>{
        setConfirmPass (text)
    }
    const onChangePhone = (text) =>{
        setPhone(text)
    }
    const onChangeName =(text)=>{
        setName(text)
    }


    useEffect(() => {
        getCity()
    }, [])

        const getCity=()=>{
            Axios.get('ChoiceRoute/GetCity')
                .then((response)=> {
                // handle success
                setCity(response.data.City);
                console.log(response.data.City)
                })
                .catch((error)=> {
                    // handle error
                    console.log(error);
            })
        }
    const Validate =() =>{
        console.log('email',email)
        console.log('password',password)
        if(!name || !email || !phone || !selectedValue|| !password ){
            setMessageConfirm("all fields must be filled")
        }
        else if ( valEmail() && valConfirmPass() == true ){
            let ciphertext = CryptoJS.AES.encrypt(password, 'PikedProject').toString();
            const data ={
                name : name,
                email : email,
                phone : phone,
                city :selectedValue,
                password : ciphertext
            } 
            Axios.post(
                '/userLoginP/Register',
                data
            )
                .then((res)=>{
                    navigation.navigate('Congratulation')
                })
                .catch((err)=>{
                    console.log(err)
                })
        }
      }

    const LoginButton =() =>{
        navigation.navigate('Login')
    }
    return (
        <ScrollView style={{flex:1,backgroundColor:'#fff'}} 
        showsVerticalScrollIndicator={false}>
            <ImageBackground
            style={{
                height:Dimensions.get('window').height/5,
                backgroundColor:'#deb887'
            }
            }>
            <View style={{flex:1,justifyContent:'flex-end',marginBottom:40}}>
            <Text style={{fontSize:40,color:'#fff',fontWeight:'bold',marginLeft:20}}>Register Now !</Text>
            </View>
            </ImageBackground>

            <View style={styles.mainview}>
                <Text style={{fontSize:15}}>Come on register and join us</Text>
            </View>
            <View style={{justifyContent:'center',alignItems:'center'}}>
                <InputCustome iconName='person'
                    nilai={name}
                    place='Enter Your name'
                    onChangeText={onChangeName}/>
                <InputCustome iconName='mail-outline'
                    nilai={email}
                    place='Enter Your E-mail'
                    onChangeText={onChangeEmail}/>
                <InputCustome iconName='logo-whatsapp'
                    nilai={phone}
                    place='Enter Phone Number'
                    keyboardType="numeric"
                    onChangeText={onChangePhone}/>
                    <View style={styles.wrapPicker}>
                    <Icon style ={styles.icon} name='place' size={20}/>
                    <Picker
                    selectedValue={selectedValue}
                    style={{height: 50, width:200,color:'#deb887'}}
                    mode="dropdown"
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                    {
                        city.map((item) => {
                          return(
                            <Picker.Item 
                              label={item.city_name}
                              value={item.pk_city_id}
                              key={item.pk_city_id} />
                          )
                        })
                      }
                    </Picker>
                    </View> 
                <InputCustome iconName='lock-open'
                    nilai={password}
                    place='Your Password' 
                    secureTextEntry={true}
                    onChangeText={onChangePassword}  />
                <InputCustome iconName='lock-open'
                    nilai={confirmPass}
                    place=' Confirm Your Password' 
                    secureTextEntry={true}
                    onChangeText={onChangeConfirmPassword} />
                <Text style={styles.message}>{messageConfirm}</Text>
                <ButtonCustome text='Sign Up' color ='#deb887' textColor='#fff' press={Validate}/>
                <ButtonCustome color ='#fff' 
                    text='Sign In'
                    textColor='#deb887'
                    brd={1} press={LoginButton}/>
            </View>
        </ScrollView>
    )
}

export default Register;

const styles = StyleSheet.create({
    header:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    mainview:{
        backgroundColor:'#fff',
        borderTopStartRadius:50,
        borderTopEndRadius:50,
        bottom:40,
        height:50,
        justifyContent:'center',
        alignItems:'center'
    },
    message:{
        color:'red',
        fontWeight:'bold'
    },
    wrapPicker:{
        flexDirection:'row',
        alignItems:'center',
        width:Dimensions.get('window').width/1.2,
    },
    icon:{
        paddingLeft:10
    }
  })
