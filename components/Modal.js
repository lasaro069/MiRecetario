import React, {useState} from "react";
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { Asset } from "expo-asset";

import * as ImagePicker from 'expo-image-picker';

const imageProfile = Asset.fromModule(require("../assets/img/icono-imagen.png")).uri;
const leftBack = Asset.fromModule(require("../assets/img/left-arrow.png")).uri;


const Modal = ({ selectImagePost, setSelectImagePost, modalViseble, closeModal, selectedImageProfile, addPost }) => {




  // constante que guarda lo que el usuario escriba
  const [inputText, setInputText] = useState("");

  
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



  // funcion para renderizar las publicaciones
  const handleAddPost = () => {

    // condicional para la publicacion: si el usuario escribio algo o seleccionó una imagen
    if (inputText || selectImagePost?.localUri) {
      const newPost = { text: inputText, imageUri: selectImagePost?.localUri};

      // para que la nueva publicacion se guarde
      addPost(newPost);
      setInputText("");
      setSelectImagePost(null);
      setModalVisible(false);
    }
  }

  



  return (
    <Modal
      animationType="slide"
      visible={modalViseble}
      onRequestClose={closeModal}
    >
      <View style={{ flex: 1, backgroundColor: "#98D9AB" }}>
        {/* boton regresar, atrás */}
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: "#fff",
            padding: 15,
          }}
        >
          <TouchableOpacity
            onPress={closeModal}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Image
              source={{ uri: leftBack }}
              style={{ width: 30, height: 30 }}
            />
            <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
              Cerrar
            </Text>
          </TouchableOpacity>
        </View>

        {/* publicación - perfil */}
        <View style={{ flexDirection: "row", padding: 25, gap: 15 }}>
          <Image
            source={{
              uri:
                selectedImageProfile !== null
                  ? selectedImageProfile.localUri
                  : imageProfile,
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 100,
              borderWidth: 5,
              borderColor: "#514484",
            }}
          />
          <Text style={styles.textNameUser}>Luis Santos</Text>
        </View>

        {/* publicacion - insertar información */}
        <View style={{ paddingHorizontal: 25, gap: 10 }}>
          <TextInput
            placeholder="¿Qué estás pensando hoy?"
            placeholderTextColor={"#fff"}
            multiline={true}
            style={{ color: "#fff" }}
            value={inputText}
            onChangeText={setInputText}
          />

          {/* condicional para que omitir el espacio de la imagen si no se inserta imagen */}
          {selectImagePost?.localUri && (
            <Image
              source={{ uri: selectImagePost?.localUri }}
              style={{ width: "100%", height: 400 }}
            />
          )}
        </View>

        {/* publicacion - boton para seleccionar imagen */}
        <TouchableOpacity
          onPress={openImagePost}
          style={{
            width: 250,
            backgroundColor: "#ffc93c",
            padding: 10,
            borderRadius: 125,
            marginHorizontal: 80,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
            Selecciona una imagen
          </Text>
        </TouchableOpacity>

        {/* boton para publicar la informacion */}
        <TouchableOpacity
          onPress={handleAddPost}
          style={{
            width: 250,
            backgroundColor: "#ffc93c",
            padding: 10,
            borderRadius: 125,
            marginHorizontal: 80,
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>
            Publicar
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({


});

export default Modal;