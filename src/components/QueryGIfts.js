import React, { useState, useEffect } from "react";
import RenderImg from "../components/renderImg";

const QueryGifts = ({ category }) => {
  const ApiKey = process.env.REACT_APP_API_KEY;

  let withoutParam = 0;

  if (category == "") {
    withoutParam = true;
  }
 const [meetData, setmeetData] = useState(true);
 const [loading, setloading] = useState(true);
 
  const [images, setimages] = useState([]);
  

  useEffect(() => {
    const SerchApi = async () => {
      const url = `
            https://api.giphy.com/v1/gifs/search?api_key=${encodeURI(ApiKey)}&q=
            ${encodeURI(category)}
            &limit=12&lang=en`;
      const resp = await fetch(url);
      const { data } = await resp.json();
      const imagesGifts = data.map((img) => ({
        id: img.id,
        url: img.images.downsized_medium.url,
      }));
      setimages(imagesGifts);
      setloading(true);
      if (data.length==0) {
        setmeetData(true)
      }else{setmeetData(false)}
      
    };
    SerchApi();



    if (category != "") {
      withoutParam = false;
      setTimeout(() => {
        setloading(false);
      }, 3000);
    }
  }, [category]);

  return (
    <div>
      {withoutParam ? (

        <h2>Porfavor Ingresa Una Busqueda</h2>

      ) :meetData?(
        <>
      <h2>{'Lo sentimos no encontramos relaciones con "'+category+'"'}</h2>
      <h3>Puedes Buscar Otro Gift</h3>
        </>
      ):loading ? (

        <h2>{"Buscando Relaciones Con " + category + " ..."}</h2>

      ) : (
          <div className="card-grid">
          {images.map((img) => (
            <RenderImg key={img.id} props={img} />
          ))}
         </div>
      ) }
    
    </div>
  );
};

export default QueryGifts;
