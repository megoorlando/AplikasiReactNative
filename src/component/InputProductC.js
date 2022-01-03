import React from 'react';
import {StyleSheet, Text, View, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Whatsapp from 'react-native-vector-icons/Ionicons';

const InputProductC = (props) => {
    const {nilai,place,iconName,name} = props
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                {
                    iconName =='logo-whatsapp'?
                    <Whatsapp
                        name={iconName}
                        size={20}
                        style={{paddingRight:5}}
                    />
                    :
                    <Icon
                        name={iconName}
                        size={20}
                        style={{paddingRight:5}}
                    />
                }
                
                <Text>{name}</Text>
            </View>
            <View>
            <TextInput
                {...props}
                style={styles.textInput}
                placeholder={place}
                value={nilai}
                />
            </View>
        </View>
    )
}

export default InputProductC;

const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        backgroundColor:'#fff',
        marginHorizontal:40,
        width:Dimensions.get('window').width/1.3,
        marginVertical:5,
    },
    title:{
        flexDirection:'row',
        paddingVertical:5,
        paddingLeft:10
    },
    textInput:{
        borderRadius:25,
        borderWidth:1,
        paddingLeft:25
    }
})
