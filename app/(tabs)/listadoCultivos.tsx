
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";



export default function ListadoCultivos() {
  const [cultivos, setCultivos] = useState<{ id: string; [key: string]: any }[]>([]);
  const router = useRouter();
    const auth = getAuth();
    useEffect(() => {
      const fetchCultivos = async () => {
        try {
            const db = getFirestore();
            const cultivosCollection = collection(db, 'cultivos');
            const cultivosSnapshot = await getDocs(cultivosCollection);
            const cultivosList = cultivosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCultivos(cultivosList);
        } catch (error) {
          console.error('Error al obtener los cultivos:', error);
        }
      };
  
      fetchCultivos();
    }, []);
    

    const refreshCultivos = (cultivo:string) => {
    
        router.push(`/listadoEnfermedades?cultivoId=${encodeURIComponent(cultivo)}&enfermedadId=1`);
    };
  return(
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Listado de Cultivos</Text>
      {cultivos.map((cultivo) => (
        <TouchableOpacity
          key={cultivo.id}
          style={{ backgroundColor: '#b6eab8ff', padding: 10, borderRadius: 5, width: '80%', alignItems: 'center' }}
          onPress={() => refreshCultivos(cultivo.cultivo)}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{cultivo.cultivo}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => router.push(`/SeleccionarCultivos`)}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Volver a la lista de cultivos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
