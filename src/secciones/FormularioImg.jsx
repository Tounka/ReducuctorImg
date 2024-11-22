import styled from "styled-components";
import { ContenedorImg, DisplayPrincipal, ContenedorInputImg } from "../componentes/Displays";
import { InputImg } from "../componentes/InputImg";
import { FormularioImagen } from "../componentes/FormularioInput";

export const FormularioImg = ({ imagenesBase, setImagenesBase, setSettings, settings, setBoolSubmit }) => {
    return (
      <DisplayPrincipal>
        <ContenedorInputImg>
          <ContenedorImg imagenes={imagenesBase} />
          <InputImg imagenesBase={imagenesBase} setImagenesBase={setImagenesBase} />
        </ContenedorInputImg>
        <FormularioImagen
          imagenesBase={imagenesBase}
          settings={settings}
          setSettings={setSettings}
          setBoolSubmit={setBoolSubmit}

        />
      </DisplayPrincipal>
    );
  };