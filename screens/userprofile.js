import React from 'react';
import {Text, View, Button, Alert, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class Userprofile extends React.Component {

    // constructor(props){
    //     super(props);
    // }

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
        const { username, bloodtype, age, phonenumber } = this.props.route.params;
        return(<>
            <Text style={{position: 'relative', top: 70, left: 15,fontSize: 26}}>User Profile:</Text>
            <View style={{position: 'relative', top: 100, left: 15}}>
            <Text><Text style={{fontWeight: 'bold'}}>Username:</Text> <Text>{username}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Bloodtype:</Text> <Text>{bloodtype}</Text></Text>
            <Text><Text style={{fontWeight: 'bold'}}>Age:</Text> <Text></Text>{age} years old</Text>
            <Text><Text style={{fontWeight: 'bold'}}>Phone Number:</Text> +<Text>{phonenumber}</Text></Text>
            </View>
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go Back" onPress={()=>{this.props.navigation.goBack();}} />
            </View>
        </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Userprofile {...props} navigation={navigation} />;
  }