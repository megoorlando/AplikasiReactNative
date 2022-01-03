import React,{useState,useEffect,useContext}from 'react'
import { TouchableOpacity, Modal,  StyleSheet, Text, View, Image,Dimensions,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { AirbnbRating } from 'react-native-ratings';
import Axios from '../Axios/Config'
import {LoginContext} from '../Contex/LoginContextProvider'
const numColumns = 2
const WIDTH =Dimensions.get('window').width
const Akun = ({navigation}) => {
    
    // const {token} = useContext(LoginContext)

    const [personal, setPersonal] = useState({
            user_name: '',
            user_photoprofile:'',
            user_about: '',
            rating :'',
            rating_count:''
    })
    const [image, setImage] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        getAccount()
    });

        return unsubscribe;
      }, [navigation]);
    
    const EditItem = () =>{
        navigation.navigate('EditItem')
    }
    const _renderItem =({item})=>(
        <TouchableOpacity style={{flex:1/2}} onPress={()=>{
            navigation.navigate('EditItem', {
                pk_item_id  : item.fk_item_id
              })
        }}>
            <Image style={styles.ItemStyle} resizeMode='stretch' source={{uri:Axios.defaults.baseURL+'static/image/'+item.photo_item_name}}/>
        </TouchableOpacity>
      )

    const RequestButton =() =>{
        navigation.navigate('Request')
        setModalVisible(!modalVisible)
    }
    const ProfileButton =() =>{
        setModalVisible(!modalVisible)
        navigation.navigate('ProfileSetting')
    }
    const InputButton =() =>{
        navigation.navigate('Input')
    }
    const CancelButton =()=>{
        setModalVisible(!modalVisible)
    }
    const MyStar = ()=>{
        navigation.navigate('RatingRenter')
    }
    
      const getAccount=()=>{
        Axios.get('MyAccount/Dashboard')
        .then((response)=> {
        // handle success
        console.log(response.data.data);
        setImage(response.data.data.imageArray);
        setPersonal(response.data.data.personalData)
      })
      .catch((error)=> {
          // handle error
          console.log(error);
      })
      }
      
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={styles.header}>
                <TouchableOpacity  onPress={() => setModalVisible(true)}>
                    <Text>●●●</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.information}>
                <Image style={styles.profile} source={{uri:Axios.defaults.baseURL+'static/profile/'+personal.user_photoprofile}}/>
                <View>
                    <Text style={{margin:5,fontFamily:'Entypo'}}>{personal.user_name}</Text>
                </View>
                    <TouchableOpacity onPress={MyStar} style={{flexDirection:'row'}}>
                        <AirbnbRating
                            count={5}
                            size={12}
                            defaultRating={personal.rating == null? 0 : personal.rating}
                            showRating={false}
                            isDisabled={true}
                        />
                        <Text style={{marginLeft:5}}>({personal.rating_count == null? 0 : personal.rating_count})</Text>
                    </TouchableOpacity>
                <View>
                    <Text style={{fontWeight:'bold',margin:5}}>{personal.user_about}</Text>
                </View>
            </View>

            <View style={styles.block}>
                <Text style={styles.textstyle}>My Product</Text>
                <TouchableOpacity  onPress={InputButton}>
                    <Icon
                    name='add'
                    size={25}
                    color={'#fff'}
                    />
                </TouchableOpacity>
            </View>

            <View style ={styles.container1}>
            {
                image.length != 0 ?
                <FlatList
                data ={image}
                renderItem ={_renderItem}
                keyExtractor ={item => item.fk_item_id}
                numColumns={numColumns}
                />
                :
                <View style={styles.warning}>
                    <Icon
                        name ='search-off'
                        size={60}
                        color={"brown"}
                    />
                    <Text style={{fontWeight:'bold'}}>You don't have item yet</Text>
                </View>   
            }

                </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                  }}
                >

            <View style= {styles.modal}>
                <TouchableOpacity onPress={RequestButton} >
                    <Text style={{fontWeight:'bold'}}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ProfileButton} >
                    <Text style={{fontWeight:'bold'}}>Profile Setting </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={CancelButton}>
                    <Text style={{fontWeight:'bold'}}>Cancel</Text>
                </TouchableOpacity>
            </View>

            </Modal>   
        </View>
    )
}

export default Akun

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'flex-end',
        margin:30,
    },
    information:{
        justifyContent:'center',
        alignItems:'center',
        margin:5,
    },
    profile:{
        width:100,
        height:100,
        borderRadius:50,
        borderWidth:1
    },
    block:{
        width:'100%',
        height:40,
        backgroundColor:'#DEB887',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding:10
    },
    textstyle:{
        color:'#fff',
        fontWeight:'bold'
    },
    container1:{
        flex:1,
        backgroundColor:'#fff'
    },
    ItemStyle:{
        alignItems:'center',
        justifyContent:'center',
        flex:1/2,
        margin:1,
        height:WIDTH/numColumns,
        borderColor:'#deb887',
        borderWidth:1
    },
    modal:{
        backgroundColor:'#fff',
        height:150,
        width:120,
        position:'absolute',
        top:20,
        left:250,
        justifyContent:'space-around'
    },
    warning:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
})
