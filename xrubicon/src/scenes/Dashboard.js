import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { ApplicationProvider, Button, Icon, IconRegistry, Layout, Text, Modal, Card, Input } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import util from '../assets/utils/util';
import Navbar from '../components/navbar';

const { width, height } = Dimensions.get("window"); 

export default class Dashboard extends React.Component {

  state = {
    visible: false,
    email: '',
    password: '',
    status: '',
    isLoading: false,
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
    const { value, setValue, status, visible } = this.state;
    return(
      <ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack}/>
        <Layout style={styles.container__wrapper}>
            <SafeAreaView>
                <Navbar />
                <View style={styles.container}>
                  <View style={{ margin: 20 }}>
                    <Card style={{ backgroundColor: util.green, borderRadius: 20, height: height / 7, justifyContent: 'center' }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ color: util.white, fontFamily: util.poppins_regular, fontSize: util.sm_fontsize}}>Balance</Text>
                        <Text style={{ color: util.white, fontFamily: util.poppins_regular, fontSize: util.sm_fontsize}}>
                          Balance</Text>
                      </View>
                      {/*  */}
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{ color: util.white, fontFamily: util.poppins_regular, fontSize: util.sm_fontsize}}>
                          70000</Text>
                        <Text style={{ color: util.white, fontFamily: util.poppins_regular, fontSize: util.sm_fontsize}}>
                          350.00</Text>
                      </View>
                    </Card>
                    {/* <View style={{ margin: 20 }}></View> */}
                    <View style={{ margin: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                      <Button 
                        size="tiny" style={{ width: width / 4, borderRadius: 25, backgroundColor: util.green, borderColor: 'transparent' }} onPress={() => this.verify() } >
                        payout
                      </Button>
                      <Button 
                        size="tiny" style={{ width: width / 4, borderRadius: 20, backgroundColor: '#ddd', borderColor: 'transparent' }} onPress={() => this.verify() } >
                        <Text style={{ color: util.green, fontSize: util.sm_1_fontsize}}>History</Text>
                      </Button>
                    </View>

                    <View style={{ margin: 20, alignItems: 'center' }}>
                        <Text style={{ color: util.green, fontSize: util.md_fontsize, fontFamily: util.poppins_regular}}>Current Balance</Text>
                        <Text style={{ marginTop: 5, color: util.green, fontSize: util.md_fontsize, fontFamily: util.poppins_regular}}>N3000</Text>
                    </View>
                    <View style={styles.input}>
                      <Input  
                        accessoryRight={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='chevron-down-outline' /> )}
                        
                        style={styles.textInput}
                        placeholder='Select Bank'
                        value={value}
                        size="large"
                        status={status}
                        placeholder="Select Bank"
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={username => this.setState({ username }) }
                      />
                      <Input  
                        accessoryLeft={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='person-outline' /> )}
                        
                        style={styles.textInput}
                        placeholder='Select Bank'
                        value={value}
                        size="large"
                        status={status}
                        placeholder="Select Bank"
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={username => this.setState({ username }) }
                      />
                      <Input  
                        accessoryLeft={() => ( <Icon style={styles.icon} fill='#8F9BB3' name='person-outline' /> )}
                        
                        style={styles.textInput}
                        placeholder='Select Bank'
                        value={value}
                        size="large"
                        status={status}
                        placeholder="Account no"
                        textStyle={{ color: util.text_color_primary, fontFamily: util.poppins_regular, fontSize: util.sm_1_fontsize }}
                        onChangeText={username => this.setState({ username }) }
                      />
                    </View>

                  </View>
                </View>
            </SafeAreaView>
        </Layout>
     
      </ApplicationProvider>
    )
  }
}

const styles = StyleSheet.create({
    container__wrapper:{
        flex: 1,
        backgroundColor: util.grey,
    },
    container: {
        // flex: 1,
        backgroundColor: util.grey,
        margin: 10,
        marginVertical: 0,
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
    // marginVertical: 50,
    fontSize: util.sm_1_fontsize
  },
  subText: {
    fontFamily: util.poppins_regular,
    color: util.green,
    fontSize: util.sm_1_fontsize,
    textAlign: 'center',
    // marginVertical: 50,
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
    margin: 10,
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