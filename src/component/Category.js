import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Category = (props) => {
    const{nama,gambar,press,containerStyle}=props
    return (
        <TouchableOpacity onPress={press}>
        <View style={styles.container}>
            <View style={[styles.box,{backgroundColor:containerStyle}]}>
            <Image
                style={styles.icon} 
                source={{uri:gambar}}/>
            <Text style={styles.Teks}>{nama}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

export default Category;

const styles = StyleSheet.create({
    container:{
        margin:5
    },
    box:{
        backgroundColor:'#FDF3F3',
        width:80,
        height:80,
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25
    },
    icon:{
        borderColor:'#fff',
        borderWidth:1,
        width:40,
        height:40,
        borderRadius:20,
    },
    Teks:{
        margin:5,
        fontWeight:'bold',
        color:'black'
    }
})
