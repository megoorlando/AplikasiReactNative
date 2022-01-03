import React,{useState,useEffect}  from 'react'
import { StyleSheet, Text, ScrollView, 
        View, Alert, Image, TextInput,
        TouchableOpacity,SafeAreaView } from 'react-native'
import HeaderCustome from '../component/HeaderCustome'
import Axios from '../Axios/Config'
import {launchCamera} from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-picker/picker';
import ButtonCustome from '../component/ButtonCustome'

const EditInput = ({route,navigation}) => {
  const {pk_item_id} = route.params; 
  const [selectedValue, setSelectedValue] = useState("");
  const [listImage, setListImage] = useState([])
  const [category, setCategory] = useState([])
  const [imageItem, setImageItem] = useState([])

  const [dataItem, setDataItem] = useState({
    pk_item_id: '',
    item_name: '',
    item_price: '',
    fk_category_id: '',
    item_description: ''
  })

  const showAlert=()=> {  
    Alert.alert(  
        'Warning',  
        'Are you sure delete this item?',  
        [  
            {  
                text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  
            },  
            {text: 'Delete', onPress: () => deleteItem()},  
        ]  
    );  
  }
  const changeName = (text) =>{
    setDataItem((prev) =>{
        return{...prev,item_name : text}
    })
  }
  const changePrice = (text) =>{
    setDataItem((prev) =>{
        return{...prev,item_price : text}
    })
  }
  const changeDescription = (text) =>{
    setDataItem((prev) =>{
        return{...prev,item_description : text}
    })
  }
  
  const deleteItem = () =>{
    const datapost ={
      pk_item_id : pk_item_id,
      fk_item_id : pk_item_id
  } 
  Axios.post(
      'Item/DeleteItem',
      datapost
  )
      .then((res)=>{
          setMessage('Delete Success')
          navigation.navigate('Akun')
          console.log(res)
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  useEffect(() => {
    getItem()
    getCategory()
  }, [])

  
  const getItem=()=>{
        Axios.get(`Item/GetItem/${pk_item_id}`)
        .then((response)=> {
        // handle success
        console.log(response.data.data);
        setDataItem(response.data.data.DataItem)
        setImageItem(response.data.data.imageArray)
    
        })
        .catch((error)=> {
            // handle error
            console.log(error);
        })
  }




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
    data.append('pk_item_id', dataItem.pk_item_id)
    data.append('item_name', dataItem.item_name)
    data.append('item_price', dataItem.item_price)
    data.append('fk_category_id', selectedValue)
    data.append('item_description', dataItem.item_description)
    data.append ('PhotoOld',JSON.stringify(imageItem))
    listImage.forEach(item => {
        data.append('photo',item)
    });
    Axios.post(
    'Item/EditItem',
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

  launchCamera(options,(response)=>{
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
    <HeaderCustome header="Edit Item" pressback={back}></HeaderCustome>
    <View style={styles.delete}>
      <TouchableOpacity onPress={showAlert}>
        <View style={styles.icon}>
          <Icon
          name='delete'
          size={30}
          color={'#ba1919'}/>
        </View>  
      </TouchableOpacity>    
    </View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{paddingHorizontal: 40}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.labelInputContainer}>
            <Text style={styles.kastem}>Name</Text>
            <Text style={styles.kastem}>:</Text>
          </View>
          <TextInput
              placeholder="Your item"
              value={dataItem.item_name}
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
              selectedValue={dataItem.fk_category_id}
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
            value={dataItem.item_price.toString()}
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
            value={dataItem.item_description}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{borderWidth:1,marginBottom:20}}>
          {imageItem.map((item,index)=>
          <View key={item.pk_photo_item_id}>
          <Image style={styles.listimage} 
            source={{uri:Axios.defaults.baseURL+'static/image/'+item.photo_item_name}}/>
          <TouchableOpacity 
            onPress={()=> deleteImage()} style={{position:'absolute', right:0, top:0}}>
              <Icon size={30} name='cancel' color={'#fff'}/>
          </TouchableOpacity>
          </View>
          )}

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


export default EditInput;

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
  },
  delete:{
    flexDirection:'row',
    justifyContent:"flex-end",
    marginHorizontal:40,
    marginVertical:20
  },
  icon:{
    width:50,
    height:50,
    borderWidth:1,
    borderRadius:25,
    justifyContent:'center',
    alignItems:'center',
    borderColor:'#ba1919'
  }
});