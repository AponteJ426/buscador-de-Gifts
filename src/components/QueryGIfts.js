import React, { useState, useEffect } from "react";
import RenderImg from "../components/renderImg";

import "animate.css";

const QueryGifts = ({ category }) => {
  let withoutParam = null;
  category === "" ? (withoutParam = true) : (withoutParam = false);

  const [meetData, setmeetData] = useState(true);
  const [loading, setloading] = useState(true);

  const [images, setimages] = useState([]);

  useEffect(() => {
    const SerchApi = async () => {
      const ApiKey = process.env.REACT_APP_API_KEY;
      const url = `
            https://api.giphy.com/v1/gifs/search?api_key=${encodeURI(ApiKey)}&q=
            ${encodeURI(category)}
            &limit=18&lang=en`;
      const resp = await fetch(url);
      const { data } = await resp.json();
      const imagesGifts = data.map((img) => ({
        id: img.id,
        url: img.images.downsized_medium.url,
        alt: img.title,
      }));

      setimages(imagesGifts);
      setloading(true);
      if (data.length === 0) {
        setmeetData(true);
      } else {
        setmeetData(false);
      }
    };
    SerchApi();

    setTimeout(() => {
      setloading(false);
    }, 3000);
  }, [category]);

  return (
    <div>
      {withoutParam ? (
        <h2 className="animate__animated animate__fadeInDown animate__fast ">
          Porfavor Ingresa Una Busqueda
        </h2>
      ) : meetData ? (
        <div className="animate__animated animate__fadeIn animate__slower	1s">
          <h2>
            {'Lo sentimos no encontramos relaciones con "' + category + '"'}
          </h2>
          <h3>Puedes Buscar Otro Gift</h3>
        </div>
      ) : loading ? (
        <h2 className="animate__animated animate__flash animate__slower	3s animate__repeat-2	2">
          {"Buscando Relaciones Con " + category + " ..."}
        </h2>
      ) : (
        <div className="card-grid ">
          {images.map((img) => (
            <RenderImg key={img.id} props={img} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QueryGifts;
