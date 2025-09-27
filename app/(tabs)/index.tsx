import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from 'react';
import { Button, ImageBackground, StyleSheet, Text, View } from 'react-native';




export default function HomeScreen() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require('./img/sojaregada.jpg')}
      style={styles.imageBackground}
    >

      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
        <Image
          source={require('./img/logo_agroAppi.png')}
          style={{ width: 70, height: 50 }}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold' , textAlign: 'center' }}> 
        Bienvenidos a AgroAppi  {'\n'}
        la aplicación que descifra las enfermedades  {'\n'}
        de tus cultivos y te ofrece soluciones efectivas 
        para un mejor rinde.
      

      </Text>

   

     
      <Button title="Login" onPress={() => router.push("/login")} />
      <Button title="Regístrese aquí" onPress={() => router.push("/register")} />

    </View>

    </ImageBackground>
   
  );
}

const styles = StyleSheet.create({
  
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,

    position: 'absolute',

  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
});
