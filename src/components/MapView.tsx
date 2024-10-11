import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components';
import 'leaflet/dist/leaflet.css';
import L, { LatLngBoundsExpression, LatLngExpression } from 'leaflet';

// Importa el ícono personalizado de carro
import carIconImg from '../assets/car-icon.png';

const carIcon = L.icon({
    iconUrl: carIconImg,
    iconSize: [40, 40], // Tamaño del ícono
    iconAnchor: [20, 20], // Punto de anclaje del ícono
    popupAnchor: [0, -20] // Punto desde donde el popup se abrirá respecto al ícono
});

const MapWrapper = styled.div`
  flex: 1;
  height: 100vh; // Asegura que ocupe toda la altura de la ventana
  width: 100%;   // Asegura que ocupe todo el ancho
  position: relative;
`;

const UpdateMapBounds = ({ gpsData }: { gpsData: any[] }) => {
    const map = useMap();

    useEffect(() => {
        if (gpsData.length > 0) {
            const bounds = gpsData.map((data) => [data.latitude, data.longitude]);

            console.log('Bounds:', bounds); // Depuración: Verifica los límites calculados

            map.fitBounds(bounds as LatLngBoundsExpression, {
                padding: [50, 50], // Ajusta el padding si es necesario
                maxZoom: 15, // Ajusta el zoom máximo si es necesario
            });

            console.log('Map bounds adjusted.');
        }
    }, [gpsData, map]);

    return null;
};

const MapView = ({ gpsData }: { gpsData: any[] }) => {
    const defaultPosition = [51.505, -0.09]; // Coordenadas iniciales

    return (
        <MapWrapper>
            <MapContainer
                center={defaultPosition as LatLngExpression}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                />

                {gpsData.map((data) => (
                    <Marker
                        key={data.device_id}
                        position={[data.latitude, data.longitude]}
                        icon={carIcon} // Usa el ícono de carro en lugar del ícono por defecto
                    >
                        <Popup>
                            <div>
                                <strong>ID:</strong> {data.device_id} <br />
                                <strong>Latitud:</strong> {data.latitude} <br />
                                <strong>Longitud:</strong> {data.longitude} <br />
                                <strong>Altitud:</strong> {data.altitude}m <br />
                                <strong>Velocidad:</strong> {data.speed} km/h <br />
                                <strong>Dirección:</strong> {data.heading}° <br />
                                <strong>Hora:</strong> {new Date(data.timestamp).toLocaleString()} <br />
                            </div>
                        </Popup>
                    </Marker>
                ))}

                <UpdateMapBounds gpsData={gpsData} /> {/* Componente para ajustar el foco */}
            </MapContainer>
        </MapWrapper>
    );
};

export default MapView;
