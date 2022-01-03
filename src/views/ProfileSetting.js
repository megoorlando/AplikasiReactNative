import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Image, ScrollView,Modal} from 'react-native'
import HeaderCustome from '../component/HeaderCustome'
import Input from '../component/InputProductC'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Axios from '../Axios/Config'
import {launchImageLibrary,launchCamera} from 'react-native-image-picker'
import ButtonCustome from '../component/ButtonCustome'

const ProfileSetting = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [oneImage, setOneImage] = useState(null)
    const [data, setData] = useState({
        fk_city_id: '',
        user_about: '',
        user_name: '',
        user_photoprofile: '',
        user_telp: ''
    })
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState("")

    useEffect(() => {
        getProfile()
    }, [])
    const getProfile=()=>{
        Axios.get('MyAccount/Profile')
        .then((response)=> {
        // handle success
        setData(response.data.data[0]);
        console.log(response.data.data[0])
    })
    .catch((error)=> {
        // handle error
        console.log(error);
    })
    }

    const backButton = () =>{
        navigation.navigate('Akun')
    }
    const changeName = (text) =>{
        setData((prev) =>{
            return{...prev,user_name : text}
        })
    }
    const changeAbout = (text) =>{
        setData((prev) =>{
            return{...prev,user_about : text}
        })
    }
    const changePhone = (text) =>{
        setData((prev) =>{
            return{...prev,user_telp : text}
        })
    }

    const back = () =>{
        navigation.navigate('Akun')
    }
    const Update =() =>{
            const datapost ={
                name : data.user_name,
                about_me : data.user_about,
                phone : data.user_telp,
            } 
            Axios.post(
                'MyAccount/EditProfile',
                datapost
            )
                .then((res)=>{
                    setMessage('Edit Success')
                    back()
                    console.log(res)
                })
                .catch((err)=>{
                    console.log(err)
                })
        }

    const SendImage = () => {
        if(oneImage == null){
            setIsError('Select image before update')
        }
        else{
            const data = new FormData();
            data.append('photo', {
                name: oneImage.fileName,
                type: oneImage.type,
                uri:oneImage.uri,
              });
    
            Axios.post(
            'MyAccount/EditPhoto',
            data,{
              headers:{"Content-Type": "multipart/form-data"}
            })
            .then((res)=>{
                console.log(res)
                console.log('berhasil')
            })
            .catch((err)=>{
                console.log(err)
            })
        }
   
      }

    const takePicGalery = ()=>{
        const options = {
            mediaType:'photo',
            includeBase64:false
        }
        launchImageLibrary(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                const source = response.assets[0]
                console.log(response.assets[0])
                setOneImage(response.assets[0])
                setIsError('')
            }
        })
    }

    const takePhoto = ()=>{
        const options = {
            mediaType:'photo',
            includeBase64:false
        }

        launchCamera(options,(response)=>{
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              const source = response.assets[0]
              console.log(response.assets[0])
              setOneImage(response.assets[0])
              setIsError('')
            }
        })
    }


    return (
        <View style={{backgroundColor:'#fff',height:'100%'}}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <TouchableOpacity
                        style={{position:'absolute',
                                right:0,
                                top:0
                        }}
                        onPress={()=>setModalVisible(!modalVisible)}>
                        <View>
                        <Icon
                        name='cancel'
                        size={20}
                        />
                        </View>
                        </TouchableOpacity>
                        <View style={styles.icon}>
                            <TouchableOpacity onPress={takePhoto}>
                                <Icon
                                name='camera-alt'
                                size={40}
                                style={{paddingHorizontal:15}} 
                                />   
                            </TouchableOpacity>
                            <TouchableOpacity onPress={takePicGalery}>
                                <Icon
                                    name='add-photo-alternate'
                                    size={40}
                                    style={{paddingHorizontal:15}} 
                                />     
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.upload} onPress={SendImage}>
                            <Text style={{color:'black',fontWeight:'bold'}}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            <View>
                <HeaderCustome header='Profile Setting' pressback={backButton}/>
            </View>
            <View style={styles.edit}>
                {
                    isEdit == false ?
                    <TouchableOpacity onPress={()=>{
                        setIsEdit(true)
                    }}>
                    <Icon
                    name='edit'
                    size={30}
                    style={{paddingRight:20,alignSelf:'flex-end'}}
                    />
                    </TouchableOpacity>
                    :
                    <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{
                        setIsEdit(false)
                    }}>
                    <Icon
                    name='cancel'
                    size={30}
                    style={{paddingLeft:20}}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={Update}>
                    <Icon
                    name='check'
                    size={30}
                    style={{paddingRight:20}}
                    />
                    </TouchableOpacity>
                    </View>
                }

            </View>
            <View style={styles.imgprofile}>
                { oneImage == null?
                        <Image 
                            style={styles.profile} 
                            source={{uri:Axios.defaults.baseURL+'static/profile/'+data.user_photoprofile}}
                        />
                        :
                        <Image 
                            style={styles.profile} 
                            source={{uri:oneImage.uri}}
                        />
                }
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style={{textDecorationLine:'underline'}}>Edit Photo</Text>
                </TouchableOpacity>
                <Text style={{fontSize:10,color:'red'}}>{isError}</Text>
            </View>
            <View>
                <ScrollView style={{height:300}}>
                    <Input iconName='person'
                        editable ={isEdit}
                        onChangeText = {changeName}
                        name ='Name' 
                        nilai={data.user_name} />
                    <Input iconName='info'
                        editable ={isEdit}
                        onChangeText={changeAbout}
                        name ='About me'
                        nilai={data.user_about}/>
                    <Input iconName='logo-whatsapp'
                        editable ={isEdit} 
                        onChangeText={changePhone}
                        name ='Phone'
                        nilai={data.user_telp}/>
                </ScrollView>
            </View>
            <View >
            {
                isEdit == true ?
                <Text style={{textAlign:'center',color:'red'}}>{message}</Text>
                :
                <Text></Text>
            }
            </View>
        </View>
        
    )
}

export default ProfileSetting;

const styles = StyleSheet.create({
    profile:{
        width:100,
        height:100,
        borderRadius:100,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
    imgprofile:{
        alignItems:'center',
        margin:15
    },
    edit:{
        height:50,
        width:'100%',
        justifyContent:'center'
    },
    centeredView: {
        height:100,
        width:160,
        backgroundColor: '#fff',
        position:'absolute',
        top:'30%',
        left:'30%',
        borderRadius:5,
        borderWidth:1,
        justifyContent:'center'
    },
    icon:{
        flexDirection:'row',
        alignSelf:'center',
        padding:5
    },
    upload:{
        alignSelf:'center',
    }
})
