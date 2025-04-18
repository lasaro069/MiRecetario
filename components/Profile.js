import React  from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Asset } from "expo-asset";

import {useImages} from "./PhotoContext";

import * as ImagePicker from 'expo-image-picker';

const imageBanner = Asset.fromModule(require("../assets/img/icono-imagen.png")).uri;
const imageProfile = Asset.fromModule(require("../assets/img/icono-usuario.png")).uri;



const Profile = ({selectedImageBanner, setSelectedImageBanner}) => {

  const { selectedImageProfile, updateSelectedImageProfile } = useImages();

  // Funcion para acceder a la galería y cámara del dispositivo desde la imagen del banner
  const openImageBanner = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permiso Denegado');
      return;
    }

    // para cambiar la imagen del banner
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled ) {
      
    }
    const { uri } = pickerResult.assets[0];
    setSelectedImageBanner({ localUri: uri });


  }

  // funcion para acceder a la galeria desde la foto de perfil
  const openImageProfile = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permiso Denegado');
      return;
    }
    
    // para cambiar la imagen delperfil
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.canceled) {
      
    }
    
    const { uri } = pickerResult.assets[0];
    updateSelectedImageProfile( uri );
    
  }
  




  return(

        <View style={styles.containerProfile}>

          {/* Boton para cambiar la imagen de fondo */}
          <TouchableOpacity onPress={openImageBanner} style={styles.containerUserBanner}>
            <Image source={{uri: selectedImageBanner !== null ? selectedImageBanner.localUri : imageBanner }} style={ styles.imageBanner } />

          </TouchableOpacity>
          
          {/* informació del usuario */}
          <View style={styles.containerInfoUser}>
            <Text style={styles.textNameUser}>Luis Antonio Santos</Text>
            <Text style={styles.textProfessionUser}>Mis Recetas Preferidas</Text>
          </View>

          {/* Boton para cambiar la imagen de perfil */}
          <TouchableOpacity onPress={openImageProfile} style={styles.containerUserProfile}>
            <Image source={{uri: selectedImageProfile !== null ? selectedImageProfile : imageProfile}} style={styles.imageProfile} />
          </TouchableOpacity>
        </View>

  )

};



// Podemos crear una 'hola de estilos, importando 'StyleSheet'
const styles = StyleSheet.create ({

  // ESTILOS PARA EL PERFIL DE USUARIO
  containerProfile: {
    width: "100%",
    height: 320,
    backgroundColor: "#98D9AB"
  },

  imageBanner: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  containerUserBanner: {
    height: 220,
    width: "100%",
    backgroundColor: "#ccc"
  },

  containerInfoUser: {
    padding: 15,
  },

  textNameUser: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  textProfessionUser: {
    fontSize: 12,
    fontWeight: "200",
    color: "#fff",
  
  },

  containerUserProfile: {
    width: 131,
    height: 131,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#514484",
    position: "absolute",
    top: 150,
    right: 25,
  },

  imageProfile: {
    width: "100%",
    height: "100%",
    borderRadius: 100
  },

})



export default Profile;