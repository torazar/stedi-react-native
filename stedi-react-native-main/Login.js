import { useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import { Text, TouchableOpacity, View } from "react-native";
import { clickProps } from "react-native-web/dist/cjs/modules/forwardedProps";


const sendText = async (phoneNumber) => {
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/'+phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
  


  const loginResponseText = await loginResponse.text();
  console.log('Login Response', loginResponseText);
  console.log("Phone Number", phoneNumber);
};

const getToken = async ({ phoneNumber, oneTimePassword, setUserLoggedIn }) => {
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type': 'application/text'
    },
    
  });
console.log("oneTimePassword:", oneTimePassword)
  const responseCode = tokenResponse.status;
  console.log("Response status Code", responseCode);
  if (responseCode == 404) {
    setUserLoggedIn(true);
  }
  

//  const tokenResponseString = 
  // console.log(token);
}

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="434-544-8799"
      />
      <TextInput
        style={styles.input}
        onChangeNumber={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        keyboardType="numeric"
        secureTextEntry={true}
      />
        <View style={buttonstyles.countContainer}>
      
       
        
        
      <TouchableOpacity
        style={buttonstyles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
          <Text styles={buttonstyles.text}>Send Text</Text>
          
        </TouchableOpacity>
        
        
      <TouchableOpacity
        style={buttonstyles.button}
          onPress={()=> {
            getToken({ phoneNumber, oneTimePassword, setUserLoggedIn: props.setUserLoggedIn });
      }}
      >
        <Text style = {buttonstyles.text}>Login</Text>
        </TouchableOpacity>
        </View>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin: {
    marginTop: 100
    
  }
});
const buttonstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 100
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00FF00",
    padding: 10,
    marginTop: 10
    
  },
  countContainer: {
    alignItems: "center",
    padding: 100
  },
  text:{
    
    padding: 15,
    textColor: "#000000",
    
  }

});

export default Login;