import React, { useState } from 'react';
import styled from 'styled-components';

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 300px;
  border: 2px dashed #3C91E6; /* Color de borde azul */
  background-color: #FFE8D1; /* Fondo claro */
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  @media (max-width: 600px) {
    height: 150px;
    width: 200px;
  }
  &:hover {
    background-color: #f7f7f7;
  }
`;
const ContenedorIcono = styled.div`
  display: flex;
  justify-content: center;
`
const InputFile = styled.input`
  display: none; /* Ocultar el input real */
`;

const ContenedorCardStyled = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 20px;
  background-color: var(--blancoPrincipal);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

export const InputImg = ({ imagenesBase, setImagenesBase }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const newImagenesBase = [...imagenesBase, ...newFiles];
    setImagenesBase(newImagenesBase);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const newFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const newImagenesBase = [...imagenesBase, ...newFiles];
    setImagenesBase(newImagenesBase);
  };

  const handleClickInput = () => {
    document.getElementById('fileInput').click(); // Abre el selector de archivos al hacer clic
  };

  return (
    <ContenedorIcono>
      <Contenedor onDrop={handleDrop} onDragOver={handleDragOver} onClick={handleClickInput}>
        <h3>Arrastra o haz clic para seleccionar una imagen</h3>
        <InputFile
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
      </Contenedor>



    </ContenedorIcono>
  );
};
