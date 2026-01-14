import { Image, View } from "react-native";


export default function Footer() {
  return (
    <View style={{ backgroundColor: "#27352F", justifyContent: "space-around", flexDirection: "row", paddingVertical: 10, borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, position: 'absolute', bottom: 0, width: '100%'}}>

  {/* Aquí puedes agregar el contenido del footer */}
  <Image  style={{ width: 30, height:30 }} source={require('./img/casita.png')}/> 
  <Image  style={{ width: 30, height: 30 }} source={require('./img/camara.png')}/>
  <Image  style={{ width: 30, height: 30 }} source={require('./img/ajustes.png')}/> 

    </View>


  
  );
}
