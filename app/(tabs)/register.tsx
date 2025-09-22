
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';



export default function Register() {
  const[email,setEmail]= React.useState("");
  const[password,setPassword]= React.useState("");
  const[error,setError]= React.useState("");
  const router = useRouter();
  const handleRegister=async(e:any)=>{
      e.preventDefault();
      if(!email || !password){
        setError("Llene todos los campos");
        return;
      }
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registro exitoso");
        router.push("/");
        
      } catch (error) {
        setError("Registro fallado, vuelva a intentarlo" + error);
      }
    };
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Register</Text>
        <TextInput
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: '60%' }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, width: '60%' }}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} />
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      </View>
    );
    }

