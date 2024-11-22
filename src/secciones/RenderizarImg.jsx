import styled from "styled-components";
import { useState, useEffect } from "react";


const procesarImagen = async (imagen, resolucion, calidad) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = URL.createObjectURL(imagen);

  await new Promise((resolve) => {
    img.onload = resolve;
  });

  let anchoFinal = img.width;
  let altoFinal = img.height;


  if (resolucion === "porcentaje" && resolucion.valor) {
    const porcentaje = resolucion.valor; 
    anchoFinal = Math.floor((img.width * porcentaje) / 100);
    altoFinal = Math.floor((img.height * porcentaje) / 100);
  } else if (resolucion === "pixeles" && resolucion.ancho && resolucion.alto) {

    const ratio = img.width / img.height;
    if (img.width > img.height) {
      anchoFinal = resolucion.ancho;
      altoFinal = Math.floor(resolucion.ancho / ratio);
    } else {
      altoFinal = resolucion.alto;
      anchoFinal = Math.floor(resolucion.alto * ratio);
    }
  }


  canvas.width = anchoFinal;
  canvas.height = altoFinal;


  ctx.drawImage(img, 0, 0, anchoFinal, altoFinal);


  const calidadConvertida = calidad === "alta" ? 0.85 : calidad === "media" ? 0.6 : 0.4;


  const imagenWebP = canvas.toDataURL("image/webp", calidadConvertida);


  const response = await fetch(imagenWebP);
  const blob = await response.blob();
  const archivoProcesado = new File([blob], imagen.name, { type: "image/webp" });

  return archivoProcesado;
};

const ContenedorCardStyled = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 20px;
  background-color: var(--blancoPrincipal);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  position: relative;

  @media (max-width: 600px) {
    width: 150px;
    height: 120px;
  }
`;

const ContenedorPrincipalCard = styled.div`
  display: flex;
  height: 100%;
  max-height: 100%;
  width: 100%;
  justify-content: center;
  background-color: brown;
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 600px) {
    gap: 5px;
  }
`;

export const RenderizarImg = ({ imagenesBase = [], settings }) => {
  const [imagenesProcesadas, setImagenesProcesadas] = useState([]);

  useEffect(() => {
    const procesarTodasLasImagenes = async () => {
      const imagenesConProcesamiento = await Promise.all(
        imagenesBase.map((img) =>
          procesarImagen(img, settings.resolucion, settings.calidad)
        )
      );
      setImagenesProcesadas(imagenesConProcesamiento);
    };

    if (imagenesBase.length > 0) {
      procesarTodasLasImagenes();
    }
  }, [imagenesBase, settings]);

  const handleDownload = (img) => {
    const url = URL.createObjectURL(img);
    const link = document.createElement("a");
    link.href = url;
    link.download = img.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ContenedorPrincipalCard>
      {imagenesProcesadas.map((img, index) => (
        <ContenedorCardStyled key={index}>
          <img
            src={URL.createObjectURL(img)}
            alt={`imagen-${index}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <button
            onClick={() => handleDownload(img)}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Descargar
          </button>
        </ContenedorCardStyled>
      ))}
    </ContenedorPrincipalCard>
  );
};
