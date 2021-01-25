import React from 'react';
import {View, Text, TextInput, Button, Alert, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            countrycode: 'default',
            age: ' ',
            phonenumber: ' ',
          };
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

    edit=()=>{
        const { username, bloodtype } = this.props.route.params;
        if(this.state.bloodtype === 'default' || this.state.age === '' || this.state.countrycode === 'default' || this.state.phonenumber === ''){Alert.alert("Please fill in the required fields and try again.");}else{
        firebase.database().ref('USR-' + username).set({
            age: this.state.age,
            phonenumber: this.state.countrycode + this.state.phonenumber
          });
        this.props.navigation.navigate('Profile', {username: username, age: this.state.age, bloodtype: bloodtype, phonenumber: this.state.phonenumber});
        }
    }

    render(){
        return(<>
            <Text style={{position: 'relative', top:50,fontWeight: 'bold', fontSize: 26, alignSelf: 'center'}}>Edit your profile</Text>
            <View style={{position: 'relative', top:70, alignSelf: 'center'}}>
            <TextInput placeholder=" Enter new age..." keyboardType='numeric' maxLength={3} onChangeText={(text)=>{this.setState({age: text})}} />
            <Picker selectedValue={this.state.countrycode} style={{height: 50, width: 170}} onValueChange={(itemValue, itemIndex) => this.setState({countrycode: itemValue})}>
            <Picker.Item label="New Country code..." value="default" />
            <Picker.Item label="+92 (PK)" value="92" />
            <Picker.Item label="+1 (CA)" value="1" />
            </Picker>
            <TextInput placeholder=" Enter new phone number..." keyboardType='numeric' onChangeText={(text)=>{this.setState({phonenumber: text})}} />
            </View>
            <View style={{position: 'relative', top: 80}}>
            <Button title="Save" onPress={this.edit} />
            </View>
            </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Register {...props} navigation={navigation} />;
  }