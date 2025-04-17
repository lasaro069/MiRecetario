import React, {useState} from "react";
import {ScrollView, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";

import { ImageProvider  } from "./components/PhotoContext";

import Profile from "./components/Profile";
import MainNavigation from "./components/MainNavigation"
;
const imageProfile = Asset.fromModule(require("./assets/img/icono-imagen.png")).uri;


const App = () => {

  // crear las constantes para llamar las imagenes de perfil
  const [selectedImageBanner, setSelectedImageBanner] = useState(null);
  const [selectedImageProfile, setSelectedImageProfile] = useState(null);






  return(


      <ImageProvider>

        <NavigationContainer>


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

          <View  style={{ width: "100%", height: 520 }} >

            <MainNavigation />

          </View>




        </ScrollView>


        </NavigationContainer>

        {/* // Modal para agregar una publicacion al blog */}

      </ImageProvider>


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