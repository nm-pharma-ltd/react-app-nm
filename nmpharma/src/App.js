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
import { useContext, useState, useEffect } from 'react';
import PrivateRoute from './providers/PrivateRoute';
import { Context, SIGNEDUSER, PRODUCTS, CLIENTS } from './providers/provider';
import ApiService from "./api/ApiService";

export default function App() {
  const location = useLocation();
  const [store, dispatch] = useContext(Context)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(true);


  // PRODUCTS DATA FETCHING
  async function fetchData() {
    try {
      setIsLoadingProducts(true);
      const productsData = await ApiService.get("products/sales/2023/8", {"Authorization": "Bearer " + store.user.token });

      // Ensure data is sorted by rank
      const sortedData = productsData.sort((a, b) => a.rank - b.rank);

      const processedData = sortedData.map((product, index) => ({
        ...product,
        rank: index + 1,
        soldTarget: `${product.quantitySold} / ${product.quantityTarget}`,
        monthlyProfit: parseFloat(product.monthlyProfit).toFixed(0),
      }));

      dispatch({ type: PRODUCTS, payload: { processedData } });
          
      setIsLoadingProducts(false);

    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoadingProducts(false);
    }
  }


  //CLIENTS DATA FETCHING
  async function fetchPharmacyData() {
    try {
      setIsLoadingPharmacies(true);
      const fetchedData = await ApiService.get("clients/sales/2023/8", {"Authorization": "Bearer " + store.user.token });

      const sortedPharmacies = fetchedData.sort(
        (a, b) => b.monthlySale - a.monthlySale
      );

      const processedPharmacies = sortedPharmacies.map((pharmacy, index) => ({
        rank: index + 1,
        clientName: pharmacy.clientName,
        monthlyProfit: pharmacy.monthlyProfit.toFixed(0),
        monthlySale: parseFloat(pharmacy.monthlySale).toFixed(0) + "€",
      }));

      dispatch({ type: CLIENTS, payload: { processedPharmacies } });
    
      setIsLoadingPharmacies(false);
      
    } catch (error) {
      console.error("Error fetching pharmacy data:", error);
      setIsLoadingPharmacies(false);
    }
  }




  useEffect(() => {
    fetchData();
    fetchPharmacyData();
  }, [])

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
              <Route path="/pharmacies" element={<Pharmacies IsLoadingPharmacies={isLoadingPharmacies} IsLoadingProducts={isLoadingProducts} />} />
              <Route path="/pharmacies/productdetails" element={<ProductDetails loading={isLoadingProducts} />} />
              <Route path="/pharmacies/clientdetails" element={<ClientDetails loading={isLoadingPharmacies} />} />
              <Route path="/pharmacies/products/:productCode" element={<SingleProductDetails />} />
              <Route path="/pharmacies/clients/:clientCode" element={<SinglePharmacyDetails />} />
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