import React from 'react';
import {View, Text, TextInput, Button, Alert, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class Login extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: ' ',
            password: ' ',
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

    login=()=>{
        firebase.database().ref('USR-' + this.state.username).once('value').then((snapshot) => {
          var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
          var password = (snapshot.val() && snapshot.val().password)
          var bloodtype = (snapshot.val() && snapshot.val().bloodtype)
          var phonenumber = (snapshot.val() && snapshot.val().phonenumber)
          var age = (snapshot.val() && snapshot.val().age)
          const {navigation} = this.props;
          if(this.state.username === username && this.state.password === password){
          navigation.navigate('Home', {username: username, bloodtype: bloodtype, phonenumber: phonenumber, age: age});
          }else{Alert.alert("Username or password doesn't match.");}
        });   
    }

    gotoRegister=()=>{
        const { navigation } = this.props;
        navigation.navigate('Register');
    }

    render(){
        return(<>
        <Text style={{position: 'relative', top:50,fontWeight: 'bold', fontSize: 26, alignSelf: 'center'}}>LOGIN PAGE</Text>
        <View style={{position: 'relative', top:70, alignSelf: 'center'}}>
        <TextInput placeholder=" Enter username..." onChangeText={(text)=>{this.setState({username: text})}} />
        <TextInput placeholder=" Enter password..." secureTextEntry={true} onChangeText={(text)=>{this.setState({password: text})}} />
        </View>
        <View style={{position: 'relative', top: 80}}>
        <Button title="Login" onPress={this.login} />
        <Text style={{position: 'relative', left: 5, textDecorationLine: 'underline', color: 'blue'}} onPress={this.gotoRegister}>Register</Text>
        </View>
        <Text style={{alignSelf: 'center', position: 'absolute', bottom: 5, }}>Privacy Policy</Text>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <Login {...props} navigation={navigation} />;
  }