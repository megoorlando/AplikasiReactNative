import React,{useState,useEffect} from 'react'
import { FlatList, StyleSheet, Text, View} from 'react-native'
import HeaderCustome from '../component/HeaderCustome'
import Rating from '../component/Rating'
import Axios from '../Axios/Config'
const RatingRenter= ({navigation}) => {
    const [dataRating, setDataRating] = useState([])

    useEffect(() => {
        getRating()
    }, [])
    

    const _renderItem =({item})=>(
        <Rating item={item}
        />    
    )
    const back = () =>{
        navigation.navigate('Akun')
    }

    const getRating =()=>{
        Axios.get('Rating/RatingRenter')
        .then((response)=> {
        // handle success
            console.log(response.data.data);
            setDataRating(response.data.data)
            })
        .catch((error)=> {
                // handle error
                console.log(error);
            })
        }
    return (
        <View style={{backgroundColor:'#fff',height:'100%'}}>
            <HeaderCustome header='Rating' pressback={back}/>
            <View style={styles.warning}>
                <Text style={styles.text}>
                    Customer Feedback and Ratings
                </Text>
            </View>      
                <FlatList
                data={dataRating}
                keyExtractor={(item,index) => item.pk_rating_user_id}
                renderItem={_renderItem}
                />
        </View>
    )
}

export default RatingRenter

const styles = StyleSheet.create({
    container:{
        height:80,
        width:'100%',
    },
    warning:{
        justifyContent:'center',
        alignItems:'center',
        height:75,
    },
    text:{
        fontWeight:'bold',
        color:'#DEB887'
    }
})
