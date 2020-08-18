import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, ScrollView, Alert, SafeAreaView } from 'react-native';
import { ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Input } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import axios from 'axios'
import util from '../assets/utils/util';
import Loading from '../components/loader';
import Success from '../components/success';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get("window"); 
export default class Register extends React.Component {

  state = {
    username: "",
    email: "",
    phone: "",
    password: '',
    isLoading: false,
    isSuccess: false,
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
  
  _saveUserDataToStorage = async data => {
    try {
        await AsyncStorage.setItem("data", JSON.stringify(data));

    }catch(error) { }
}


  signup = async () => {
    this.setState({ isLoading: true });
    const baseUrl = `https://xrubiconp.herokuapp.com/api/register`;
    let { username, email, phone, password } = this.state;
    password = phone;
    let payload = { username, email, phone, password  };
    await this.proceed(payload, baseUrl);

}

async proceed(payload, baseUrl) {
  this.setState({ isLoading: true })
    const { navigation } = this.props;
        await axios({ url: 'https://xrubiconp.herokuapp.com/api/register', method: "post", data: payload, 
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'}
      })
      .then(response => {
          if(response.data) {
            this._saveUserDataToStorage(response.data);
            this.props.navigation.navigate('Verification', { email: response.data.email });
            this.setState({ isLoading: false });
          }else {
            Alert.alert( 'Request Failed!', response.data.error,
            [ { text: 'Continue', onPress: () => {  navigation.navigate('') } } ], {cancelable: false})
          }
        }).catch(error => {
            Alert.alert(
            'Request failed',
            `Please ensure you are connected to the internet`,
            [ { text: 'Try again', onPress: () => { navigation.navigate('Register') } } ], { cancelable: false },
        );
    })
        this.setState({ isLoading: false, password: '' })
}

  render () {
    const { value, setValue, status, isLoading } = this.state;
    return(
      <ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack}/>
        
        <SafeAreaView>
        <View style={!this.state.isLoading && !this.state.isSuccess ? {zIndex: 2} : {}}>
        <Layout style={styles.container}>
          <Layout style={styles.wrapper}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Icon style={styles.icon} fill={util.bd_color} name='arrow-back' />
            </TouchableOpacity>
            
              <ScrollView>
                <Layout style={styles.formWrap}>
                  <Layout style={{alignItems: 'center', marginTop: 60, backgroundColor: util.grey}}>
                  <Text style={styles.text}>Register as a User</Text>
                    <View style={styles.input}>
                      <Input  
                        accessoryLeft={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='person-outline' /> )}
                        
                        style={styles.textInput}
                        placeholder='Name'
                        value={value}
                        size="large"
                        status={status}
                        placeholder="Name"
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={username => this.setState({ username }) }
                      />
                    </View>

                    <View style={styles.input}>
                      <Input  
                        style={styles.textInput}
                        accessoryLeft={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='phone-outline' /> )}
                        
                        labelStyle={{color: 'red'}}
                        placeholder='Input phone no'
                        value={value}
                        size="large"
                        status={status}
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={phone => this.setState({ phone })}
                      />
                    </View>

                    <View style={styles.input}>
                      <Input  
                        accessoryLeft={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='email-outline' /> )}
                        style={styles.textInput}
                        placeholder='Email Address'
                        value={value}
                        size="large"
                        status={status}
                        placeholder="email@example.com"
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={email => this.setState({ email }) }
                      />
                    </View>
                   
                      {isLoading && 
                        <Loading isActive={ isLoading } /> 
                      }
                      <Button 
                        accessoryLeft={() => ( 
                        <Icon style={styles.icon} fill='#8F9BB3' name='arrow-forward-outline' /> )}
                        size="small" style={styles.btn} onPress={() => this.signup() } >
                        Register
                      </Button>
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
    // margin: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: util.grey,
  },
  icon: {
    width: 18,
    height: 18,
  },
  formWrap: {
    marginVertical: height / 50,
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
    marginVertical: 50,
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
    marginVertical: 30,
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
});