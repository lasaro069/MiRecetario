
import React, { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const ImageProvider = ({children}) => {

  const [ images, setImages] = useState([]);

  const addImage = (newImage) => {

    setImages([...images, newImage])
  }


  
  return(

    <ImageContext.Provider value={{images, addImage}}>

      {children};
    </ImageContext.Provider>


  )
};

export const useImages = () => useContext(ImageContext)