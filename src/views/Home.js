import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Category from '../component/Category';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker'
import Axios from '../Axios/Config'
const numColumns = 2
const WIDTH =Dimensions.get('window').width
const Home = ({navigation}) => {
    const [searchItem, setSearchItem] = useState('')
    const [selectedValueCity, setSelectedValueCity] = useState(1);
    const [city, setCity] = useState([])
    const [picture, setPicture] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(1)


    useEffect(() => {
        DualChoice()
    }, [])


    useEffect(() => {
        if(city.length !=0 && categoryData.length !=0){
            getExplore()
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getExplore()
     });

        return unsubscribe;
      }, [navigation,selectedValueCity,selectedCategory,searchItem]);

      
    const DualChoice=()=>{
        Axios.get('ChoiceRoute/DualChoice')
            .then((response)=> {
            // handle success
            setCity(response.data.data.city);
            setCategoryData(response.data.data.category)
            setSelectedValueCity(16)
            })
            .catch((error)=> {
                // handle error
                console.log(error);
        })
    }

    const getExplore=()=>{
            let querySearch = `&item=${searchItem}`
            Axios.get(`HomeRoute/Explore?category=${selectedCategory}&city=${selectedValueCity}${searchItem? querySearch : ''}`)
            .then((response)=> {
            // handle success
            console.log(response.data.data);
            setPicture(response.data.data);
            })
            .catch((error)=> {
                // handle error
                console.log(error);
        })
    }
    const onChangeCategory = (item)=>{
      setSelectedCategory(item.pk_category_id)
     }

    const onChangeSearch = (text) =>{
        setSearchItem(text)
    }

  const _renderItem =({item})=>(
          <TouchableOpacity style={styles.ItemStyle} onPress={()=>{
              navigation.navigate('Detail', {
                  pk_item_id  : item.pk_item_id,
                  pk_user_id  : item.pk_user_id
                })
          }}>
                  <Image style={styles.photo} resizeMode='stretch' source={{uri:Axios.defaults.baseURL+'static/image/'+item.photo_item_name}}/>
              <View style={styles.text}>
                  <Text style={styles.fontCategory}>{item.item_name}</Text>
              </View>
          </TouchableOpacity>
    )

    return (
        <View style={{flex:1}}>
           <View>
                <View style={styles.container}>
                        <View style={{flexDirection:'row',alignItems:'center',marginLeft:10}}>
                            <Icon
                                name='place'
                                size={20}
                                style={styles.icon}
                            />
                            <View>
                            <Picker
                                selectedValue={selectedValueCity}
                                style={{height:50,width:150,color:'black'}}
                                mode="dropdown"
                                onValueChange={(itemValue, itemIndex) => setSelectedValueCity(itemValue)}>
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
                        </View>

                        <View style={styles.input}>
                            <Icon
                                name='search'
                                size={20}
                                style={styles.icon}
                            />
                            <TextInput
                                value={searchItem}
                                onChangeText={onChangeSearch}
                                placeholder='Search here'
                                style={styles.textInput}
                                placeholderTextColor='#deb887'
                            />
                        </View>
                </View>

                <View style={styles.category}>
                        <Text style={styles.fontCategory}>Category</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {categoryData.map((item)=>
                                <Category 
                                    key={item.pk_category_id}
                                    nama={item.category_name} 
                                    gambar={item.category_img}
                                    press={()=>onChangeCategory(item)}
                                    containerStyle={
                                        selectedCategory == item.pk_category_id ?
                                        containerStyle='#FFC0CB'
                                        :
                                        containerStyle='#FDF3F3'
                                    }
                                    >
                                </Category>
                            )}
                        </ScrollView>
                </View>
           </View>

           <View style={{flex:1}}>
                <View style ={styles.container1}>
                {picture.length != 0 ?
                        <FlatList
                            data ={picture}
                            renderItem ={_renderItem}
                            keyExtractor ={(item) => item.pk_item_id}
                            numColumns={numColumns}
                        />
                        :
                        <View style={styles.warning}>
                            <Text style={{fontWeight:'bold',fontSize:20}}>Data Not Found</Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#deb887',
        justifyContent:'center',
        height:150
    },
    icon:{
        paddingLeft:10,
        paddingRight:10
    },
    textInput:{
        paddingRight:Dimensions.get('window').width/2.8,
        backgroundColor:'#fff'
    },
    input:{
        backgroundColor:'#fff',
        borderRadius:50,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
        width:Dimensions.get('window').width/1.4,
        margin:10
    },
    container1:{
        flex:1,
        borderTopWidth:1,
        padding:5,
        backgroundColor:'#fff'
    },
      ItemStyle:{
        padding:2,
        flex:1/2,
        margin:2,
        borderColor:'#6B6B6B',
        borderWidth:1,
        borderRadius:10
      },
      photo:{
        height:WIDTH/numColumns * 0.7,
        overflow:'hidden',
        borderRadius:5,
      },
      text:{
        backgroundColor:'#fff',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        height:40
      },
      underlineCategory:{
        borderBottomWidth: 3,
        borderColor: 'orange',
      },
      category:{
        backgroundColor:'#fff',
        borderTopWidth:1,
        borderColor:'#994C00'
      },
      fontCategory:{
        fontWeight:'bold',
        margin:10,
        color:'#deb887'
      },
      warning:{
          alignItems:'center',
          justifyContent:'center',
          flex:1
      }
})
