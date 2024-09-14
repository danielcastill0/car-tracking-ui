import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import axios from 'axios';
import { GlobalStyle } from './styles'; // Importa los estilos globales

// Styled component para el layout principal
const Layout = styled.div`
  display: flex;
  height: 100vh; // Asegura que ocupe toda la altura de la ventana
`;

const App = () => {
  const [gpsData, setGpsData] = useState<any[]>([]);

  // Simulación de la recepción de datos GPS en tiempo real
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<any[]>('http://localhost:3000/gps-data'); // Cambia la URL a tu endpoint real
        setGpsData(response.data);
      } catch (error) {
        console.error('Error fetching GPS data', error);
      }
    };

    const interval = setInterval(fetchData, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <GlobalStyle /> {/* Estilos globales aplicados */}
      <Layout>
        <Sidebar gpsData={gpsData} />
        <MapView gpsData={gpsData} />
      </Layout>
    </>
  );
};

export default App;
