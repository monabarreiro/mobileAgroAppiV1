import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';





export default function HomeScreen() {
  const router = useRouter();
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });
  return (
    <ImageBackground
      source={require('./img/fondo_trigo.png')}
      style={styles.imageBackground}>
    
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>

        <Image
          source={require('./img/logo_agroAppi.png')}
          style={{ width: 70, height: 50 }}
      />

      <Text style={{ fontSize: 18, fontWeight: 'bold' , textAlign: 'center', fontFamily: 'Roboto_700Bold' }}> 
        Bienvenidos a AgroAppi  {'\n'}
        la aplicación que descifra las enfermedades  {'\n'}
        de tus cultivos y te ofrece soluciones efectivas 
        para un mejor rinde.
      

      </Text>
     
      <TouchableOpacity  onPress={() => router.push("/login")}>
       <View style={{ backgroundColor: "#27352F",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 6,
                       marginLeft: 20,
                      marginRight: 20, }}>
       <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 16, fontWeight: 'bold' ,color: 'white'}}>Login</Text>
       </View>

       
      </TouchableOpacity>
      <TouchableOpacity 
  onPress={() => router.push("/register")}>
                        <View style={{ backgroundColor: "#27352F",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 6,
                       marginLeft: 20,
                      marginRight: 20, }}>
 <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 16, fontWeight: 'bold', color: 'white' }}>Regístrese aquí</Text>
                        </View>
       
      </TouchableOpacity>

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
