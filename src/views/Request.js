import React, {useState,useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import HeaderCustome from '../component/HeaderCustome';
import RequestProduct from '../component/RequestProduct.js';
import Axios from '../Axios/Config'

const WIDTH = Dimensions.get('window').width;
const Request = ({navigation}) => {
  const [reqData, setReqData] = useState([])

  useEffect(() => {
      getRequest()
  }, [])

  const openLink =(item)=>{
    Linking.openURL(`whatsapp://send?text=Hello, ${item.user_name}.Thank you for being interested in my item,Let's talk further &phone=+6285748886448'`)
  }
  const getRequest = () =>{
        Axios.get('Transaction/Infromation')
        .then((response)=> {
        // handle success
        console.log(response.data.data);
        setReqData(response.data.data);
        })
        .catch((error)=> {
            // handle error
            console.log(error);
    })
  }

  const sendAnswer = (item,value) =>{

    const datapost = {
      fk_request_status_id: value,
      pk_request_item_id : item.pk_request_item_id,
      pk_item_id : item.pk_item_id
    }
    Axios.post(
        'Transaction/Response',
        datapost
    )
        .then((res)=>{  
            console.log(res)
            getRequest()
        })
        .catch((err)=>{
            console.log(err)
        })
}

  const _renderItem = ({item}) => (
    <RequestProduct item={item}>
      {item.fk_request_status_id == 1 ? 
        (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.buttonkiri, {backgroundColor: '#F8DE8B'}]}
            onPress={()=>sendAnswer(item,2)}
            >
            <Text
              style={{
                fontFamily: 'Poly-Regular',
                color: 'white',
                textAlign: 'center',
                marginTop: 3,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonkanan, {backgroundColor: '#fff'}]}
            onPress={()=>sendAnswer(item,3)}
            >
            <Text
              style={{
                fontFamily: 'Poly-Regular',
                textAlign: 'center',
                marginTop: 3,
              }}>
              Decline
            </Text>
          </TouchableOpacity>
        </View>
      )
      : item.fk_request_status_id == 2 ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>{openLink(item)}}>
            <Image
              source={{
                uri: 'https://bralink.id/wp-content/uploads/2021/08/icon-wa.png',
              }}
              style={{height: 35, width: 35}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonkiri, {backgroundColor: '#F8DE8B'}]}
            onPress={()=>sendAnswer(item,4)}>
            <Text
              style={{
                fontFamily: 'Poly-Regular',
                color: 'white',
                textAlign: 'center',
                marginTop: 3,
              }}>
              Submitted
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonkiri, {backgroundColor: '#F8DE8B'}]}
            onPress={()=>sendAnswer(item,7)}
            >
            <Text
              style={{
                fontFamily: 'Poly-Regular',
                color: 'white',
                textAlign: 'center',
                marginTop: 3,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      ) 
      : item.fk_request_status_id == 4 ? (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=>{openLink(item)}}>
            <Image
              source={{
                uri: 'https://bralink.id/wp-content/uploads/2021/08/icon-wa.png',
              }}
              style={{height: 35, width: 35}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonkiri, {backgroundColor: '#F8DE8B'}]}
            onPress={()=>sendAnswer(item,5)}
            >
            <Text
              style={{
                fontFamily: 'Poly-Regular',
                color: 'white',
                textAlign: 'center',
                marginTop: 3,
              }}>
              Return
            </Text>
          </TouchableOpacity>
        </View>
      ) :(
        <View></View>
      )}
    </RequestProduct>
  );
  return (
    <View>
      <HeaderCustome
        header="Request"
        pressback={() => {
          navigation.navigate('Akun');
        }}></HeaderCustome>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{height:'90%'}}
        data={reqData}
        renderItem={_renderItem}
        keyExtractor={(item, index) => item.pk_request_item_id}
      />
    </View>
  );
};

export default Request;

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 35,
    borderWidth: 1,
    borderRadius: WIDTH * 0.025,
    borderColor: 'white',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    elevation: 5,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  buttonkiri: {
    borderColor: '#F8DE8B',
    borderWidth: 0.7,
    marginHorizontal: 20,
    borderRadius: 5,
    height: 30,
    width: 55,
  },
  buttonkanan: {
    borderColor: '#F8DE8B',
    borderWidth: 0.7,
    marginHorizontal: 10,
    borderRadius: 5,
    height: 30,
    width: 55,
  },
});
