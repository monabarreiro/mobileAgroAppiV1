import { useRoute } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import * as ImageManipulator from 'expo-image-manipulator';
import * as imagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native'; // Modulos necesarios




export default function BuscarImagen() {
     const router = useRouter();
     const [image, setImage] = React.useState<string | null>(null);
      // Función para seleccionar una imagen de la galería
      const [apiKey, setApiKey] = React.useState("AIzaSyB72DREydt7R2WdYu6jGjLXUJZvTjYI-zg");
      const [labels, setLabels] = React.useState<string[]>([]);
      const [posiblesEnfermedades, setPosiblesEnfermedades] = React.useState<number[]>([]);
      const [textoPosiblesEnfermedades, setTextoPosiblesEnfermedades] = React.useState<string[]>([]);
      const [diccionarioMaiz, setdiccionarioMaiz] = React.useState<string[][]>([
    ["White patches", "Pantoea ananatis"], // Ejemplo de enfermedad  Maiz 0
    ["Pathology", "Plant pathology"],
    ["Estrès hídric"],
    ["Plant diseases", "Blight"],
    ["Corn smut", "Smut"],
    ["Río Cuarto"]
     
  ]); //
const [diccionarioLimon, setdiccionarioLimon] = React.useState<string[][]>([
    ["Acari", "Mite"], // Limon Enfermedaad Acaro de las Yemas  Limon 1 
    ["Xanthomonas citri ", "Citrus canker"], // Limon Enferemedad2 Cancrosis
    ["Chlorosis"],  // Limon Enfermedad3 Clorosis
    ["Mealybug ", "Lepidoptera"], // Limon Enfermedad4 Cochinilla Minador de los Citricos
    ["Diaphorina citri", "Citrus greening disease"], // Limon Enfermedad5 HLB
    ["anthracnose"] // Limon Enfermedad6 Antracnosis
     
  ]); // 
  const [diccionarioSoja, setdiccionarioSoja] = React.useState<string[][]>([
    ["Septoria glycines", "Septoria"], // Mancha marron en sojaa Ejemplo de enfermedad 2.    Soja 2
    ["Cercospora kikuchii", "Cercospora"],
    ["Cercospora sojina", "Frogeye leaf spot"],// Mancha ojo de rana
    ["", ""],
    ["", ""],
    [""]
     
  ]); // 
    const [diccionarioTrigo, setdiccionarioTrigo] = React.useState<string[][]>([
    ["", ""], // Ejemplo de enfermedad 2 Trigo 3 
    ["", ""],
    [""],
    ["", ""],
    ["", ""],
    [""]
     
  ]); // 
     const [diccionarioUva, setdiccionarioUva] = React.useState<string[][]>([
    ["", ""], // Ejemplo de enfermedad 2Uva 4 
    ["", ""],
    [""],
    ["", ""],
    ["", ""],
    [""]
     
  ]); // 
      const [diccionarioCebada, setdiccionarioCebada] = React.useState<string[][]>([
    ["", ""], // Ejemplo de enfermedad 2Cebada 5 
    ["", ""],
    [""],
    ["", ""],
    ["", ""],
    [""]
     
  ]); // 
  let listaDiccionarios: string[][][] = [diccionarioMaiz, diccionarioLimon, diccionarioSoja, diccionarioTrigo, diccionarioUva, diccionarioCebada];
  let numeroCultivo: number = 0; // Maiz por defecto
  
  
  
  const route = useRoute();
      let {cultivoId} = route.params  as {cultivoId: any | ""};
      async function generarEnlaceEnfermedad() { 
        console.log("Posibles enfermedades encontradas: ", posiblesEnfermedades);
        posiblesEnfermedades.forEach((index) => {
          console.log("Generando enlace para enfermedad con índice: ", index);
          setTextoPosiblesEnfermedades(prev => [...prev, "/listadoEnfermedades?cultivoId=maiz&enfermedadId=" + index.toString()]);
          setPosiblesEnfermedades(prev => [...prev,index ]); 
        });
      }
  if (cultivoId.toLowerCase() === "maiz") {
    numeroCultivo = 0;
  } else if (cultivoId.toLowerCase() === "citricos" || cultivoId.toLowerCase() === "limon") {
    numeroCultivo = 1;
    cultivoId = "limón";
  } else if (cultivoId.toLowerCase() === "soja") {
    numeroCultivo = 2;
  } else if (cultivoId.toLowerCase() === "trigo") {
    numeroCultivo = 3;
  } else if (cultivoId.toLowerCase() === "uva") {
    numeroCultivo = 4;
  } else if (cultivoId.toLowerCase() === "cebada") {
    numeroCultivo = 5;
  }

   const removeAccents = (str: string): string => {
  const accents: { [key: string]: string } = {
      'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
      'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
      'ñ': 'n', 'Ñ': 'N'
  };
  
  return str.split('').map((char: string) => accents[char] || char).join('');
}
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
            setLabels(labelAnnotations.map((l: any) => l.description)); // es lo que genera Google Vision
labelAnnotations.map((l: any) => {
              // Buscar en el diccionario si la etiqueta coincide con alguna enfermedad conocida
             for (let i = 0; i < listaDiccionarios[numeroCultivo].length; i++) {
            listaDiccionarios[numeroCultivo][i].forEach((enfermedad) => {
              if (removeAccents(l.description.toLowerCase()).includes(removeAccents(enfermedad.toLowerCase()))) {
               setTextoPosiblesEnfermedades( [ "/listadoEnfermedades?cultivoId="+cultivoId+"&enfermedadId=" + i.toString()]);  
              return; // Salir del bucle una vez que se encuentra una coincidencia}
              
              }
            }); 
          }
          
         });
        } catch (e) {
          console.error(e);
          alert("Error analyzing image");
        }  }

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
      
  return (
    <ImageBackground source={require("./img/campo4.jpg")} style={{ flex: 1, padding: 10 }} resizeMode="cover"> 
    <View>
      <div style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 10,textAlign: 'center', borderRadius: 10 }}>
  <TouchableOpacity onPress={() => router.push("/SeleccionarCultivos")}>

      <Text style={{ fontSize: 24,color: "green", fontWeight: 'bold', textAlign: 'center', marginTop: 20, marginBottom: 20 }}>Volver a Selección de Cultivos</Text>
    </TouchableOpacity>
      <Text style={{ color: 'black', fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 20, marginBottom: 20 }}> 
        SUBIR IMAGEN DEL CULTIVO: {cultivoId.toUpperCase()}
        </Text>
        
       <TouchableOpacity onPress={pickImage}>
              <Text style={{ color: '#3c0ef6ff', fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 10, marginBottom: 10 }}>
              Subi tu imagen aquí  (Presiona para abrir)
              </Text>
      
         </TouchableOpacity>
            
            {labels.map((label, index) => (
              <TouchableOpacity key={index}  onPress={() => textoAGoogle(label + " " + cultivoId)}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{label}</Text>
              </TouchableOpacity>
            ))}
            {image && (
              <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' , marginTop: 10, marginBottom: 10 }}> Imagen seleccionada: {image}</Text>
            )}
            {textoPosiblesEnfermedades.map((enlace, index) => (
      <TouchableOpacity key={index} onPress={() => router.push(textoPosiblesEnfermedades[index] as any)}>

        <Text style={{ fontSize: 20, color: 'blue', textDecorationLine: 'underline', textAlign: 'center', marginTop: 10 }}>
        Solución posible (Presiona aquí) 
        </Text>
      </TouchableOpacity>
    ))}
      <TouchableOpacity onPress={() => router.push(`/listadoEnfermedades?cultivoId=${encodeURIComponent(cultivoId)}`)}>
        <Text style={{ fontSize: 24, color: "green", fontWeight: 'bold', textAlign: 'center' ,  marginTop: 20 }}>Ir al listado de enfermedades</Text>
      </TouchableOpacity>
      </div>
    </View>
    </ImageBackground>

  );
}