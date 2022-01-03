import React,{useState,useEffect}  from 'react'
import { StyleSheet, Text, ScrollView, 
        View, Button, Image, TextInput,
        TouchableOpacity,SafeAreaView } from 'react-native'
import HeaderCustome from '../component/HeaderCustome'
import Axios from '../Axios/Config'
import {launchImageLibrary} from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import ButtonCustome from '../component/ButtonCustome'
const Input = ({navigation}) => {

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [selectedValue, setSelectedValue] = useState("");
  const [description, setDescription] = useState("")
  const [listImage, setListImage] = useState([])
  const [category, setCategory] = useState([])

  const changeName = (text) =>{
      setName(text)
  }
  const changePrice = (text) =>{
      setPrice(text)
  }
  const changeDescription = (text) =>{
      setDescription(text)
  }

  useEffect(() => {
    getCategory()
  }, [])

  
  const getCategory=()=>{
    Axios.get('ChoiceRoute/GetCategory')
    .then((response)=> {
    // handle success
    console.log(response.data.Category);
    setCategory(response.data.Category);
  })
  .catch((error)=> {
      // handle error
      console.log(error);
  })
  }

const update = () => {

  const data = new FormData();
  data.append('item_name', name)
  data.append('item_price', price)
  data.append('fk_category_id', selectedValue)
  data.append('item_description', description)
  listImage.forEach(item => {
      data.append('photo',item)
  });
  Axios.post(
  'MainRoute/PostItem',
  data,{
    headers:{"Content-Type": "multipart/form-data"}
  })
  .then((res)=>{
      console.log(res)
      console.log('berhasil')
      navigation.navigate('Akun')
  })
  .catch((err)=>{
      console.log(err)
  })
}

const takePhoto = ()=>{
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
        // console.log(response.assets[0])
        
        setListImage((prevstate)=>{
          let newData = [...prevstate]
          newData.push({
              name: source.fileName,
              type: source.type,
              uri: source.uri
          })  
          console.log(newData)  
          return newData
        })
      }
  })
}

  const deleteImage= (index)=> {
    setListImage(prev =>{
        let newInput = [...prev]
        newInput.splice(index,1)

        return newInput
    })
  }

  const back = () =>{
    navigation.navigate ('Akun')
  }

  return (
    <View style={{flex: 1}}>
    <ScrollView>
      <HeaderCustome header="Input Product" pressback={back}></HeaderCustome>
      <View style={{paddingVertical: 50, paddingHorizontal: 40}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.labelInputContainer}>
            <Text style={styles.kastem}>Name</Text>
            <Text style={styles.kastem}>:</Text>
          </View>

          <TextInput
              placeholder="Your item"
              value={name}
              onChangeText={changeName}
              style={{
              fontSize: 15,
              alignSelf: 'center',
              marginLeft: 10,
            }}></TextInput>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={[styles.labelInputContainer,{width:320}]}>
            <Text style={styles.kastem}>Category</Text>
            <Text style={styles.kastem}>:</Text>
            <View>
            <Picker
            selectedValue={selectedValue}
            style={{height: 50, width:150}}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            {
                category.map((item) => {
                  return(
                    <Picker.Item 
                      label={item.category_name}
                      value={item.pk_category_id}
                      key={item.pk_category_id} />
                  )
                })
              }
            </Picker>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={styles.labelInputContainer}>
            <Text style={styles.kastem}>Price</Text>
            <Text style={styles.kastem}>:</Text>
          </View>
          <TextInput
            placeholder="Your Price"
            value={price}
            onChangeText={changePrice}
            style={{
              alignContent: 'center',
              marginTop: 0,
              marginLeft: 10,
              fontSize: 15,
            }}></TextInput>
          <Text
            style={{
              fontSize: 15,
              alignContent: 'center',
              color: 'black',
              marginTop: 12,
              marginLeft: 10,
            }}>
            / Day
          </Text>
        </View>

        <View style={{flexDirection: 'row', width: 200}}>
          <View style={styles.labelInputContainer}>
            <Text
              style={{
                marginTop: 8,
                alignSelf: 'auto',
                color: 'black',
                fontSize: 18,
              }}>
              Description
            </Text>
            <Text
              style={{
                textAlignVertical: 'top',
                color: 'black',
                fontSize: 18,
                marginTop: 8,
              }}>
              :
            </Text>
          </View>

          <TextInput
            value={description}
            onChangeText={changeDescription}
            placeholder="Your Description"
            multiline={true}
            numberOfLines={4}
            style={{
              backgroundColor: 'white',
              alignContent: 'center',
              marginTop: 0,
              marginLeft: 10,
              fontSize: 15,
              width: 150,
              textAlignVertical: 'top',
            }}></TextInput>
        </View>
        <Text>Image</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{borderWidth:1}}>
        {listImage.map((item,index)=>
          <View key={index}>
          <Image style={styles.listimage} 
            source={{uri:item.uri}}/>
          <TouchableOpacity 
            onPress={()=> deleteImage()} style={{position:'absolute', right:0, top:0}}>
              <Icon size={30} name='cancel' color={'#fff'}/>
          </TouchableOpacity>
          </View>
          )}
          <TouchableOpacity onPress={takePhoto}>
          <View style={styles.plus}>
          <Icon
            name='add-photo-alternate'
            size={70}
          />
          </View>
          </TouchableOpacity>
        </ScrollView>
        <View>
          <ButtonCustome color ='#deb887' 
          text='Submit'
          textColor='#fff'
          press={update}
          />
        </View>
      </View>
    </ScrollView>
  </View>
);
};


export default Input;

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    fontSize: 18,
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: '#DEB887',
    height: 25,
    width: 250,
    borderRadius: 12.5,
    alignContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  labelInputContainer: {
    flexDirection: 'row',
    width: 125,
    justifyContent: 'space-between',
  },
  kastem: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 18,
  },
  touchableOpacity: {
    margin: 1,
  },
  listimage:{
    width:100,
    height:100,
    margin:5
  },
  plus:{
    width:100,
    height:100,
    margin:5,
    borderWidth:1,
    justifyContent:'center',
    alignItems:'center'
  }
});