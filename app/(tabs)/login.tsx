
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";




export default function Login() {
  const[email,setEmail]= React.useState("");
  const[password,setPassword]= React.useState("");
  const[error,setError]= React.useState("");
  const router = useRouter();



  const[request,response,promptAsync]= Google.useAuthRequest({
  iosClientId: "137817998022-m7bvtv92p9qc7l86nmt261c30m8misbo.apps.googleusercontent.com",
  webClientId: "137817998022-qbcp5bo1jjsv24e147u51bgj0l0dti3e.apps.googleusercontent.com",
  scopes: ["profile","email"],
  redirectUri: "http://localhost:8081",
  responseType: "token",
  
 
  });
const GoogleLogin= async()=>{ try {
  const respuesta = await promptAsync();
  if (respuesta.type === "success") {
    const { authentication } = respuesta;
   alert("Login exitoso");
  }
} catch (error) {
  
}}
    // Aquí puedes usar el token para autenticar al usuario en tu backend o con Firebase

  const auth = getAuth();
  const handleLogin=async(e:any)=>{
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth,email,password);
      router.push("/SeleccionarCultivos");

    }catch(error){
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    }
  };
  useEffect(() => {
    console.log(request?.redirectUri);

    if (response?.type === "success") {
      const { authentication } = response;
      // You can use the authentication object to fetch user info or proceed with your app logic
      router.push("/SeleccionarCultivos");
    }
  }, [response]);


  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>Login</h1>
      

          
      <form onSubmit={handleLogin} style={{ fontSize: 18 , display: 'flex', flexDirection: 'column', gap: 10,justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{ marginBottom: 10, width: 300, height: 30, borderRadius: 5 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{ marginBottom: 10, width: 300, height: 30, borderRadius: 5 }}
        />
        <button type="submit">Login</button>
    

      </form>
     
     <TouchableOpacity
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: '#4285F4',
          borderRadius: 5,
        }}
        onPress={() => {
          promptAsync();
        }}
      >
        <Text style={{ color: '#150202ff', fontSize: 16 }}> Login with Google</Text>
     
      </TouchableOpacity>
      <TouchableOpacity onPress={GoogleLogin}>
        <Text style={{ color: '#150202ff', fontSize: 16 }}> Login with Google</Text>
      </TouchableOpacity>

       
      
      
      {error&&<p>{error}</p>}
    </View>
  );
}
