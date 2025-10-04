import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity } from 'react-native';



export default function EnfMulticultivos() {
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
    <ScrollView>
      <Text style={{ color: 'green', fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 20, marginBottom: 20 }}>
        
        SELECCIONAR Enfermedad del Cultivo
  
      </Text>

      
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(211, 244, 170, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         TRIGO
        </Text>
      </TouchableOpacity>
  
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(232, 227, 81, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
       TOMATE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(50, 87, 5, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}

        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", textAlign: "center" }}>
      PAPA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(102, 28, 231, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", textAlign: "center" }}>
        UVA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(234, 223, 16, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
        CEREZA
        </Text>
      </TouchableOpacity>
       <TouchableOpacity
        style={{
          backgroundColor: "rgba(198, 106, 19, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
        MANZANA
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(236, 239, 12, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         CITRICOS
        </Text>
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
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/MLMulticultivos")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
      FRUTILLA
        </Text>
      </TouchableOpacity>

       <TouchableOpacity
        style={{
          backgroundColor: "rgb(143,157,126)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
          marginLeft: "25%",
          marginRight: "25%",
          marginTop: 20,
          marginBottom: 20,
        }}
        onPress={() => router.push("/")}
      >
        <Text style={{ color: "white", fontSize: 18, textAlign: "center", fontWeight: "bold" }}>
        VOLVER A PANTALLA HOME
        </Text>
      </TouchableOpacity>

      
    
    </ScrollView>
  );

}