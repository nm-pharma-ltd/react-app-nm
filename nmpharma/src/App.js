import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './Components/Sidebar';
import Pharmacies from './Pages/Pharmacies';
import Stock from './Pages/Stock';
import ERUs from './Pages/ERUs';
import Targets from './Pages/Targets';
import Notifications from './Pages/Notifications';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import styled from 'styled-components';
import Register from './Pages/Register';
import ProductDetails from './Pages/ProductDetails';
import ClientDetails from './Pages/ClientsDetails';
import SingleProductDetails from './Pages/SingleProductDetails';
import { SinglePharmacyDetails } from './Pages/SinglePharmacyDetails';
import TeamDetails from './Pages/TeamDetails';
import ForecastSingleProduct from './Pages/ForecastSingleProduct';
import Supplier from './Pages/Supplier';


export default function App() {

  const location = useLocation();

  // Determine if the current location is the login or registration page
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  return (
    <Container>
      {!isAuthPage && <Sidebar />}
      <ContentWrapper>
        <Gradient />
        {isAuthPage ? (
          <>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Routes>
          </>
        ) : (
          <Content>
            <Routes>
              <Route path="/" element={<Pharmacies />} />
              <Route path="/pharmacies" element={<Pharmacies />} />


              <Route path="/pharmacies/productdetails" element={<ProductDetails/>} />
              <Route path="/pharmacies/clientdetails" element={<ClientDetails/>} />
              <Route path="/pharmacies/product1" element={<SingleProductDetails/>} />
              <Route path="/pharmacies/pharmacy1" element={<SinglePharmacyDetails/>} />


              <Route path="/stock" element={<Stock />} />

              <Route path="/stock/supplier" element={<Supplier/>} />

              <Route path="/stock/forecastdetails/" element={<ForecastSingleProduct/>} />
              

              <Route path="/eru" element={<ERUs />} />


              <Route path="/targets" element={<Targets />} />
              <Route path="/targets/teamdetails/:id" element={<TeamDetails />} />



              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />

            </Routes>
          </Content>
        )}
      </ContentWrapper>
    </Container>
  );
}

// Rest of the code...

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
  background: linear-gradient(180deg, rgb(225 106 50 / 35%) 35%, rgb(229 229 229) 100%, rgb(229 229 229) 50%);
`;

const Content = styled.div`
  margin-left: 270px;
  margin-top: 20px;
  /* Add other styling for the content here */
`;
