import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { GlobalStyles } from './GlobalStyles';
import Sidebar from './Components/Sidebar';
import Pharmacies from './Pages/Pharmacies';
import Stock from './Pages/Stock';
import ERUs from './Pages/ERUs';
import Targets from './Pages/Targets';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import styled, { ThemeProvider } from 'styled-components';
import Register from './Pages/Register';
import ProductDetails from './Pages/ProductDetails';
import ClientDetails from './Pages/ClientsDetails';
import SingleProductDetails from './Pages/SingleProductDetails';
import { SinglePharmacyDetails } from './Pages/SinglePharmacyDetails';
import TeamDetails from './Pages/TeamDetails';
import ForecastSingleProduct from './Pages/ForecastSingleProduct';
import Supplier from './Pages/Supplier';
import { useContext, useState } from 'react';
import PrivateRoute from './providers/PrivateRoute';
import { Context } from './providers/provider';
import { darkTheme, lightTheme } from './providers/themes';

export default function App() {
  const location = useLocation();
  const [store, dispatch] = useContext(Context)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  // This function will check if the user is authenticated.
  const isAuthenticated = () => {
    const token = store.user.token;
    return token !== null && token !== '';
  };

  if (!isAuthenticated() && !isAuthPage) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <Container>
      {!isAuthPage && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <ContentWrapper>
        <Gradient />
        <Content open={isSidebarOpen && !isAuthPage}>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/pharmacies/productdetails" element={<ProductDetails />} />
              <Route path="/pharmacies/clientdetails" element={<ClientDetails />} />
              <Route path="/pharmacies/products/:productCode" element={<SingleProductDetails />} />
              <Route path="/pharmacies/pharmacy1" element={<SinglePharmacyDetails />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/stock/supplier" element={<Supplier />} />
              <Route path="/stock/:id" element={<ForecastSingleProduct />} />
              <Route path="/eru" element={<ERUs />} />
              <Route path="/targets" element={<Targets />} />
              <Route path="/targets/teamdetails/:id" element={<TeamDetails/>} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Content>
      </ContentWrapper>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  //min-height: 150vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  z-index: -50;
  background: ${props => props.theme.gradient || 'linear-gradient(180deg, rgb(225 106 50 / 35%) 35%, rgb(229 229 229) 100%, rgb(229 229 229) 50%)'};
`;


const Content = styled.div`
  margin-left: ${props => (props.open ? '270px' : '20px')};
  margin-top: 20px;
  transition: margin-left 0.3s;
`;