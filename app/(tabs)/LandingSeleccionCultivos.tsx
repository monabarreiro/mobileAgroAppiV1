import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export default function LandingSeleccionCultivos() {
    const router = useRouter();
  return ( <View>
    <Text> 
    Landing Selección Cultivos

    En esta pagina podrás seleccionar el cultivo que deseas analizar.
    Presiona el botón del cultivo elegido
    y en el siguiente paso, te pedira que subas una foto del cultivo afectado.
    Presioná el botón de Summit y espera los resultados.
    y Posteriormente la aplicación te brindará un diagnóstico preciso y 
    recomendaciones para tratar la enfermedad detectada.

    
    </Text>
  <TouchableOpacity onPress={() => router.push("/SeleccionarCultivos")}>
      <Text>Ir a Seleccionar Cultivos</Text>
    </TouchableOpacity>
    </View>
  );
}
