import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';






export default function SeleccionarCultivos() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  let historialArray1: { url: string; fecha: string }[] = [{ url: "Historial Vacío", fecha: " " }] ;
  const [historialArray, setHistorialArray] = React.useState(historialArray1); // Estado para forzar la re-renderización
  const iniciarHistorial = async () => {
    try {
      const historial = await AsyncStorage.getItem('historial');
      setHistorialArray(historial ? JSON.parse(historial) : []); // Actualiza el estado para re-renderizar)
    } catch (error) {
      console.log("Error al iniciar el historial:", error);
    }
  }

  React.useEffect(() => {
    iniciarHistorial();
  }, []);

  const guardarHistorial = async (url: string) => {
    try {
      const historial = await AsyncStorage.getItem('historial');
  
      setHistorialArray(historial ? JSON.parse(historial) : []); // Actualiza el estado para re-renderizar)

      pushHistorialArray(url);
      console.log("Historial actualizado:", historialArray);
      await AsyncStorage.setItem('historial', JSON.stringify(historialArray));
    } catch (error) {
      console.log("Error al guardar el historial:", error);
    }
  }
const pushHistorialArray = async (url: string) => {
  setHistorialArray(prevArray => [...prevArray, { url, fecha: new Date().toISOString() }]);
}


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
        
        SELECCIONAR CULTIVO
  
      </Text>

      <Text style={{ color: 'black', fontSize: 14, textAlign: "center", marginTop: 10, marginBottom: 10 }}>
        En esta página podrás seleccionar el cultivo que deseas analizar.{'\n'}
         Presiona el botón del cultivo elegido y en el siguiente paso, {'\n'}
         te pedirá que subas una foto del cultivo afectado. {'\n'}
         Presioná el botón de Summit y espera los resultados. {'\n'}
        y posteriormente la aplicación te brindará un diagnóstico preciso y {'\n'}
        recomendaciones para tratar la enfermedad detectada.{'\n'}

      </Text>


      <TouchableOpacity
        style={{
          backgroundColor: "rgba(226, 172, 33, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          marginBottom: 10,
        
         
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/maizMachine")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         MAIZ
        </Text>
      </TouchableOpacity>
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
          backgroundColor: "rgba(139, 237, 19, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
        marginBottom: 10,
        }}
        onPress={() => handleLinking("https://huggingface.co/spaces/monabarreiro/sojaML")}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         SOJA
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

      <TextInput
        placeholder="Guardar en Historial..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        style={{
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 6,
          padding: 10,
          margin: 20,
        }}
        onSubmitEditing={() => {
          guardarHistorial(searchTerm);
          setSearchTerm("");
        }}
      />
    
      <ScrollView contentContainerStyle={{ margin: 20, maxHeight: 200, justifyContent: 'center', alignItems: 'center' }}>
        {historialArray.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => Linking.openURL(item.url)}>
            <Text>{item.url} - {item.fecha}</Text>  
          </TouchableOpacity>
        ))}
      </ScrollView>
      
    </ScrollView>
  );

}