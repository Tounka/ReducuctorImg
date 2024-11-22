import styled from "styled-components";

const HeaderStyled = styled.div`
    width: 100%;
    height: 80px;
    position: fixed;
    top: 0;
    left:0;

    background-color: var(--blancoPrincipal);
    font-size: 22px;
    color: black;

    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    text-align: center;

    @media (max-width: 500px) {
        font-size: 18px;
    }

    -webkit-box-shadow: 0px 10px 8px -6px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 10px 8px -6px rgba(0,0,0,0.75);
    box-shadow: 0px 10px 8px -6px rgba(0,0,0,0.75);

`

export const Header = () => {
    return(
        <HeaderStyled>
            Compresor de Imagenes
        </HeaderStyled>
    )
}