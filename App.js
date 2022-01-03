import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  TextInput,
} from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class App extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View
            onPress={() => this.setModalVisible(false)}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={{
                  uri: 'https://bloximages.chicago2.vip.townnews.com/insidetucsonbusiness.com/content/tncms/assets/v3/editorial/a/84/a84da212-9ef6-11eb-a459-bf219a08828d/6079fababf4ef.image.jpg?resize=420%2C630',
                }}
                style={{height: 50, width: 50, borderRadius: 25}}
              />
              <Text
                style={{
                  fontFamily: 'Poly-Regular',
                  fontSize: 18,
                  color: 'black',
                }}>
                Very Good
              </Text>
              <View style={{flexDirection: 'row'}}>
                <View style={{alignItems: 'center'}}>
                  <Stars
                    default={2.5}
                    count={5}
                    half={true}
                    starSize={150}
                    fullStar={
                      <Icon name={'star'} style={[styles.myStarStyle]} />
                    }
                    emptyStar={
                      <Icon
                        name={'star-outline'}
                        style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                      />
                    }
                    halfStar={
                      <Icon name={'star-half'} style={[styles.myStarStyle]} />
                    }
                  />
                </View>
              </View>
              <View style={{borderColor: 'black'}}>
                <TextInput
                  placeholder="Masukan Text"
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
                onPress={() => this.setModalVisible(!modalVisible)}>
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
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image
              source={{
                uri: 'https://static.wixstatic.com/media/89734b103cba4feb9b458fbec306697c.jpg/v1/fill/w_400,h_432,al_c,q_80,usm_0.66_1.00_0.01/Silhouette.webp',
              }}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <Text style={styles.textStyle}>
              gabriel refuses your request to borrow a camera CANON 1100D
            </Text>
            <View style={{width: 50, height: 50, borderRadius: 25}}></View>
          </View>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image
              source={{
                uri: 'https://bloximages.chicago2.vip.townnews.com/insidetucsonbusiness.com/content/tncms/assets/v3/editorial/a/84/a84da212-9ef6-11eb-a459-bf219a08828d/6079fababf4ef.image.jpg?resize=420%2C630',
              }}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <Text style={styles.textStyle}>
              gabriel accept your request to borrow a camera CANON 1100D
            </Text>
            <Image
              style={{height: 50, width: 50}}
              source={{
                uri: 'https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-2-1.png',
              }}
            />
          </View>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Image
              source={{
                uri: 'https://bloximages.chicago2.vip.townnews.com/insidetucsonbusiness.com/content/tncms/assets/v3/editorial/a/84/a84da212-9ef6-11eb-a459-bf219a08828d/6079fababf4ef.image.jpg?resize=420%2C630',
              }}
              style={{height: 50, width: 50, borderRadius: 25}}
            />
            <Text style={styles.textStyle}>Review your transaction</Text>
            <View style={{width: 50, height: 50, borderRadius: 25}}></View>
          </View>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 10,

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginVertical: 10,
  },
  buttonOpen: {
    backgroundColor: '#F8DE8B',
    borderRadius: 10,
  },

  textStyle: {
    color: 'black',
    alignContent: 'center',
    textAlign: 'center',
    width: 230,
    fontFamily: 'Poly-Regular',
    marginHorizontal: 10,
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  },
});

export default App;
