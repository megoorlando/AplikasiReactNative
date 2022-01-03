import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ModalPicker from '../component/ModalPicker';
import {launchCamera} from 'react-native-image-picker';

const ProductInput = ({navigation}) => {
  const [chooseData, setchooseData] = useState('Select Item...');
  const [isModalVisible, setisModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [Descryption, setDescryption] = useState('');
  const [photo, setPhoto] = useState([]);
  const [listImage, setListImage] = useState([]);
  const [errorMessage, setErrMessage] = useState('');

  const ProductInput = () => {
    console.log('name', name);
    console.log('category', category);
    console.log('price', price);
    console.log('Descryption', Descryption);
    console.log('photo', listImage);

    if (!name || !category || !price) {
      setErrMessage(' data tidak lengkap');
    } else {
      const data = new FormData();
      data.append('name', name);
      data.append('category', category);
      data.append('price', price);
      data.append('Descryption', Descryption);
      listImage.forEach(item => {
        data.append('photo', item);
      });

      Axios.post('ProductInput/product', data)
        .then(res => {
          navigation.navigate('home');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const changeModalVisibility = bool => {
    setisModalVisible(bool);
  };
  const setData = option => {
    setchooseData(option);
  };

  const takePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = response.assets[0];
        // console.log(source);

        // setOneImage(response.assets[0]);
        setListImage(prevstate => {
          let newData = [...prevstate];
          newData.push(
            // source,
            {
              name: source.fileName,
              type: source.type,
              uri: source.uri,
            },
          );
          return newData;
        });
      }

      console.log(listImage);
    });
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <HeaderCustome
          header="Input Product"
          pressback={() => {
            navigation.navigate('Akun');
          }}></HeaderCustome>

        <View style={{paddingVertical: 50, paddingHorizontal: 40}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.labelInputContainer}>
              <Text style={styles.kastem}>NAME</Text>
              <Text style={styles.kastem}>:</Text>
            </View>

            <TextInput
              onChangeText={setName}
              value={name}
              placeholder="Your Name"
              style={{
                fontSize: 18,
                alignSelf: 'center',
                marginLeft: 10,
              }}></TextInput>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.labelInputContainer}>
              <Text style={styles.kastem}>CATEGORY</Text>
              <Text style={styles.kastem}>:</Text>
              <TextInput
                onChangeText={setCategory}
                value={category}
                placeholder="Your Name"
                style={{
                  fontSize: 18,
                  alignSelf: 'center',
                  marginLeft: 10,
                }}></TextInput>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.labelInputContainer}>
              <Text style={styles.kastem}>PRICE</Text>
              <Text style={styles.kastem}>:</Text>
            </View>

            <TextInput
              onChangeText={setPrice}
              value={price}
              placeholder="Your Price"
              style={{
                alignContent: 'center',
                marginTop: 0,
                marginLeft: 10,
                fontSize: 18,
              }}></TextInput>
            <Text
              style={{
                fontSize: 18,
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
                DESCRYPTION
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
            <View>
              <TextInput
                placeholder="Your Description"
                onChangeText={setDescryption}
                value={Descryption}
                multiline={true}
                numberOfLines={5}
                style={{
                  backgroundColor: 'white',
                  marginLeft: 10,
                  fontSize: 18,
                  width: 180,
                  textAlignVertical: 'top',
                  backgroundColor: 'white',
                }}></TextInput>
            </View>
          </View>

          <View style={{flexDirection: 'row'}}>
            <View style={styles.labelInputContainer}>
              <Text style={styles.kastem}>PHOTO</Text>
              <Text style={styles.kastem}>:</Text>
            </View>
            <View style={{marginLeft: 10}}>
              <Button onPress={takePhoto} title="OPEN CAMERA" />
            </View>
          </View>
          <Text>Your Photo Here</Text>
          <ScrollView horizontal>
            {listImage.map(
              (item, index) => (
                // {oneImage &&
                <Image
                  key={index}
                  style={{height: 100, width: 100, margin: 5}}
                  source={{uri: item.uri}}
                />
              ),
              // }
            )}
          </ScrollView>
          <TouchableOpacity onPress={ProductInput}>
            <View
              style={{
                backgroundColor: '#DEB887',
                alignItems: 'center',
                marginTop: 35,
                width: 200,
                height: 50,
                alignSelf: 'center',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  textAlignVertical: 'center',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 6,
                  fontSize: 24,
                  color: 'white',
                  fontFamily: 'Poppins-Bold',
                }}>
                SUBMIT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInput;

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
    width: 140,
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
});
