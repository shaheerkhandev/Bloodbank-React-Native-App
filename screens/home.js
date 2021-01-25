import React from 'react';
import {Button,Text, View, ScrollView, Alert, TextInput, BackHandler} from 'react-native';
import firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [],
            snapl: ' ',
            searchs: ' ',
        }
    }
    handleBackButtonClick = () => {
      return true;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    this.work()
}

componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
}
      
    work=()=>{
        firebase.database().ref().on('child_added', (snapshot)=> {
         var snap = snapshot.val();
         var newStateArray = this.state.list.slice();
         const { username, bloodtype } = this.props.route.params;
         if(snap.username === username){}else if(snap === null || snap === NaN || snap === '' || snap === ' '){Alert.alert('There are no users matching your bloodtype :(')}else{
         if(snap.bloodtype === bloodtype){
         newStateArray.push({id: this.state.list.length + 1,username: snap.username, age: snap.age, bloodtype: snap.bloodtype, phonenumber: snap.phonenumber});
         this.setState({list: newStateArray,});
         }
         }
        });
    }

     search=()=>{
      if(this.state.searchs === ' '){Alert.alert("Please enter a user.")}else{
      firebase.database().ref('USR-'+this.state.searchs).once('value').then((snapshot) => {
        var username = (snapshot.val() && snapshot.val().username)
        console.log(username)
        var bloodtype = (snapshot.val() && snapshot.val().bloodtype)
        var age = (snapshot.val() && snapshot.val().age)
        var phonenumber = (snapshot.val() && snapshot.val().phonenumber)
        if(username === this.state.searchs){
          this.props.navigation.navigate('Userprofile', {username: username, bloodtype: bloodtype, phonenumber: phonenumber, age: age})
      }else{
       Alert.alert("User doesn't exist.")
      }
    });
  }
     }

    render(){
        const { username, bloodtype, phonenumber, age } = this.props.route.params;
        return(<>
        <TextInput placeholder=" Search User... (Press enter to search)" onSubmitEditing={this.search} onChangeText={(text)=>{this.setState({searchs: text})}}/>
        <Text style={{alignSelf: 'center', fontWeight: 'bold', marginBottom: 20, marginTop: 30}}>Users matching your bloodtype...</Text>
          {this.state.list.map((item) => {
          return(
            <View key={item.id}  style={{borderBottomColor: 'black',borderBottomWidth: 5, marginBottom: 20}}>
              <Text style={{fontSize: 22}}>Name: {item.username}, BloodType: {item.bloodtype} </Text>
              <Text>{item.age} years old, Number: +{item.phonenumber}</Text>
            </View>
          )})}
            <View style={{position: 'absolute', bottom: 1, left: 1, right: 1,}}>
            <Button title="Go to My Profile" onPress={()=>{this.props.navigation.navigate('Profile', {username: username, bloodtype: bloodtype, phonenumber: phonenumber, age: age})}} />
            </View>
            </>)
    }
}

export default function(props) {
    const navigation = useNavigation();
  
    return <Home {...props} navigation={navigation} />;
  }