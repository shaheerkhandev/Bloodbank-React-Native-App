import React from 'react';
import {View, Text, TextInput, Button, Alert, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: ' ',
            password: ' ',
            cpassword: ' ',
            bloodtype: 'default',
            countrycode: 'default',
            age: ' ',
            phonenumber: ' ',
            exists: ' ',
          };
    }
    
    gotoLogin=()=>{
        const { navigation } = this.props;
        navigation.navigate('Login');
    }

    signup=()=>{
    if(this.state.username === ' ' || this.state.password === ' ' || this.state.cpassword === ' ' || this.state.age === ' ' || this.state.bloodtype === 'default' || this.state.countrycode === 'default' || this.state.phonenumber === ' '){Alert.alert("Please fill in the required fields and try again.");
     }else{
     if(this.state.password === this.state.cpassword){
        firebase.database().ref('USR-'+this.state.username).once('value').then((snapshot) => {
            var username = (snapshot.val() && snapshot.val().username)
            if(username === this.state.username){
              Alert.alert("This username is taken.");
          }else{
            firebase.database().ref('USR-' + this.state.username).set({
            username: this.state.username,
            password: this.state.password,
            bloodtype: this.state.bloodtype,
            age: this.state.age,
            phonenumber: this.state.countrycode + this.state.phonenumber
          });
          const { navigation } = this.props;
          navigation.navigate('Login');
          }
          });
     }else{
        Alert.alert(
            "Passwords Don't Match."
          );
        }
     }
    }

    handleBackButtonClick = () => {
      return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}

    render(){
        return(<>
            <Text style={{position: 'relative', top:50,fontWeight: 'bold', fontSize: 26, alignSelf: 'center'}}>REGISTRATION PAGE</Text>
            <View style={{position: 'relative', top:70, alignSelf: 'center'}}>
            <TextInput placeholder=" Enter username..."  onChangeText={(text)=>{this.setState({username: text})}} />
            <TextInput placeholder=" Enter password..." secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} />
            <TextInput placeholder=" Confirm password..." secureTextEntry={true} onChangeText={(text)=>{this.setState({cpassword: text})}} />
            <TextInput placeholder=" Your age..." keyboardType='numeric' maxLength={3} onChangeText={(text)=>{this.setState({age: text})}} />
            <Picker selectedValue={this.state.bloodtype} style={{height: 50, width: 170}} onValueChange={(itemValue, itemIndex) => this.setState({bloodtype: itemValue})}>
            <Picker.Item label="Bloodtype..." value="default" />
            <Picker.Item label="O" value="O" />
            <Picker.Item label="A" value="A" />
            <Picker.Item label="B" value="B" />
            <Picker.Item label="AB" value="AB" />
            </Picker>
            <Picker selectedValue={this.state.countrycode} style={{height: 50, width: 170}} onValueChange={(itemValue, itemIndex) => this.setState({countrycode: itemValue})}>
            <Picker.Item label="Country code..." value="default" />
            <Picker.Item label="+92 (PK)" value="92" />
            <Picker.Item label="+1 (CA)" value="1" />
            </Picker>
            <TextInput placeholder=" Your phone number (without 0)..." keyboardType='numeric' onChangeText={(text)=>{this.setState({phonenumber: text})}} />
            </View>
            <View style={{position: 'relative', top: 80}}>
            <Button title="Register" onPress={this.signup} />
            <Text style={{position: 'relative', left: 5, textDecorationLine: 'underline', color: 'blue'}} onPress={this.gotoLogin}>Login</Text>
            </View>
            <Text style={{alignSelf: 'center', position: 'absolute', bottom: 5, }}>Privacy Policy</Text>
            </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Register {...props} navigation={navigation} />;
  }