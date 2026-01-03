import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

    
export default function RecuperarContraseña() {
    const [searchTerm, setSearchTerm] = useState("");
function handlePasswordRecovery() {
    
    const auth = getAuth();
    sendPasswordResetEmail(auth, searchTerm)
      .then(() => {
        alert("Correo de recuperación de contraseña enviado.");
      })
      .catch((error) => {
        alert("Error al enviar el correo de recuperación: " + error.message);
      });
  }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, marginBottom: 20 }}>Recuperar Contraseña</Text>
        <TextInput

                placeholder= "Ingrese su correo electrónico para recuperar la contraseña"
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
                    handlePasswordRecovery();
                }}
              />

            <TouchableOpacity onPress={handlePasswordRecovery}>
              <Text style={{ color: "blue", fontSize: 16 }}>Enviar</Text>
            </TouchableOpacity>
            
        </View>
    );
}




