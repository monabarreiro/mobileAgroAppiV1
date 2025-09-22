import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';





export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
      <Image
        source={require('./img/logo_agroAppi.png')}
        style={{ width: 70
          , height: 50 }}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold' , textAlign: 'center' }}> 
        Bienvenidos a AgroAppi  {'\n'}
        la aplicación que descifra las enfermedades  {'\n'}
        de tus cultivos y te ofrece soluciones efectivas 
        para un mejor rinde.
      

      </Text>

      <Image
        source={require('./img/sojaregada.jpg')}
        style={{ width: "100%", height: 200 }}
      />

      <Button title="Seleccione el cultivo" onPress={() => router.push("/SeleccionarCultivos")} />

      <Button title="Login" onPress={() => router.push("/login")} />
        
    </View>


   
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
});
