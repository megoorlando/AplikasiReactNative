import React,{useState,useEffect} from 'react'
import { FlatList, StyleSheet, Text, View} from 'react-native'
import HeaderCustome from '../component/HeaderCustome'
import Rating from '../component/Rating'
import Axios from '../Axios/Config'
const RatingDetail= ({route,navigation}) => {
    const {pk_item_id, pk_user_id} = route.params;
    const [dataRating, setDataRating] = useState([])

    const data ={
        pk_item_id : pk_item_id,
        pk_user_id :pk_user_id
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
        getRating()
    });

        return unsubscribe;
      }, [navigation]);


    const _renderItem =({item})=>(
        <Rating item={item}
        />    
    )

    const getRating =()=>{
        Axios.get(`Rating/RatingBorrower/?id=${pk_user_id}`)
        .then((response)=> {
        // handle success
            console.log(response.data.data.results);
            setDataRating(response.data.data.results)
            })
        .catch((error)=> {
                // handle error
                console.log(error);
            })
    }

    return (
        <View style={{backgroundColor:'#fff',height:'100%'}}>
            <HeaderCustome header='Rating' pressback={()=>{
                        navigation.navigate('Detail', {
                            pk_item_id  :data.pk_item_id,
                            pk_user_id  :data.pk_user_id
                            })
                    }}/>

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

export default RatingDetail

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
