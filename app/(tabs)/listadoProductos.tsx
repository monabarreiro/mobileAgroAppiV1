import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';





export default function ListadoProductos() {
    const [tituloProductos, settituloProductos] = useState<{ id: string; [key: string]: any }[]>([ {id: '0', titulo: 'Producto 0'}]);
    const [descripcionProductos, setdescripcionProductos] = useState<{ id: string; [key: string]: any }[]>([{id: '0', descripcion: 'Descripción del producto 0'}]);
    const [imagenProductos, setimagenProductos] = useState<{ id: string; [key: string]: any }[]>([ {id: '0', imagen: "https://monabarreiroimagenesagroappi.netlify.app/imagenes/maxentis.jpg"}]);
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Listado de Productos</Text>
            {tituloProductos.map((producto, index) => (

                <View key={producto.id} style={{ marginBottom: 20, alignItems: 'center' }}>
                    <TouchableOpacity>
                         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tituloProductos[index].titulo}</Text>
                    <Image 
                        source={{ uri: imagenProductos[index].imagen }} 
                        style={{ width: 100, height: 100, marginTop: 10 }} 
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }}>{descripcionProductos[index].descripcion}</Text>

                    </TouchableOpacity>
                    
                </View>
            ))}    
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

    );
}

