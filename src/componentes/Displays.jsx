import styled from "styled-components";

export const DisplayPrincipal = styled.div`
  height: 100vh; 
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr; 
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; 
    grid-template-rows: auto 1fr; 
  }
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

export const ContenedorImg = ({ imagenes }) => {
  return ( 
    <ContenedorPrincipalCard>
      {imagenes.map((img, index) => (
        <ContenedorCardStyled key={index}>
          <img
            src={URL.createObjectURL(img)}
            alt={`imagen-${index}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        </ContenedorCardStyled>
      ))}
    </ContenedorPrincipalCard>
  );
};

export const ContenedorInputImg = styled.div`
  display: grid;
  grid-template-rows: 600px 200px; 
  width: 100%;
  height: 100%;
  padding: 10px;
  gap: 10px;
  border-right: solid 2px var(--blancoPrincipal);

  @media (max-width: 768px) {
    border-right: none; 
    border-bottom: solid 2px var(--blancoPrincipal); 
    grid-template-rows: 600px auto; 
  }

  @media (max-width: 600px) {
    grid-template-rows: 500px auto; 
    gap: 5px; 
  }
`;
