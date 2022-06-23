import { useState} from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

import { Text, TouchableOpacity, View } from "react-native";


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

const getToken = async ({ phoneNumber, oneTimePassword }) => {
  const loginResponse = await fetch('https://dev.stedi.me/twofactorlogin/',{
    method: 'POST',
    headers: {
      'content-type': 'application/text'
    },
    body: {
      phoneNumber,
      oneTimePassword
    }
  });
  const token = await loginResponse.text();
  console.log(token);
}

const Login = () => {
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
        <View style={buttonstyles.container}>
      <View style={buttonstyles.countContainer}>
       
      </View>
      <TouchableOpacity
        style={buttonstyles.button}
        onPress={()=>{sendText(phoneNumber)}}
      >
        <Text style = {styles.text}>Press Here</Text>
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
    marginTop:100
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
    backgroundColor: "#000000",
    padding: 100
    
    
  },
  countContainer: {
    alignItems: "center",
    padding: 100
  },
  text:{
    backgroundColor: "#FFFFFF",
    padding: 15,
    textColor: "#FF00FF",
    
  }

});

export default Login;