import React from "react";
import {ScrollView, View, Text, StyleSheet, Image } from "react-native";
import imageLogo from "./assets/img/log-klazia.png";
import { Asset } from "expo-asset";

const imageLogoKlazia = Asset.fromModule(require("./assets/img/log-klazia.png")).uri;
const imagenSala = Asset.fromModule(require("./assets/img/sala.jpg")).uri;
const App = () => {
  return(
    <View style={styles.containerPrincipal}>
      <View style={styles.container1}>
        <View style={styles.containerImagen}>
          <Image source={{uri: imagenSala}} style={styles.imagenSala} />

        </View>
        <View style={styles.containerTexto}>
          <Text style={styles.textoNombre} > Luis Antonio Santos </Text>
          <Text style={{color: "#fff", fontSize: 12}}> Suboficial Primero </Text>
            

        </View>

      </View>
      <View style={styles.container2}>

      </View>
      
      <View style={styles.container3}>

      </View>
      
    </View>
  );
};


// Podemos crear una 'hola de estilos, importando 'StyleSheet'
const styles = StyleSheet.create ({
  containerPrincipal: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 5,
  },
  
  container1: {
    flex: 2,
    backgroundColor: "#080d58",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "95%",
  },

  containerImagen: {
    flex: 3,
    backgroundColor: "#080d58",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: "100%",

  },

  containerTexto: {
    flex: 1,
    backgroundColor: "#080d58",
    alignItems: "flex-start",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",

  },

  textoNombre: {
    color: "#fff", 
    fontSize: 20, 
    fontWeight: "bold",
  },

  imagenSala: {
    width: "100%",
    height: "100%",
  },
  
  container2: {
    flex: 0.5,
    backgroundColor: "#101783",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
  },

  container3: {
    flex: 5,
    backgroundColor: "#080d58",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
  },
    
})


export default App;