
import react, { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const imageProvider = ({children}) => {

  const [ images, setImages] = useState([]);

  const addImage = (newImage) => {

    setImages([...images, newImage])
  }


  
  return(

    <ImageContext.Provider value={{image, addImage}}>

      {children};
    </ImageContext.Provider>


  )
};

export const useImages = () => useContext(ImageContext)