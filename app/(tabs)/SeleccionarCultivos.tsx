import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImageManipulator from 'expo-image-manipulator';
import * as imagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';



export default function SeleccionarCultivos() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState('');
  let historialArray1: { url: string; fecha: string }[] = [{ url: "Historial Vacío", fecha: " " }] ;
  const [historialArray, setHistorialArray] = React.useState(historialArray1); // Estado para forzar la re-renderización
  const [image, setImage] = React.useState<string | null>(null);
  // Función para seleccionar una imagen de la galería
  const [apiKey, setApiKey] = React.useState("AIzaSyB72DREydt7R2WdYu6jGjLXUJZvTjYI-zg");
  const [labels, setLabels] = React.useState<string[]>([]);
  
  async function cloudVisionFetch(imageUri: string) {
    const base64 = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 800 } }], // Redimensionar la imagen para reducir el tamaño
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    ).then(result => result.base64);
    
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64 },
                features: [{ type: "WEB_DETECTION", maxResults: 5 }],
              },
            ],
          }),
        }
      );
    

      const data = await response.json();
      const labelAnnotations = data.responses?.[0]?.webDetection?.webEntities || [];
      setLabels(labelAnnotations.map((l: any) => l.description));
    } catch (e) {
      console.error(e);
      alert("Error analyzing image");
    } }

    function textoAGoogle(texto: string) {  
      const url = `https://www.google.com/search?q=${encodeURIComponent(texto)}`;
      Linking.openURL(url);
    }

  async function pickImage() {
    // No permissions request is necessary for launching the image library
    let result = await imagePicker.requestMediaLibraryPermissionsAsync();

    if (result.granted) {
      let pickerResult = await imagePicker.launchImageLibraryAsync({
        mediaTypes: imagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.canceled) {
        setImage(pickerResult.assets[0].uri);

        await cloudVisionFetch(pickerResult.assets[0].uri);

      }
    }
  };
  

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

      <Text style={{ color: 'black', fontSize: 18, textAlign: "center", marginTop: 10, marginBottom: 10 }}>
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
        onPress={() => router.push(`/buscarImagen?cultivoId=maiz`)}

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
         onPress={() => router.push(`/buscarImagen?cultivoId=trigo`)}
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
        onPress={() => router.push(`/buscarImagen?cultivoId=soja`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         SOJA
        </Text>
      </TouchableOpacity>

      
     {/*  <TouchableOpacity
        style={{
          backgroundColor: "rgba(232, 227, 81, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => router.push(`/buscarImagen?cultivoId=tomate`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
       TOMATE
        </Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={{
          backgroundColor: "rgba(50, 87, 5, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}

         onPress={() => router.push(`/buscarImagen?cultivoId=papa`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", textAlign: "center" }}>
      PAPA
        </Text>
      </TouchableOpacity> */}

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
        onPress={() => router.push(`/buscarImagen?cultivoId=uva`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "white", textAlign: "center" }}>
        UVA
        </Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={{
          backgroundColor: "rgba(234, 223, 16, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => router.push(`/buscarImagen?cultivoId=cereza`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
        CEREZA
        </Text>
      </TouchableOpacity> */}


      {/*  <TouchableOpacity
        style={{
          backgroundColor: "rgba(198, 106, 19, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
        onPress={() => router.push(`/buscarImagen?cultivoId=manzana`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
        MANZANA
        </Text>
      </TouchableOpacity> */}


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
        onPress={() => router.push(`/buscarImagen?cultivoId=citricos`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
         CITRICOS
        </Text>
      </TouchableOpacity>
     
     {/*  <TouchableOpacity
        style={{
          backgroundColor: "rgba(228, 239, 216, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          
        }}
        onPress={() => router.push(`/buscarImagen?cultivoId=frutilla`)}
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
      FRUTILLA
        </Text>
      </TouchableOpacity>
 */}

      <TouchableOpacity
        style={{
          backgroundColor: "rgba(228, 239, 216, 1)",
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 6,
           marginLeft: 20,
          marginRight: 20,
          
        }}
        onPress={() => handleLinking("https://www.google.com/?olud=1")}  //PONER LINK A LENS AI AQUÍ
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
     
   BUSCAR ENFERMEDADES CON LENS 
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
        onPress={() => router.push("/listadoCultivos")}  //PONER LINK A LENS AI AQUÍ
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
     Soluciones para tu resultado
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
        onPress={() => handleLinking("https://www.google.com/maps/search/agronomia/")}  //PONER LINK A LENS AI AQUÍ
      >
        <Text style={{ fontWeight: "bold", fontSize: 24, color: "black", textAlign: "center" }}>
     Busquedas de Agronomias cercanas a tu campo
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

