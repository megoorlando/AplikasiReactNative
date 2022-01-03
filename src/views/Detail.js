import React,{useState,useEffect} from 'react'
import { StyleSheet, ScrollView, Text, View,TouchableOpacity,Image,Dimensions,Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ButtonCustome from '../component/ButtonCustome'
import Axios from '../Axios/Config'
import { AirbnbRating } from 'react-native-ratings';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Detail = ({route,navigation}) => {
    const {pk_item_id, pk_user_id} = route.params;
    const [imgActive, setImgActive] = useState(0)
    const [imageItem, setImageItem] = useState([])
    const [message, setMessage] = useState("")
    const [isRating, setIsRating] = useState({
        rating :''
    })
    const data ={
        pk_item_id:pk_item_id,
        pk_user_id:pk_user_id
    }
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        getDetail()
        getRating()
    });

        return unsubscribe;
      }, [navigation]);

    const [dataItem, setDataItem] = useState({
        user_name:'',   
        user_photoprofile:'',
        item_name: '',
        city_name: '',
        item_price: '',
        item_description:'',
        showVal : ''
    })

    const showAlert=()=> {  
        Alert.alert(  
            'Warning',  
            "The transaction process is beyond our responsibility. Do you still want to continue?", 
            [  
                {  
                    text: 'Cancel',  
                    onPress: () => console.log('Cancel Pressed'),  
                    style: 'cancel',  
                },  
                {text: 'OK', onPress: () => sendRequest()},  
            ]  
        );  
      }

    const onChange =(nativeEvent) =>{
        if(nativeEvent){
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
            if(slide !=imgActive) {
                setImgActive(slide)
            }
        }
    }

    const getRating = () => {
        Axios.get(`Rating/RatingBorrower/?id=${pk_user_id}`)
        .then((response)=> {
        // handle success
            setIsRating(response.data.data.DataRating)
        })
        .catch((error)=> {
            // handle error
            console.log(error);
    })
    }
    const getDetail =() =>{
        Axios.get(`HomeRoute/GetDetails/${JSON.stringify(pk_user_id)}/${JSON.stringify(pk_item_id)}`)
        .then((response)=> {
        // handle success
            console.log(response.data.data.DataItem)
            console.log(response.data.data.imageArray)
            setDataItem(response.data.data.DataItem)
            setImageItem(response.data.data.imageArray)
        })
        .catch((error)=> {
            // handle error
            console.log(error);
    })
    }

    const sendRequest = ()=>{
        const datapost ={
            fk_item_id : pk_item_id,
            request_renter: pk_user_id
        } 
        Axios.post(
            'Transaction/RequestItem',
            datapost
        )
            .then((res)=>{
                setMessage('Request Sent')
                console.log(res)
                back()
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const back = () => {
        navigation.navigate('Rumah')
    }

    return (
        <View style={{backgroundColor:'#fff',flex:1}}>
        <ScrollView style={{flex:1,margin:30,backgroundColor:'#fff'}} showsVerticalScrollIndicator={false}>
            <View style={{flexDirection:'row',marginBottom:40, alignItems:'center'}}>
                <View style={{flexDirection:'column'}}>

                    <View style={styles.profile}>
                        <View>
                        <TouchableOpacity  onPress={back}>
                            <Icon
                                name='arrow-back-ios'
                                size={30}
                            />
                        </TouchableOpacity>
                        </View>
                        <Image 
                            style={{
                                width:30,
                                height:30,
                                borderRadius:15,
                                marginRight:10
                            }} 
                            source={{
                                uri:Axios.defaults.baseURL+'static/profile/'+dataItem.user_photoprofile
                            }}/>
                        <Text style={styles.teks} >{dataItem.user_name}</Text>
                    </View>

                    <TouchableOpacity style={styles.rating} onPress={()=>{
                        navigation.navigate('RatingDetail', {
                            pk_item_id  :data.pk_item_id,
                            pk_user_id  :data.pk_user_id
                            })
                    }}>
                        <AirbnbRating
                            count={5}
                            size={10}
                            defaultRating={isRating.rating == null ? 0 :isRating.rating }
                            showRating={false}
                            isDisabled={true}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.wrap,{paddingLeft:8}]}>
                <ScrollView
                    onScroll={({nativeEvent}) => onChange(nativeEvent)}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    horizontal
                    style={styles.wrap}
                >
                {
                    imageItem.map((item,index) =>
                        <Image
                            key={item.pk_photo_item_id}
                            resizeMode='stretch'
                            style={styles.wrap}
                            source={{uri:Axios.defaults.baseURL+'static/image/'+item.photo_item_name}}
                        />)
                }
                </ScrollView>
                <View style ={styles.dot}>
                    {
                        imageItem.map((item,index)=>
                            <Text
                            key={item.pk_photo_item_id}
                            style={
                                imgActive == index ? styles.dotActive : styles.dotInActive
                            }
                            >
                            ●
                            </Text>
                        )
                    }
                </View>
            </View>
            {
                dataItem.showVal == 1 ?
                <View style={{marginVertical:15}}>
                <ButtonCustome color ='#DEB887' text='Send Request' textColor='#fff' press={()=>{alert(`Can't send your own items`)}}></ButtonCustome>
                </View>
                :
                <View style={{marginVertical:15}}>
                    <ButtonCustome color ='#DEB887' text='Send Request' textColor='#fff' press={showAlert}></ButtonCustome>
                </View>
            }


            <View>
                <Text style={{fontSize:25,fontWeight:'bold'}}>{dataItem.item_name}</Text>
            </View>

            <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
                <View style={{alignItems:'center'}}>
                    <Text>City</Text>
                    <Text style={styles.teks}>{dataItem.city_name}</Text>
                </View>

                <View style={{alignItems:'center'}}>
                    <Text>Price/Day</Text>
                    <Text style={styles.teks}>{dataItem.item_price}</Text>
                </View>
            </View>

            <View>
                <Text style={styles.description}>Description</Text>
            </View>
                <Text>
                {dataItem.item_description}
                </Text>  
        </ScrollView>
        </View>
    )}           

export default Detail;

const styles = StyleSheet.create({
    wrap:{
        width:WIDTH *0.8,
        height:HEIGHT *0.25,
        borderRadius:5
    },
    teks:{
        fontWeight:'bold'
    },
    profile:{flexDirection:'row',
        marginLeft:5,
        alignItems:'center' 
    },
    description:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:10
    },
    dot:{
        position:'absolute',
        bottom:0,
        flexDirection:'row',
        alignSelf:'center'
    },
    dotActive:{
        margin:3,
        color:'black',
        fontSize:30
    },
    dotInActive:{
        margin:3,
        color:'#fff',
        fontSize:30
    },
        rating:{
        alignSelf:'center',
        marginLeft:20,
        flexDirection:'row'
    }
})
