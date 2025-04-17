import React, {useState} from "react";
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { Asset } from "expo-asset";

import Profile from "./components/Profile";
import * as ImagePicker from 'expo-image-picker';

const imageProfile = Asset.fromModule(require("./assets/img/icono-imagen.png")).uri;


const App = () => {

  // crear las constantes para llamar las imagenes de perfil
  const [selectedImageBanner, setSelectedImageBanner] = useState(null);
  const [selectedImageProfile, setSelectedImageProfile] = useState(null);





  // Variable para definir el estado del boton '+'
  const [modalViseble, setModalVisible] = useState(false);

  // validacion cuando abierto y cuando carrado
  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }


  const [selectImagePost, setSelectImagePost] = useState(null);

  
  const openImagePost = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permiso Denegado');
      return;
    }

    // para cambiar la imagen del banner
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    const { uri } = pickerResult.assets[0];
    setSelectImagePost({localUri : uri });

  }

  // array que guardará las publicaciones 
  const [ posts, setPosts ] = useState([]);

  // constante que guarda lo que el usuario escriba
  const [inputText, setInputText] = useState("");

  // funcion para renderizar las publicaciones
  const addPost = () => {

    // condicional para la publicacion: si el usuario escribio algo o seleccionó una imagen
    if (inputText || selectImagePost?.localUri) {
      const newPost = { text: inputText, imageUri: selectImagePost?.localUri};

      // para que la nueva publicacion se guarde
      setPosts([...posts, newPost]);
      setInputText("");
      setSelectImagePost(null);
      setModalVisible(false);
    }
  }

  
  


  return(

    <>

        {/* view para que no se cubra la barra de herramientas */}
      <View style={{width: "100%", height: "30", backgroundColor: "black"}}>
      </View>

      <ScrollView style={{backgroundColor: "#98D9AB"}} >


        {/* view del perfil de ususario */}
        <Profile 

          selectedImageBanner={selectedImageBanner}
          setSelectedImageBanner={setSelectedImageBanner}
          selectedImageProfile={selectedImageProfile}
          setSelectedImageProfile={setSelectedImageProfile}
        />


        {/* VIEW PARA PUBLICACIONES  */}

        <View style={styles.containerPost}>

          <View style={{width: "100%", height: 50, backgroundColor: "#3e006e", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15}}>
            <View style={{backgroundColor: "#ffc93c", paddingVertical: 5, paddingHorizontal: 10, borderRadius: 50 }}>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>
                Publicaciones
              </Text>
            </View>

            <View style={{ paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20 }}>
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "800" }}>
                Fotos
              </Text>
            </View>

          </View>

          <View style={{width: "100%", height: "100%", paddingHorizontal: 20 }}>

            {posts.length > 0 ?(

              posts.slice().reverse().map((posts, index) => (

                /* publicacion 1 */
                <View key={index} style={{width: "100%", padding: 20, backgroundColor: "#3e006e", borderRadius: 15, marginTop: 15 }}>
                  <View>
                    <View style={{flexDirection: "row"}}>
                      <Image source={{uri: imagenFirma}} style={{width: 50, height: 50 }} /> 
                      <View style={{flexDirection: "column", justifyContent: "center", marginLeft: 10}}>
                        <Text style={{color: "#fff", fontSize: 16, fontWeight: "500"}}>
                          Luis Antonio Santos
                        </Text>
                        <Text style={{color: "#fff", fontSize: 13, fontWeight: "500"}}>
                          15/01/2025
                        </Text>
                      </View>
                    </View>

                  </View>

                  <Text style={{color: "#fff", fontSize: 16, fontWeight: "400", marginTop: 10}}>
                      {posts.text}
                  </Text>
                  {posts.imageUri && <Image source={{uri: posts.imageUri }} style={{width: "100%", height: 320, backgroundColor: "#ccc", borderRadius: 20, marginTop: 10 }} />}


                </View>

              ))) : (

                <View style={{width: "100%", height: 475, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                  <Text style={{color: "#fff", fontSize: 18, fontWeight: "800"}} >
                    No has reailzado ninguna publicacion
                  </Text>
                </View>

              )};

            




          </View>


        </View>


      </ScrollView>

      {/* // Modal para agregar una publicacion al blog */}



    </>
  );
};


// Podemos crear una 'hola de estilos, importando 'StyleSheet'
const styles = StyleSheet.create ({


  // ESTILOS PARA PUBLICACIONES
  containerPost:{
    flex: 1,
    backgroundColor: "#98D9AB",
  },

})


export default App;