import * as Linking from 'expo-linking';
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";


   





export default function ProductoSeleccionado() {
const router = useRouter();
const handleLinking = async (url: string) => {
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("No se puede abrir la URL:", url);
        }
      };

    return ( 
        <View>
            <Text>Producto Seleccionado</Text>
<Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Listado de Productos</Text>
           
                <View  style={{ marginBottom: 20, alignItems: 'center' }}>
                
                    
                         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Producto 0</Text>
                    <Image 
                        source={{ uri: "https://monabarreiroimagenesagroappi.netlify.app/imagenes/maxentis.jpg" }} 
                        style={{ width: 100, height: 100, marginTop: 10 }} 
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }}>Descripción del producto 0</Text>
                   <TouchableOpacity
                    style={{
                      backgroundColor: "rgba(228, 239, 216, 1)",
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderRadius: 5,
                      marginTop: 10
                    }}
                    onPress={() => handleLinking("https://www.mercadolibre.com.ar/")}  //PONER LINK A LENS AI AQUÍ
                  >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Comprar</Text>
                  </TouchableOpacity>
                   <TouchableOpacity
                                      style={{
                                        backgroundColor: "rgba(228, 239, 216, 1)",
                                        paddingVertical: 10,
                                        paddingHorizontal: 20,
                                        borderRadius: 6,
                                         marginLeft: 20,
                                        marginRight: 20,
                                        
                                      }}
                                      onPress={() => handleLinking("https://www.google.com/maps/search/agronomia/")}  //PONER LINK A LENS AI AQUÍ
                                    >
                                      <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
                                   Búsquedas de Agronomías cercanas a tu campo
                                      </Text>
                                    </TouchableOpacity> 

                    
                </View>    
           

        </View>
    );
}