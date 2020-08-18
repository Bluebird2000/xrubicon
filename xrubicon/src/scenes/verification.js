import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView, Alert, SafeAreaView } from 'react-native';
import { ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Modal, Card } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';
import util from '../assets/utils/util';
import Loading from '../components/loader';
import Success from '../components/success';
import axios from 'axios'


const { width, height } = Dimensions.get("window"); 
export default class Verification extends React.Component {

  state = {
    visible: false,
    email: '',
    password: '',
    status: '',
    isLoading: false,
    isSuccess: false,
  }


  componentDidMount() {
    this._retrieveUserDataFromStorage()
  }

_retrieveUserDataFromStorage = async() => {
  try {
      const data = await AsyncStorage.getItem("data");
      console.log(333, data.data.email);
      let session = JSON.parse(data);
      if(session !== null) {
          this.setState({ session: session })
          this.props.userData(session);
      }
  }catch(error) { }
}

  _saveUserDataToStorage = async data => {
    try {
        await AsyncStorage.setItem("data", JSON.stringify(data));

    }catch(error) { }
}


  _onFulfill = async (value) => {
    this.props.navigation.navigate('Dashboard');
    this.setState({ isLoading: true });
    const email = this.props.route.params.email;
    let token = value;
    let payload = { token, email }
    await this.proceed(payload, token);
}

async proceed(payload, token) {
    const { navigation } = this.props;
        await axios({ 
          url: `https://xrubiconp.herokuapp.com/api/verify?email=Bluebird@gmil.com&token=${payload['token']}`, 
          method: "get", data: payload, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}})
        .then(response => {
          if(response.data) {
            this._saveUserDataToStorage(response.data.response);
          }else { 
              Alert.alert( 'Unable to verify request!', response.data.error,
              [ { text: 'Continue', onPress: () => {  navigation.navigate('') } } ], {cancelable: false})
            }
        }).catch(error => {
            Alert.alert(
            'Request failed',
            `Please ensure you are connected to the internet`,
            [ { text: 'Try again', onPress: () => { navigation.navigate('Verification') } } ], { cancelable: false },
        );
    })
        this.setState({ isLoading: false, password: '' })
}


btnText = () => (
  <Text style={{ fontFamily: util.poppins_regular, color: util.white, marginBottom: 5 }} category='s2'>Register</Text>
)
nameLabel = () => (
  <Text style={{ fontFamily: util.poppins_regular, color: util.bd_color, marginBottom: 5 }} category='s1'>Name</Text>
)
emailLabel = () => (
  <Text style={{ fontFamily: util.poppins_regular, color: util.bd_color, marginBottom: 5 }} category='s1'>Email Address</Text>
)
phoneLabel = () => (
  <Text style={{ fontFamily: util.poppins_regular, color: util.bd_color, marginBottom: 5 }} category='s1'>Password</Text>
)

verify = () => {
  this.setState({ visible: true });
}

modal = () => {
  const { visible } = this.state;
  return (
    <Layout style={styles.modalContainer} level='1'>
      <Modal visible={visible} backdropStyle={styles.backdrop} onBackdropPress={() => this.setState({ visible: false })} >
        <Card disabled={true} style={{ width: width - 100, height: height / 3, justifyContent: 'center',alignItems: 'center' }}>
          <Text style={{ color: util.green, fontSize: util.md_fontsize, textAlign: 'center', lineHeight: 25, fontFamily: util.poppins_regular }}>
              Verified
          </Text>

          <Text style={{ fontSize: util.sm_1_fontsize, color: util.green, textAlign: 'center', lineHeight: 25, fontFamily: util.poppins_regular }}>
              You have successfully verified your account
          </Text>

          <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Button style={{ width: width / 3, backgroundColor: util.white, borderColor: util.white }} onPress={() => {
                this.setState({ visible: false });
                this.props.navigation.navigate('Dashboard')
              } }> <Text style={{ color: util.green, fontFamily: util.poppins_regular }}>Continue</Text> </Button>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

  render () {
    const { visible } = this.state;
    return(
      <ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack}/>
        <SafeAreaView>
          <View style={!this.state.isLoading && !this.state.isSuccess ? {zIndex: 2} : {}}>
            <Layout style={styles.container}>
              <Layout style={styles.wrapper}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                </TouchableOpacity>
                  <ScrollView>
                    <Layout style={styles.formWrap}>
                      <Layout style={{alignItems: 'center', marginTop: 60, backgroundColor: util.grey}}>
                      <Text style={{ fontSize: util.sm_1_fontsize, color: util.green, marginTop: 20, fontFamily: util.poppins_regular}}>Verify your phone number</Text>
                      <Text style={{ width: width / 2, lineHeight: 22, textAlign: 'center', fontSize: 10, color: util.green, marginTop: 10, fontFamily: util.poppins_regular }}>Please enter the Verification sent to ****</Text>
                          <CodeInput
                                ref="xrubicon"
                                codeLength={7}
                                secureTextEntry
                                keyboardType="numeric"
                                activeColor={util.green}
                                inactiveColor={util.green}
                                autoFocus={true}
                                inputPosition="center"
                                space={10}
                                size={35}
                                codeInputStyle={{ borderWidth: 1, fontSize: util.sm_fontsize, height: 50, color: '#000', fontFamily: util.poppins_regular, borderRadius: 15 }}
                                onFulfill={(code) => this._onFulfill(code)}
                            />
                          <Button 
                            size="medium" style={styles.btn} onPress={() => this.verify() } >
                            Verify
                          </Button>
                          <Text style={{ fontSize: util.sm_1_fontsize, color: util.green, marginTop: 30, fontFamily: util.poppins_regular}}>Didn't receive any code? Resend code</Text>

                          { visible && 
                            <React.Fragment>
                                { this.modal() }
                            </React.Fragment>
                          }
                      </Layout>
                    </Layout>
                  </ScrollView>
              </Layout>
            </Layout>
        </View>
          <Loading isLoading={ this.state.isLoading } /> 
          <Success isSuccess={ this.state.isSuccess } />
        </SafeAreaView>
     
      </ApplicationProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: util.grey
  },
  wrapper: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: util.grey,
  },
  icon: {
    width: 18,
    height: 18,
  },
  formWrap: {
    marginVertical: height / 10,
    height: height,
    marginRight: 20,
    marginLeft: 20,
    backgroundColor: util.grey
  },
  text: {
    fontFamily: util.poppins_regular,
    color: util.green,
    fontSize: util.sm_fontsize,
    textAlign: 'center',
    fontSize: util.sm_1_fontsize
  },
  subText: {
    fontFamily: util.poppins_regular,
    color: util.green,
    fontSize: util.sm_1_fontsize,
    textAlign: 'center',
    fontSize: util.sm_1_fontsize
  },
  paragraph: {
    fontFamily: util.poppins_regular,
    marginVertical: 10,
    color: util.bd_color,
  },
  btn: {
    backgroundColor: util.green,
    borderColor: 'transparent',
    marginTop: height / 7,
    width: '80%',
    alignItems: 'center',
    borderRadius: 25,
    fontFamily: util.poppins_regular,
  },
  input: {
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    backgroundColor: util.grey,
    borderRadius: 5,
    borderColor: util.color_primary,
    marginVertical: 10,
    backgroundColor: util.color_primary,
    backgroundColor: util.color_primary
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalContainer: {
  },
  backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});