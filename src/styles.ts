import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%; // Asegura que ocupen toda la altura de la pantalla
    width: 100%;  // Asegura que ocupen todo el ancho
  }

  #root {
    height: 100%; // Asegura que el contenedor principal ocupe toda la altura
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    color: #333;
  }

  h1, h2, h3 {
    color: #ffffff;
  }
`;
