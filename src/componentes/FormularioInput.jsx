import React, { useEffect, useState } from "react";
import styled from "styled-components";


const FormularioContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 40px;
  padding: 20px;
  color: var(--cafeOscuroPrincipal);
`;

const Titulo = styled.h2`
  font-size: 1.8rem;
  color: var(--cafeOscuroPrincipal);
  text-align: center;
  margin-bottom: 20px;
`;

const Campo = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Etiqueta = styled.label`
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--cafeOscuroPrincipal);
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 12px;
`;

const SwitchLabel = styled.span`
  font-size: 1rem;
  color: var(--cafeOscuroPrincipal);
`;

const Switch = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background: ${(props) => (props.isActive ? "var(--azulPrincipal)" : "var(--cafeRosaPrincipal)")};
  border-radius: 50px;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  align-items: center;
  padding: 0 5px;

  &::before {
    content: "";
    position: absolute;
    left: ${(props) => (props.isActive ? "calc(100% - 26px)" : "4px")};
    width: 22px;
    height: 22px;
    background: var(--blancoPrincipal);
    border-radius: 50%;
    transition: left 0.3s;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const PorcentajeTexto = styled.div`
  margin-top: 10px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--azulPrincipal);
`;

const Slider = styled.input`
  width: 100%;
  margin: 10px 0;
  accent-color: var(--azulPrincipal);
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--cafeOscuroPrincipal);
  border-radius: 8px;
  outline: none;
  margin: 5px;
  color: var(--cafeOscuroPrincipal);
  background: var(--blancoPrincipal);
  &:focus {
    border-color: var(--azulPrincipal);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--cafeOscuroPrincipal);
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--cafeOscuroPrincipal);
  border-radius: 8px;
  outline: none;
  background: var(--blancoPrincipal);
  color: var(--cafeOscuroPrincipal);
  &:focus {
    border-color: var(--azulPrincipal);
  }
`;

const Boton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  color: var(--blancoPrincipal);
  background: var(--azulPrincipal);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: var(--cafeRosaPrincipal);
  }
  &:disabled {
    background: var(--cafeOscuroPrincipal);
    cursor: not-allowed;
  }
`;

const ContenedorHorizontal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



export const FormularioImagen = ({ settings, setSettings, imagenesBase, setBoolSubmit  }) => {
    const [modoResolucion, setModoResolucion] = useState("porcentaje");
    const [porcentaje, setPorcentaje] = useState(50);
    const [pixeles, setPixeles] = useState({ ancho: "", alto: "" });
    const [tiposImagen, setTiposImagen] = useState([]);
    const [calidad, setCalidad] = useState("");
  
    // Cambia el modo de resolución entre porcentaje y píxeles
    const handleSwitch = () => {
      setModoResolucion(modoResolucion === "porcentaje" ? "píxeles" : "porcentaje");
    };
  
    // Actualiza el estado de pixeles cuando se cambia un valor de ancho o alto
    const handlePixelesChange = (e, tipo) => {
      const { value } = e.target;
      if (tipo === "ancho") {
        setPixeles((prev) => ({ ...prev, ancho: value, alto: "" }));
      } else if (tipo === "alto") {
        setPixeles((prev) => ({ ...prev, alto: value, ancho: "" }));
      }
    };
  
    // Actualiza el estado de los tipos de imagen seleccionados
    const handleTiposImagenChange = (e, tipo) => {
      const { checked } = e.target;
      setTiposImagen((prev) =>
        checked ? [...prev, tipo] : prev.filter((t) => t !== tipo)
      );
    };
  
    // Actualiza el estado de calidad
    const handleCalidadChange = (e) => {
      setCalidad(e.target.value);
    };
  
    // Actualiza los settings con los valores actuales
    useEffect(() => {
      setSettings((prevSettings) => ({
        ...prevSettings,
        resolucion: modoResolucion === "porcentaje" ? porcentaje : pixeles,
        tiposImagen,
        calidad,
        modoResolucion, // Guardamos si está usando porcentaje o píxeles
      }));
    }, [modoResolucion, porcentaje, pixeles, tiposImagen, calidad, setSettings]);
  
    // Verifica si el formulario está completo y si hay imágenes
    const isFormComplete = () => {
      const hasResolution =
        modoResolucion === "porcentaje"
          ? porcentaje
          : pixeles.ancho || pixeles.alto; // Validamos si hay un valor de ancho o alto
      const hasTipoImagen = tiposImagen.length > 0;
      const hasCalidad = calidad !== "";
      const hasImagenesBase = imagenesBase.length > 0;
  
      return hasResolution && hasTipoImagen && hasCalidad && hasImagenesBase;
    };
  
    return (
      <FormularioContainer>
        <Titulo>Formulario de Configuración</Titulo>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormComplete()) {
              setSettings(settings);
              setBoolSubmit(false)
            } else {
              alert("Por favor complete todos los campos.");
            }
          }}
        >
          <Campo>
            <Etiqueta>Resolución</Etiqueta>
            <SwitchContainer>
              <SwitchLabel>Porcentaje</SwitchLabel>
              <Switch isActive={modoResolucion === "píxeles"} onClick={handleSwitch} />
              <SwitchLabel>Píxeles</SwitchLabel>
            </SwitchContainer>
            {modoResolucion === "porcentaje" ? (
              <SliderContainer>
                <Slider
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={porcentaje}
                  onChange={(e) => setPorcentaje(e.target.value)}
                />
                <PorcentajeTexto>{porcentaje}%</PorcentajeTexto>
              </SliderContainer>
            ) : (
              <ContenedorHorizontal>
                <Input
                  type="number"
                  placeholder="Ancho (px)"
                  value={pixeles.ancho}
                  onChange={(e) => handlePixelesChange(e, "ancho")}
                />
                <Input
                  type="number"
                  placeholder="Alto (px)"
                  value={pixeles.alto}
                  onChange={(e) => handlePixelesChange(e, "alto")}
                />
              </ContenedorHorizontal>
            )}
          </Campo>
  
          <Campo>
            <Etiqueta>Tipo de Imagen</Etiqueta>
            <CheckboxContainer>
              {[".jpg", ".png", ".webp"].map((tipo) => (
                <CheckboxLabel key={tipo}>
                  <Checkbox
                    type="checkbox"
                    value={tipo}
                    onChange={(e) => handleTiposImagenChange(e, tipo)}
                  />
                  {tipo}
                </CheckboxLabel>
              ))}
            </CheckboxContainer>
          </Campo>
  
          <Campo>
            <Etiqueta>Calidad de Conversión</Etiqueta>
            <Select onChange={handleCalidadChange} value={calidad}>
              <option value="" disabled>
                Seleccione una calidad
              </option>
              <option value="alta">Alta</option>
              <option value="media">Media</option>
              <option value="baja">Baja</option>
            </Select>
          </Campo>
  
          <Boton type="submit" disabled={!isFormComplete()}>
            Enviar
          </Boton>
        </form>
      </FormularioContainer>
    );
  };
  