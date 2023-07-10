import { Route, Routes } from 'react-router';
import './App.css';
import Sidebar from './Components/Sidebar';
import Pharmacies from './Pages/Pharmacies';
import Stock from './Pages/Stock';
import ERUs from './Pages/ERUs';
import Targets from './Pages/Targets';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';
import styled from 'styled-components';

export default function App() {
  return (
    <Container>
      <Sidebar />
      <Content>
        <Routes>
          <Route path="/" element={<Pharmacies />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/eru" element={<ERUs />} />
          <Route path="/targets" element={<Targets />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 150vh;
`;

const Content = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 20px;
`;