import React from 'react';
import {Text, View, Button, Alert, NativeModules, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class Profile extends React.Component {

    // constructor(props){
    //     super(props);
    // }

    edit=()=>{
    const { username, bloodtype, age, phonenumber } = this.props.route.params;
    this.props.navigation.navigate('Editprofile', {username: username, bloodtype: bloodtype, phonenumber: phonenumber, age: age, password: password});
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
        const { username, bloodtype, age, phonenumber, password } = this.props.route.params;
        return(<>
            <Text style={{position: 'relative', top: 70, left: 15,fontSize: 26}}>My Profile:</Text>
            <View style={{position: 'relative', top: 100, left: 15}}>
            <Text><Text style={{fontWeight: 'bold'}}>Username:</Text> <Text>{username}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Bloodtype:</Text> <Text>{bloodtype}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Age:</Text> <Text></Text>{age} years old</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Phone Number:</Text> +<Text>{phonenumber}</Text></Text>
            </View>
            <View style={{position: 'relative', top: 130, left: 15}}>
            <Text style={{textDecorationLine: 'underline', color: 'blue', fontSize: 20}} onPress={this.edit}>Edit Profile</Text>
            <Text style={{textDecorationLine: 'underline', color: 'blue', fontSize: 20}} onPress={()=>{NativeModules.DevSettings.reload();}} >Logout</Text>
            </View>
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go to Home" onPress={()=>{this.props.navigation.navigate('Home', {username: username, bloodtype: bloodtype, phonenumber: phonenumber, password: password})}} />
            </View>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Profile {...props} navigation={navigation} />;
  }
