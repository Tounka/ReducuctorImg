import styled from 'styled-components';
import './App.css';

import { Footer } from './componentes/Footer';
import { Header } from './componentes/Header';
import { FormularioImg } from './secciones/FormularioImg';
import { useState } from 'react';
import { RenderizarImg } from './secciones/RenderizarImg';
const DisplayPrincipal = styled.div`
  display: grid;
  grid-template-rows:  calc(100dvh - 80px) 80px;
  margin-top: 80px;
`
function App() {
  const [imagenesBase, setImagenesBase] = useState([]);
  const [settings, setSettings] = useState({
    resolucion: 0,  
    tiposImagen: [],
    calidad: "",
  });
  const [boolSubmit, setBoolSubmit] =useState(true);
  return (
    <DisplayPrincipal className="App">
      <Header />
      {boolSubmit ?
            <FormularioImg     
            imagenesBase={imagenesBase} 
            setImagenesBase={setImagenesBase} 
            settings={settings} 
            setSettings={setSettings}
            setBoolSubmit={setBoolSubmit}  />
      :
      <RenderizarImg imagenesBase={imagenesBase} settings={settings}  />
      }

      <Footer />
    </DisplayPrincipal>
  );
}

export default App;
