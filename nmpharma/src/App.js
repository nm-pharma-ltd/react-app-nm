import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import { Context, SIGNEDUSER, PRODUCTS, CLIENTS, FORECAST } from './providers/provider';
import ApiService from "./api/ApiService";
import DangerAlert from './Components/DangerAlert';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [store, dispatch] = useContext(Context)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);


  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedYear, setSelectedYear] = useState(2023);


  // PRODUCTS DATA FETCHING
  async function fetchData(year = selectedYear, month = selectedMonth, token) {
    try {
      setIsLoadingProducts(true);
      const authToken = token ? token : store.user.token;

      const productsData = await ApiService.get(`products/sales/${year}/${month}`, { "Authorization": "Bearer " + authToken });

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
      if (error.status === 401) {
        navigate('/Login');
      } else if (error.status === 500) {
        setError("Internal Server Error. Please try again later.");
      }
      else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error fetching data:", error);
      setIsLoadingProducts(false);
    }

  }


  //CLIENTS DATA FETCHING
  async function fetchPharmacyData(year = selectedYear, month = selectedMonth, token) {
    try {

      setIsLoadingPharmacies(true);
      const authToken = token ? token : store.user.token;

      const fetchedData = await ApiService.get(`clients/sales/${year}/${month}`, { "Authorization": "Bearer " + authToken });

      const sortedPharmacies = fetchedData.sort(
        (a, b) => b.monthlySale - a.monthlySale
      );

      const processedPharmacies = sortedPharmacies.map((pharmacy, index) => ({
        clientCode: pharmacy.clientCode,
        rank: index + 1,
        clientName: pharmacy.clientName,
        monthlyProfit: pharmacy.monthlyProfit.toFixed(0),
        monthlySale: parseFloat(pharmacy.monthlySale).toFixed(0) + "€",
      }));

      dispatch({ type: CLIENTS, payload: { processedPharmacies } });

      setIsLoadingPharmacies(false);

    } catch (error) {
      if (error.status === 401) {
        navigate('/Login');
      } else if (error.status === 500) {
        setError("Internal Server Error. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error fetching data:", error);
      setIsLoadingPharmacies(false);
    }
  }

  async function fetchStockData(year = new Date().getFullYear(), month = 5, token) {
    try {
      setIsLoadingForecast(true);
      const authToken = token ? token : store.user.token;
  
      const stockData = await ApiService.get(`suppliers/forecast/${year}/${month}`, { "Authorization": "Bearer " + authToken });
      console.log(stockData)
  
      const processedForecast = stockData.map(supplier => {
        supplier.productsForecast.sort((a, b) => (a.productCode || '').localeCompare(b.productCode || ''));
        return supplier;
      });
  
      console.log(processedForecast);
  
      // Dispatch akce a uložte si Promise, který představuje dokončení dispatchu
      const dispatchPromise = new Promise(resolve => {
        dispatch({ type: FORECAST, payload: { processedForecast } });
        resolve(); // Tady můžete přidat další logiku, pokud je to nutné
      });
  
      // Počkejte na dokončení dispatchu
      await dispatchPromise;
  
      console.log("Local storage updated");
      setIsLoadingForecast(false);
  
    } catch (error) {
      if (error.status === 401) {
        navigate('/Login');
      } else if (error.status === 500) {
        setError("Internal Server Error. Please try again later.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error fetching data:", error);
  
    } finally {
      // Tato část se spustí vždy, ať už byla operace úspěšná nebo ne
      setIsLoadingPharmacies(false);
    }
  }
  

  async function FetchAll() {
    fetchData();
    fetchPharmacyData();
    fetchStockData();
  }

  async function FetchAllWithToken(usertoken) {
    console.log(usertoken)
    fetchData(undefined, undefined, usertoken);
    fetchPharmacyData(undefined, undefined, usertoken);
    fetchStockData(undefined, undefined, usertoken);

  }

  useEffect(() => {
    FetchAll()
  }, [selectedMonth]);

  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Register';

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const isAuthenticated = () => {
    const token = store.user.token;
    return token !== null && token !== '';
  };

  if (!isAuthenticated() && !isAuthPage) {
    return <Navigate to="/Login" replace />;
  }

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    fetchData(undefined, month);
    fetchPharmacyData(undefined, month);
  };
  const handleYearChange = (year) => {
    setSelectedYear(year);
    fetchData(undefined, year);
    fetchPharmacyData(undefined, year);
  };



  return (
    <Container>
      {!isAuthPage && (
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <ContentWrapper>
        <Gradient />
        <Content open={isSidebarOpen && !isAuthPage}>
          {error && <DangerAlert message={error} />}
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route
                path="/pharmacies"
                element={
                  <Pharmacies
                    IsLoadingPharmacies={isLoadingPharmacies}
                    IsLoadingProducts={isLoadingProducts}
                    onMonthChange={handleMonthChange}
                    onYearChange={handleYearChange}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                  />
                }
              />
              <Route path="/pharmacies/productdetails" element={<ProductDetails loading={isLoadingProducts} onYearChange={handleYearChange} onMonthChange={handleMonthChange}
                selectedMonth={selectedMonth} selectedYear={selectedYear} />} />
              <Route path="/pharmacies/clientdetails" element={<ClientDetails loading={isLoadingPharmacies} onYearChange={handleYearChange} onMonthChange={handleMonthChange}
                selectedMonth={selectedMonth} selectedYear={selectedYear} />} />
              <Route path="/pharmacies/products/:productCode" element={<SingleProductDetails />} />
              <Route path="/pharmacies/clients/:clientCode" element={<SinglePharmacyDetails loading={isLoadingPharmacies} onYearChange={handleYearChange} onMonthChange={handleMonthChange}
                selectedMonth={selectedMonth} selectedYear={selectedYear} />} />
              <Route
                path="/stock"
                element={
                  <Stock
                    IsLoadingForecast={isLoadingForecast}
                  />
                }
              />
              <Route path="/stock/supplier/:supplierCode" element={<Supplier />} />
              <Route path="/stock/:productCode" element={<ForecastSingleProduct />} />
              <Route path="/eru" element={<ERUs />} />
              <Route path="/targets" element={<Targets />} />
              <Route path="/targets/teamdetails/:id" element={<TeamDetails />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="/Login" element={<Login fetchDataWithToken={FetchAllWithToken} />} />
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