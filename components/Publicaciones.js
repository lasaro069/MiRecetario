import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Asset } from "expo-asset";

import { useImages } from "./PhotoContext";
import ModalPublicaciones from "./Modal";


const imageProfile = Asset.fromModule(require("../assets/img/icono-usuario.png")).uri

const Publicaciones = () => {




  // crear las constantes para llamar las imagenes de perfil
  const [selectedImageProfile, setSelectedImageProfile] = useState(null);
  
  const [selectImagePost, setSelectImagePost] = useState(null);

  const { addImage } = useImages();

  // array que guardará las publicaciones 
  const [ posts, setPosts ] = useState([]);


  // Variable para definir el estado del boton '+'
  const [modalVisible, setModalVisible] = useState(false);

  // validacion cuando abierto y cuando carrado
  const openModal = () => {
    setModalVisible(true);
  }

  const closeModal = () => {
    setModalVisible(false);
  }



  
  

  // funcion para renderizar las publicaciones
  const addPost = (newPost) => {

    setPosts([...posts, newPost]);
    // condicional para la publicacion: si el usuario escribio algo o seleccionó una imagen

    if (newPost.imageUri) {
      addImage(newPost.imageUri);
    };

  }

  
  





  return (
    <>
      <View style={styles.containerPost}>

        <View style={{ width: "100%", height: "100%", paddingHorizontal: 20 }}>
          {posts.length > 0 ? (
            posts
              .slice()
              .reverse()
              .map((posts, index) => (
                /* publicacion 1 */
                <View
                  key={index}
                  style={{
                    width: "100%",
                    padding: 20,
                    backgroundColor: "#3e006e",
                    borderRadius: 15,
                    marginTop: 15,
                  }}
                >
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={{ uri: imagenFirma }}
                        style={{ width: 50, height: 50 }}
                      />
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: 10,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontWeight: "500",
                          }}
                        >
                          Luis Antonio Santos
                        </Text>
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: "500",
                          }}
                        >
                          15/01/2025
                        </Text>
                      </View>
                    </View>
                  </View>

                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontWeight: "400",
                      marginTop: 10,
                    }}
                  >
                    {posts.text}
                  </Text>
                  {posts.imageUri && (
                    <Image
                      source={{ uri: posts.imageUri }}
                      style={{
                        width: "100%",
                        height: 320,
                        backgroundColor: "#ccc",
                        borderRadius: 20,
                        marginTop: 10,
                      }}
                    />
                  )}
                </View>
              ))
          ) : (
            <View
              style={{
                width: "100%",
                height: 475,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "800" }}>
                No has reailzado ninguna publicacion
              </Text>
            </View>
          )}
          ;
        </View>
      </View>

      {/* boton para ir al modal para nueva publicacion */}
      <TouchableOpacity onPress={openModal} style={{ position: "absolute", top: 800, right: 15,  zIndex: 100, width: 50, height: 50, backgroundColor: "#ffc93c", borderRadius: 25, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: "#fff", fontSize: 20, fontWeight: 800}} >+</Text>
      </TouchableOpacity>

      <ModalPublicaciones

        selectImagePost = {selectImagePost}
        setSelectImagePost = {setSelectImagePost}
        modalVisible = {modalVisible}
        closeModal = {closeModal}
        selectedImageProfile = {selectedImageProfile}
        addPost = {addPost}
      />


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


export default Publicaciones;