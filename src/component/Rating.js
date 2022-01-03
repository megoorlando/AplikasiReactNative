import React from 'react'
import { StyleSheet, Text, View,Dimensions, TextInput,Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings';
import Axios from '../Axios/Config'
const Rating = (props) => {
    const {item} = props;
    return (
        <View style={styles.container}>
            <View style={styles.information}>
            
                <View style={styles.user}>
                    <View style={styles.personal}>
                        <Image source={{uri:Axios.defaults.baseURL+'static/profile/'+item.user_photoprofile}}
                        style={styles.img}/>
                        <Text style={styles.textStyle}>{item.user_name}</Text>
                    </View>    
                    <View style={{padding:5}}>
                        <AirbnbRating
                            count={5}
                            size={15}
                            defaultRating={item.rating_user_value}
                            showRating={false}
                            isDisabled={true}
                        />
                    </View>
                </View>
                <View style={styles.input}>
                    <TextInput 
                    value={item.rating_user_comment}
                    style={styles.testi}>
                    </TextInput>
                </View>

            </View>
        </View>
    )
}

export default Rating

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    information:{
        height:Dimensions.get('window').height * 0.3,
        width:Dimensions.get('window').width * 0.7,
        backgroundColor:'#fff',
        borderRadius:10,
        borderWidth:1,
        justifyContent:'center'
    },
    user:{
        flexDirection:'column',
        alignItems:'flex-start',
        padding:10,
        alignSelf:'flex-start'
    },
    personal:{
        flexDirection:'row',
        alignItems:'center',
    },
    img:{
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'green',
    },
    textStyle:{
        fontWeight:'bold',
        color:'#DEB887',
        textAlign:'center',
        paddingLeft:15
    },
    testi:{
        height:100,
        backgroundColor:'#e5e5e5',
        width:Dimensions.get('window').width * 0.6,
        borderRadius:10,
        padding:10,
        textAlignVertical: 'top'
    },
    input:{
        alignItems:'center',
    },
})
