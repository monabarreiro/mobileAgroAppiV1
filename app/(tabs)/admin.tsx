import { useRouter } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text } from 'react-native';



export default function Admin() {
  const [urlgit, setUrlgit] = useState("");
    const [mensajes, setMensajes] = useState<any[]>([]);
    const db = getFirestore();
    const [cultivo, setCultivo] = useState("");
    const [img, setImg] = useState("");
    const [listadoCultivos, setListadoCultivos] = useState<any[]>([]);
    const [enfermedad, setEnfermedad] = useState("");
    const [a, setA] = useState("");
    const [arrayImg, setArrayImg] = useState([""]);
    const [cultivo2, setCultivo2] = useState<string>("");
    const [idCultivo, setIdCultivo] = useState<string[]>([]);
    const [quimicas,setQuimicas] = useState<string[]>([""]);
    const [biologicas,setBiologicas] = useState<string[]>([""]);
    const [imgQuimicas, setImgQuimicas] =useState<string[]>([""]);
    const [imgBiologicas, setImgBiologicas] = useState<string[]>([""]);
    const [enfermedades,setEnfermedades] = useState<string[]>([]); // para definir el array
    const [seleccionarEnfermedad, setSeleccionarEnfermedad]= useState<string>("");
    const [valor, setValor] = useState<string>(""); // para definir el valor
    const [idEnfermedad, setIdEnfermedad]= useState<string[]>([]);
    const navigate = useRouter();
    const [paginaActual, setPaginaActual] = useState(1);
    const [postsPorPagina] = useState(4);// cuantos posts por pagina
    const [paginasTotales,setPaginasTotales] = useState(0);// cuantas paginas totales
    const [paginaActualCultivos,setPaginaActualCultivos] = useState(1);
    const [postsPorPaginaCultivos] = useState(2);// cuantos posts por pagina
    const [paginasTotalesCultivos,setPaginasTotalesCultivos] = useState(4);// cuantas paginas totales
    const [paginaActualEnfermedades,setPaginaActualEnfermedades] = useState(1);
    const [postsPorPaginaEnfermedades] = useState(4);// cuantos posts por pagina
    const [paginasTotalesEnfermedades,setPaginasTotalesEnfermedades] = useState(0);// cuantas paginas totales
  
   
    const urlPermalinkaUrl = () => {
      const permalink = urlgit.replace("github.com/", "raw.githubusercontent.com/").replace("/blob", "");
      alert("Convertido con éxito: " +  permalink);
     
    };
    const ModificarEnfermedad= async (id:any)=>{
      try {
        const Titulo = prompt("ingrese nombre de enfermedad ya modificada")
        const a = prompt("ingrese descripción")
        await deleteDoc(doc(db, 'bd_enfermedades_'+ seleccionarEnfermedad.toLowerCase(), id));
        const ref = collection(db, 'bd_enfermedades_'+ seleccionarEnfermedad.toLowerCase());
        await addDoc(ref, {Titulo,a});
        alert("Modificado exitosamente");
        buscarImg2();
        window.location.reload();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        alert("Error al modificar enfermedad: " + message);
      } } ;

    const ModificarCultivo= async (id:any)=>{
     
      try {
      const cultivo = prompt("ingrese nombre de cultivo")
      const img = prompt("ingrese imagen")
    
      await deleteDoc(doc(db, 'cultivos', id)); 
      const ref = collection(db, "cultivos");
      await addDoc(ref, {cultivo, img});
      alert("Modificado exitosamente");
      window.location.reload();

      
     } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      alert("Error al modificar cultivo: " + message);
     }
      
    } ;
   
    const BorrarEnfermedad= async(id:any)=>{ // selectivamente es asyncronico
      try {
        if(prompt("Si desea borrar esta enfermedad escriba si")=="si"){
          await deleteDoc(doc(db, 'bd_enfermedades_'+ seleccionarEnfermedad.toLowerCase(), id));  
          alert("borrado exitosamente");
          buscarImg2();
          window.location.reload();
        }

      } catch (error) {console.log(error); 
        
      }
    }
    const BorrarCultivo= async(cultivos:any)=>{ // selectivamente es asyncronico
      try {
        if(prompt("Si desea borrar este cultivo escriba si")=="si"){
          await deleteDoc(doc(db, 'cultivos', cultivos));  
          alert("borrado exitosamente");
          window.location.reload();
        }

      } catch (error) {console.log(error); 
        
      }
    }
    const aniadirLink = ()=>{
        setArrayImg([...arrayImg,""]);
    }
   const aniadirQuimicas = ()=>{
        setQuimicas([...quimicas,""]);
    }
    const aniadirBiologicas = ()=>{
        setBiologicas([...biologicas,""]);
    }
     const aniadirImgQuimicas = ()=>{
        setImgQuimicas([...imgQuimicas,""]);
    }
    const aniadirImgBiologicas = ()=>{
        setImgBiologicas([...imgBiologicas,""]);
    }
   
   
    useEffect(() => {
      const q = collection(db, "messages");
  
      const unsubscribe = onSnapshot (q, (snapshot) => {
        let newMessages: any[] = [];
        snapshot.forEach((doc) => {
          newMessages.push({ id: doc.id, ...doc.data() });
        });
        setPaginasTotales(Math.ceil(newMessages.length / postsPorPagina));
        setMensajes(newMessages);
      
      });
  
      return () => unsubscribe(); // Cleanup function to prevent memory leaks
    }, []);

    const indexUltimoMensaje = paginaActual * postsPorPagina;
    const indexPrimerMensaje = indexUltimoMensaje - postsPorPagina;
    const mensajesActuales = mensajes.slice(indexPrimerMensaje, indexUltimoMensaje);
    const paginate = (pageNumber:any) => setPaginaActual(pageNumber);
    const handleArray=(index:any,event:any)=>{
    const newLinks = [...arrayImg];
    newLinks[index] = event.target.value;
    setArrayImg(newLinks);

     }
    const handleArrayQuimicas=(index:any,event:any)=>{
    const newLinks = [...quimicas];
    newLinks[index] = event.target.value;
    setQuimicas(newLinks);

     }
     const handleArrayBiologicas=(index:any,event:any)=>{
    const newLinks = [...biologicas];
    newLinks[index] = event.target.value;
    setBiologicas(newLinks);

     }
    const handleArrayImgQuimicas=(index:any,event:any)=>{
    const newLinks = [...imgQuimicas];
    newLinks[index] = event.target.value;
    setImgQuimicas(newLinks);

     }
     const handleArrayImgBiologicas=(index:any,event:any)=>{
    const newLinks = [...imgBiologicas];
    newLinks[index] = event.target.value;
    setImgBiologicas(newLinks);

     }
     const removeAccents = (str: string) => {
      const accents: Record<string, string> = {
          'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u',
          'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U',
          'ñ': 'n', 'Ñ': 'N'
      };
      
      return str.split('').map((char: string) => accents[char] || char).join('');
  }

     const buscarCultivo = async () => {
      
      try {
        const temp = removeAccents('cultivos');
          const querySnapshot = await getDocs(collection(db,temp));
          
          if (!querySnapshot.empty) {
              // Aseguramos el tipo de los datos para que TypeScript reconozca la propiedad `cultivo`
              const cultivosList = querySnapshot.docs.map(d => ({
                id: d.id, 
                ...(d.data() as any)
              })) as { id: string; cultivo?: string }[];
   // console.log(cultivosList);
  // cultivosList: nos devuelve un array de cultivos
              // Verifica que cultivosList no esté vacío
              // Borrar array y pushear todas las enfermedades
             setIdCultivo([]);
                 

              setListadoCultivos([]);
              cultivosList.forEach((cultivo) => {
             
              setIdCultivo((ListaCultivos) => [...ListaCultivos,cultivo.id]);
          
              // cultivo.cultivo puede ser undefined; guardamos cadena vacía en ese caso
              setListadoCultivos((ListaCultivos) => [...ListaCultivos,cultivo.cultivo ?? ""]);
             setPaginasTotalesCultivos(Math.ceil(cultivosList.length / postsPorPaginaCultivos));
            });

             // const CultivosRef = sRef (db,'cultivos/'+ "Pirulo"); // esta harcodeado para probar funcion
      // aca tenemos que copiar el id del db de firebase.
            //  alert(CultivosRef); //no esta leyendo esta alert
              //console.log(idCultivo);
          } else {
              console.log('No se encontraron documentos en la colección $ {textoFiltrado}');
          }
      } catch (error) {
          console.error("Error al buscar documentos:", error);
      }
  };
     buscarCultivo();
     const indexUltimoCultivo = paginaActualCultivos * postsPorPaginaCultivos;
     const indexPrimerCultivo = indexUltimoCultivo - postsPorPaginaCultivos;
     const cultivosActuales = listadoCultivos.slice(indexPrimerCultivo, indexUltimoCultivo);
     const paginateCultivos = (pageNumber:any) => setPaginaActualCultivos(pageNumber);

    const crearCultivo = async (cultivo:string, img:string) => {
        const ref = collection(db, "cultivos");
        await addDoc(ref, {cultivo, img});
      
      alert("Cultivo creado con éxito");

    };

    const crearEnfermedad = async (cultivo:string, Titulo:string, a:string, arrayImg:string[], quimicas:string[], biologicas:string[], imgQuimicas:string[], imgBiologicas:string[]) => {
    const cultivoFiltrado=removeAccents(cultivo.toLowerCase());
      const concat = "bd_enfermedades_"+ cultivoFiltrado;
        const ref = collection(db, concat);
        await addDoc(ref, {Titulo,a, arrayImg,quimicas,biologicas,imgQuimicas,imgBiologicas});

      alert("Enfermedad creada con éxito");
      buscarImg2();
    };
  const buscarImg2 = async () => {
      try {
        const temp = removeAccents('bd_enfermedades_' + seleccionarEnfermedad.toLowerCase());
         
      
          const querySnapshot = await getDocs(collection(db,temp));
          
          if (!querySnapshot.empty) {
            const cultivosList = querySnapshot.docs.map(doc => ({
              id: doc.id, 
              ...(doc.data() as any)
            })) as any[];
  
              // Verifica que cultivosList no esté vacío
              // Borrar array y pushear todas las enfermedades 
              setEnfermedades([]);
              setIdEnfermedad([]);
        
              cultivosList.forEach((cultivo: any) => {
                setIdEnfermedad((id) => [...id,cultivo.id]);
                setEnfermedades((enfermedades2) => [...enfermedades2,cultivo.Titulo]);
              });
              
          } else {
              console.log('No se encontraron documentos en la colección $ {textoFiltrado}');
          }
      } catch (error) {
          console.error("Error al buscar documentos:", error);
      }
  };

  const CambioDeCultivo=(event:any)=>{
    setValor(event.target.value);

    const value = event.target.value;
    setSeleccionarEnfermedad(removeAccents(value));  

  }
  const auth = getAuth();
 

  onAuthStateChanged(auth,(user) => {
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid; // codigo id unico de usuario
      
      // ...
   if(uid !="XLoHa1Ab8lX67SEAjyN4Qe5vjCA2"){  // si el usuario no es administrador
    // access key 

    alert("No tienes permisos para acceder a esta página");
    navigate.push("/");
   }
     else {
      // User is signed out
      // ...
      
    }}
    
    });
  useEffect(() => {

    buscarImg2();
}, [seleccionarEnfermedad])
  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 50 }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', textAlign: 'center' }}>Admin</Text>

      <div className= "bg-dark">
            <h3 className="mt-4 "> Crear cultivo</h3>
          

 <table className="table table-dark">
  <thead className="thead-dark">
    <tr>
      
      <th scope="col">Nombre Cultivo</th>
      <th scope="col">Imagen</th>
      <th scope="col">Boton</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><input type="text"
                placeholder="Nombre del cultivo"
                value={cultivo}
                onChange={(e) => setCultivo(e.target.value)} >

                </input></td>
      <td> <input type="text"
                placeholder="URL de la imagen"
                value={img}
                onChange={(e) => setImg(e.target.value)} ></input></td>
      <td>   <button className="btn btn-warning"  onClick={() => crearCultivo(cultivo,img)}>
                    Crear cultivo
                </button></td>
    </tr>

  </tbody>
</table>
</div>

<h3 className="mt-5">Crear Enfermedad</h3>

<table className="table">
  <thead className="thead-dark">
    <tr>
      
      <th scope="col">Nombre Cultivo</th>
      <th scope="col">Nombre de la enfermedad</th>
      <th scope="col">Descripción de enfermedad</th>
      <th scope="col">URL de Img de Enfermedades</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>

    <tr>
     
      <td><input type="text"
                placeholder="Nombre del cultivo"
                value={cultivo2}
                onChange={(e) => setCultivo2(e.target.value)} >

                </input></td>
      <td>  <input type="text"
                placeholder="Nombre de la enfermedad"
                value={enfermedad}
                onChange={(e) => setEnfermedad(e.target.value)} >
                </input></td>

      <td>       <input type="text"
                placeholder="Descripción de enfermedad"
                value={a}
                onChange={(e) => setA(e.target.value)} ></input></td>

<td>     {arrayImg.map((link, index) => (
        <div key={index}>

          <input
            type="url"
            value={link}
            onChange={(event) => handleArray(index,event)}
            style={{marginLeft:"20px"}}
         
          />
        </div>
      ))}  </td>


    </tr>
    </tbody>  

    <th scope="col">Soluciones Químicas</th>
    <th scope="col">Soluciones Biológicas</th>
    <th scope="col">Imágenes Soluciones Químicas</th>
    <th scope="col">Imágenes Soluciones Biológicas</th>
    <th scope="col">Botones</th>
    
    <tbody>

<tr>
  

                
<td>     {quimicas.map((link, index) => (
        <div key={index}>
          <input
            type="url"
            value={link}
            onChange={(event) => handleArrayQuimicas(index,event)}
           
          />
        </div>
      ))}     </td>
      <td>     {biologicas.map((link, index) => (
        <div key={index}>
          <input
            type="url"
            value={link}
            onChange={(event) => handleArrayBiologicas(index,event)}
           
          />
        </div>
      ))}     </td>
       <td>     {imgQuimicas.map((link:any, index:any) => (
        <div key={index}>
          <input
            type="url"
            value={link}
            onChange={(event) => handleArrayImgQuimicas(index,event)}
           

          />
        </div>
      ))}     </td>
       <td>     {imgBiologicas.map((link:any, index:any) => (
        <div key={index}>
          <input
            type="url"
            value={link}
            onChange={(event) => handleArrayImgBiologicas(index,event)}
           
          />
        </div>
      ))}     </td>

<td>     <button onClick={aniadirLink}>
Añadir Fotos
</button>
 <button onClick={aniadirImgQuimicas}>
  Añadir Imágenes Sol Químicas
</button>
 <button onClick={aniadirImgBiologicas}>
  Añadir Imágenes Sol Biológicas
</button>

<button onClick={()=> crearEnfermedad(cultivo2,enfermedad,a,arrayImg, quimicas,biologicas,imgQuimicas,imgBiologicas)}>
Crear enfermedad
</button></td>
</tr>
</tbody>  


</table>



<div className="bg-dark">

      <h3 className="mt-5"> Visualizar Cultivos </h3>
      <div className= "m-4 ">

 <table className="table table-dark">
     
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre del Cultivo</th>
      <th scope="col">Modificar Cultivo</th>
      <th scope="col">Borrar Cultivo</th>
    </tr>
  </thead>

  <tbody>
    
    {cultivosActuales.map((point, index) => {
    return <tr key={index}>
      <th scope="row">{index}</th>
      <td><h2>{point.charAt(0).toUpperCase() + point.slice(1)}</h2></td>

      <td><button type="button" className="btn btn-primary" value={idCultivo[index]}
            onClick={() => {
              ModificarCultivo(idCultivo[index]);
           }
          } data-toggle="modal" data-target=".bd-edit-modal-lg" 
            >Modificar Cultivo</button></td>

      <td><button type="button" className="btn btn-success"
             data-toggle="modal" data-target=".bd-crite-modal-lg"
             value={idCultivo[index]}

             onClick={() => { BorrarCultivo(idCultivo[index]); }} 
            >Borrar</button></td>
    </tr>
            
        })
    }
    {
  paginasTotalesCultivos > 1 ? (
    <div className="pagination">
      {Array.from({ length: paginasTotalesCultivos }).map((_, index) => (
        <button key={index} onClick={() => paginateCultivos(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  ) : null
    }
  </tbody>
</table>

<select name=" " id =" " value={valor} onChange={(event) => CambioDeCultivo(event)}>
  <option value="">Todos los Cultivos</option>
  {listadoCultivos.map((cultivo, index) => (
          <option key={index} value={cultivo}>{cultivo}</option>
        ))}
</select>

 <table className="table table-dark">
     
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nombre de la Enfermedad </th>
      <th scope="col">Modificar Enfermedad </th>
      <th scope="col">Borrar Enfermedad</th>
    </tr>
  </thead>

  <tbody>
    
    {enfermedades.map((point, index) => {
            return <tr key={index}>
      <th scope="row">{index}</th>
      <td><h2>{point.charAt(0).toUpperCase() + point.slice(1)}</h2></td>

      <td><button type="button" className="btn btn-primary" 
            onClick={() => {
              ModificarEnfermedad(idEnfermedad[index]);
           }
          } data-toggle="modal" data-target=".bd-edit-modal-lg" 
            >Modificar Enfermedad </button></td>

      <td><button type="button" className="btn btn-success"
             data-toggle="modal" data-target=".bd-crite-modal-lg" 
              onClick={()=>{BorrarEnfermedad(idEnfermedad[index])}} 
            >Borrar</button></td>
    </tr>
            
        })
    }
  </tbody>
</table>

<table className="table table-dark">
<thead className="thead-dark">
    <tr>
      
      <th scope="col">Nombre</th>
      <th scope="col">mail</th>
      <th scope="col">mensaje</th>
    </tr>
  </thead>
  <tbody>
  {
  mensajesActuales.map((mensaje, index) => {
    return <tr

    key={index}>
      <td>{mensaje.name}</td>
      <td>{mensaje.email}</td>
      <td>{mensaje.message}</td>
    </tr>
  })
}
{
  paginasTotales > 1 ? (
    <div className="pagination">
      {Array.from({ length: paginasTotales }).map((_, index) => (
        <button key={index} onClick={() => paginate(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  ) : null
}
  </tbody>

</table>

        </div>
        </div>
       
    
    </ScrollView>
  );
}
