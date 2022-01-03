import React,{useState,useEffect} from 'react'
import { StyleSheet,
        Text, 
        View,
        FlatList,
        Image,
        TouchableOpacity,
        Modal,
        TextInput,
        Pressable,
        Linking
       } from 'react-native'
import Axios from '../Axios/Config'
import Wa from 'react-native-vector-icons/Ionicons'
import { AirbnbRating } from 'react-native-ratings';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Notif = ({navigation}) => {
  const [isNotification, setIsNotification] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [data, setData] = useState({})
  const [isStar, setIsStar] = useState(3)
  const [isComment, setIsComment] = useState('')
  useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
      getNotification()
      });
      return unsubscribe;
  }, [navigation]);

  console.log(data)

  const openLink =(item)=>{
    let number = item.user_telp
    Linking.openURL(`whatsapp://send?text=
    Hello, ${item.user_name},
    Thank you for accepting my request,Let's talk further &phone=${number.replace("0", "+62")}'`)
  }
  
  const goModal = (item) =>{
    setModalVisible(true)
    setData ({
      id :item.pk_user_id,
      photo : item.user_photoprofile,
      name : item.user_name
    })
  }

  const changeOnComment = (text)=>{
      setIsComment(text)
  }
  const _renderItem = ({item})=>(
      <View style={styles.container}>
        {
          item.fk_request_status_id == 3 ?
          (
          <View style={styles.wrap}>
          <View>
              <Image
                style={styles.img}
                source={{uri:Axios.defaults.baseURL+'static/profile/'+item.user_photoprofile}}
              />
              </View>
              <View style={styles.text}>
                <Text>{item.user_name},</Text>
                <Text>{item.notif_borrower} </Text>
                <Text>{item.item_name}</Text>
              </View>
          </View>
          ):
          item.fk_request_status_id == 2?
          (
            <View style={styles.wrap}>
                <View>
                  <Image
                    style={styles.img}
                    source={{uri:Axios.defaults.baseURL+'static/profile/'+item.user_photoprofile}}
                  />
                </View>
                <View style={styles.text}>
                        <Text>{item.user_name},</Text>
                        <Text>{item.notif_borrower}</Text>
                        <Text>{item.item_name}</Text>
                    <TouchableOpacity onPress={()=>{openLink(item)}}>
                        <Wa
                          name='logo-whatsapp'
                          size={40}
                          style={{alignSelf:'flex-end',paddingRight:20}}
                          color={"#25d366"}
                        />
                    </TouchableOpacity>
                </View>
            </View>
          ):
          item.fk_request_status_id == 5 ?
          (
          <TouchableOpacity style={styles.wrap}
            onPress={() => goModal(item)}
            >
                  <View>
                      <Image
                        style={styles.img}
                        source={{uri:Axios.defaults.baseURL+'static/profile/'+item.user_photoprofile}}
                      />
                  </View>
                  <View style={styles.text}>
                      <Text>{item.notif_borrower} </Text>
                      <Text>{item.item_name} for</Text>
                      <Text>{item.user_name}</Text>
                  </View>
          </TouchableOpacity>
          ):
            null
        }
      </View>
  )
  const getNotification = () =>{
    Axios.get('Transaction/Notification')
        .then((response)=> {
        // handle success
        console.log(response.data.data);
        setIsNotification(response.data.data)
      })
      .catch((error)=> {
          // handle error
          console.log(error);
      })
  }

  const review =() =>{
      const datapost ={
          user : data.id,
          star : isStar,
          comment: isComment
        } 
        Axios.post(
              'Rating/Review',
              datapost
        )
          .then((res)=>{
              setModalVisible(!modalVisible)
              console.log(res)
        })
          .catch((err)=>{
              console.log(err)
        })
  }
  
  return (
    <View>
    <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(!modalVisible);
    }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
          <TouchableOpacity
          style={{position:'absolute',
                  right:0,
                  top:0
          }}
          onPress={()=>setModalVisible(!modalVisible)}>
          <View>
          <Icon
          name='cancel'
          size={30}
          />
          </View>
          </TouchableOpacity>
        <Image
          source={{uri:Axios.defaults.baseURL+'static/profile/'+data.photo}}
          style={{height: 50, width: 50, borderRadius: 25}}
        />
        <Text
          style={{
            fontFamily: 'Poly-Regular',
            fontSize: 18,
            color: 'black',
            paddingTop:5
          }}>
          {data.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center'}}>
          <AirbnbRating
              count={5}
              size={20}
              defaultRating={0}
          />
          </View>
        </View>
        <View style={{borderColor: 'black'}}>
          <TextInput
            value={isComment}
            onChangeText={changeOnComment}
            placeholder="Comment Here"
            multiline={true}
            numberOfLines={5}
            style={{
              textAlignVertical: 'top',
              backgroundColor: 'white',
              width: 200,
              borderColor: 'black',
            }}></TextInput>
        </View>
        <Pressable
          style={{width: 200, height: 50, alignItems: 'center'}}
          onPress={review}>
          <View
            style={{
              width: 200,
              height: 40,
              backgroundColor: '#DEB887',
              borderRadius: 25,
            }}>
            <Text
              style={{
                alignItems: 'center',
                alignContent: 'center',
                alignSelf: 'center',
                fontSize: 24,
                margin: 2,
                color: 'white',
              }}>
              Review
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  </Modal>
      <View style={styles.header}>
        <Text style={styles.text}>
          Notification
        </Text>
      </View>
      <View>
      <FlatList
        data ={isNotification}
        renderItem ={_renderItem}
        keyExtractor ={(item) => item.pk_notification_id}
      />
      </View>
    </View>
  )
}

export default Notif

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  wrap:{
    flexDirection:'row',
    backgroundColor:'#F8DE8B',
    height:100,
    width:'80%',
    margin:10,
    alignItems:'center',
    padding:10,
    justifyContent:'space-between',
    borderRadius:10
  },
  img:{
    width:50,
    height:50,
    borderRadius:25
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
    height:80,
    backgroundColor:'#DEB887',
    marginBottom:30
  },
  text:{
    fontWeight:'bold',
    color:'#fff',
    fontSize:20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#fff',
    elevation: 10,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
})
