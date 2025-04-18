import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Publicaciones from "./Publicaciones";
import Fotos from "./Fotos";

// constante para navegar entre pantallas
const Tab = createBottomTabNavigator();




const MainNavigation = () => {


  return(

    <Tab.Navigator
      screenOptions={{ 
        tabBarShowIcon: false,
        tabBarStyle: {
          backgroundColor: "#514484",
          borderTopWidth: 1,
          borderColor: "#000"
        }
       }}
    >


      <Tab.Screen name="Publicaciones" component={Publicaciones}></Tab.Screen>
      <Tab.Screen name="Fotos" component={Fotos}></Tab.Screen>

    </Tab.Navigator>


  )
}

export default MainNavigation;