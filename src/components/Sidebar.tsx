import styled from 'styled-components';

// Styled component para la barra lateral
const SidebarWrapper = styled.div`
  width: 300px;
  background-color: #282c34;
  color: white;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const DeviceItem = styled.div`
  background: #3a3f47;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #505a67;
  }
`;

const Sidebar = ({ gpsData }: { gpsData: any[] }) => {
    return (
        <SidebarWrapper>
            <h2>Dispositivos GPS</h2>
            {gpsData.map((data) => (
                <DeviceItem key={data.device_id}>
                    <h3>Dispositivo {data.device_id}</h3>
                    <p><strong>Latitud:</strong> {data.latitude}</p>
                    <p><strong>Longitud:</strong> {data.longitude}</p>
                    <p><strong>Velocidad:</strong> {data.speed} km/h</p>
                </DeviceItem>
            ))}
        </SidebarWrapper>
    );
};

export default Sidebar;
