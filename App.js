import React, {useState} from "react";
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { Asset } from "expo-asset";

import Profile from "./components/Profile";
import * as ImagePicker from 'expo-image-picker';

const imageProfile = Asset.fromModule(require("./assets/img/icono-imagen.png")).uri;
const imagenFirma = Asset.fromModule(require("./assets/img/fotofirma2.png")).uri;
const leftBack = Asset.fromModule(require("./assets/img/left-arrow.png")).uri;


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

      {/* boton para ir al modal para nueva publicacion */}
      <TouchableOpacity onPress={openModal} style={{ position: "absolute", top: 800, right: 15,  zIndex: 100, width: 50, height: 50, backgroundColor: "#ffc93c", borderRadius: 25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#fff", fontSize: 20, fontWeight: 800}} >+</Text>
      </TouchableOpacity>

      {/* // Modal para agregar una publicacion al blog */}
      <Modal animationType="slide" visible={modalViseble} onRequestClose={ closeModal } >
        <View style={{flex: 1, backgroundColor: "#98D9AB"}} >

          {/* boton regresar, atrás */}
          <View style={{ borderBottomWidth: 2, borderBottomColor: "#fff", padding: 15 }}>
            <TouchableOpacity onPress={closeModal} style={{flexDirection: "row", alignItems: "center", gap: 10 }} >
              <Image source={{ uri: leftBack }} style={{ width: 30, height: 30 }} /> 
              <Text style={{ color: "#fff",fontSize: 20, fontWeight: "800" }}>Cerrar</Text>
            </TouchableOpacity>
          </View>

          {/* publicación - perfil */}
          <View style={{ flexDirection: "row", padding: 25, gap: 15 }}>
            <Image source={{uri: selectedImageProfile !== null ? selectedImageProfile.localUri : imageProfile}} style={{ width: 80, height: 80, borderRadius: 100, borderWidth: 5, borderColor: "#514484" }} />
            <Text style={styles.textNameUser} >
              Luis Santos
            </Text>
          </View>

          {/* publicacion - insertar información */}
          <View style={{ paddingHorizontal: 25, gap: 10 }}>
            <TextInput placeholder="¿Qué estás pensando hoy?" placeholderTextColor={"#fff"} multiline={true} style={{color: "#fff"}} value={inputText} onChangeText={setInputText} />

            {/* condicional para que omitir el espacio de la imagen si no se inserta imagen */}
            { selectImagePost?.localUri && (
              <Image source={{uri: selectImagePost?.localUri}} style={{ width: "100%", height: 400 }} />

            )}

          </View>

          {/* publicacion - boton para seleccionar imagen */}
          <TouchableOpacity onPress={ openImagePost } style={{ width: 250, backgroundColor: "#ffc93c", padding: 10, borderRadius: 125, marginHorizontal: 80, marginTop: 20, flexDirection: "row", justifyContent: "center" }} >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }} >Selecciona una imagen</Text>
          </TouchableOpacity>

          {/* boton para publicar la informacion */}
          <TouchableOpacity onPress={addPost} style={{ width: 250, backgroundColor: "#ffc93c", padding: 10, borderRadius: 125, marginHorizontal: 80, marginTop: 20, flexDirection: "row", justifyContent: "center" }} >
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }} >Publicar</Text>
          </TouchableOpacity>


        </View>

      </Modal>



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