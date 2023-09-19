import { useState, useEffect, useContext } from "react";
import { FaBox, FaCalendarAlt, FaTruck } from "react-icons/fa";
import DataCard from "../Components/DataCard";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import ChatBox from "../Components/ChatBox";
import DataCardLarge from "../Components/DataCardLarge";
import ForecastTableDetail from "../Components/ForecastTableDetail";
import ApiService from "../api/ApiService";
import { Context, FORECAST_BUTTON_SAVE } from "../providers/provider";
import { useLocation, useParams } from "react-router";
import { UnderlineH } from "./Stock";

export default function ForecastSingleProduct() {
  const [store] = useContext(Context);
  const { productCode } = useParams();
  const [productInfo, setProductInfo] = useState(null);


  useEffect(() => {
    const fetchProductForecast = async () => {
      try {
        const response = await ApiService.get(`suppliers/forecast/product/${productCode}`, {"Authorization": "Bearer " + store.user.token})
        console.log(response);
        setProductInfo(response);
      } catch (error) {
        console.error("Failed to fetch product forecast:", error);
      }
    };
  
    fetchProductForecast();
  }, [productCode, store.user.token]);
  
  

  // const processDataForTable = () => {
  //   if (!productInfo) return [];

  //   const { sales } = productInfo;

  //   const monthMap = {
  //     1: 'January',
  //     2: 'February',
  //     3: 'March',
  //     4: 'April',
  //     5: 'May',
  //     6: 'June',
  //     7: 'July',
  //     8: 'August',
  //     9: 'September',
  //     10: 'October',
  //     11: 'November',
  //     12: 'December',
  //   };

  //   let tableData = {};

  //   sales.forEach(sale => {
  //     tableData[monthMap[sale.month]] = sale.averageQuantitySold;
  //   });
  
  //   "productCode": "NMP002",
  //   "productDescription": "(M) PHILIPS OPTICHAMBER WITH MASK",
  //   "productExpire": "",
  //   "quantityOrdered": 0,
  //   "incoming": 0,
  //   "inStock": 238,
  //   "averageQuantitySold": null
  
  // //   return [tableData];
  // }
  

  return (
    <Konto>
      <TitleWrapper>
        <h2>Forecast details -  {store.forecastProduct.productDescription}</h2>
        <GoBackButton to={'/stock'}>Back</GoBackButton>
      </TitleWrapper>
      <DataKontainer>
        <DataCard title="INCOMING" amount={store.forecastProduct.incoming} pluspercentage={'+12% '} timewhen={' than last month'} icon={FaBox} iconBackgroundColor="#bdd9ff" />
        <DataCard title="ON ORDER" amount={store.forecastProduct.quantityOrdered} pluspercentage={'+4% '} timewhen={' then last week'} icon={FaTruck} iconBackgroundColor="#d5d5d5" />
        <DataCard title="TOTAL IN STOCK" amount={store.forecastProduct.inStock} pluspercentage={'+4% '} timewhen={' then last year'} icon={FaBox} iconBackgroundColor="#a4da05 " />
        <DataCard title="MONTHS OF STOCK" amount={store.forecastProduct.monthsOfStock} pluspercentage={'+23% '} timewhen={' then last year'} icon={FaCalendarAlt} iconBackgroundColor="#ff9933" />
        <DataCardLarge supplier={store.forecastProduct.supplierCode} code={productCode} name={store.forecastProduct.productDescription} expiry={store.forecastProduct.expiry} />
      </DataKontainer>


      {/* <ForecastTableDetail
        width="100%"
        title="Product Forecast"
        subtitle="Year 2023"
        columns={[
          { label: 'Jan', field: 'January', align: 'center' },
          { label: 'Feb', field: 'February', align: 'center' },
          { label: 'Mar', field: 'March', align: 'center' },
          { label: 'Apr', field: 'April', align: 'center' },
          { label: 'May', field: 'May', align: 'center' },
          { label: 'Jun', field: 'June', align: 'center' },
          { label: 'Jul', field: 'July', align: 'center' },
          { label: 'Aug', field: 'August', align: 'center' },
          { label: 'Sep', field: 'September', align: 'center' },
          { label: 'Oct', field: 'October', align: 'center' },
          { label: 'Nov', field: 'November', align: 'center' },
          { label: 'Dec', field: 'December', align: 'center' }
        ]
        }
        data={null}
      /> */}
      <h2>Chat</h2>

      <ChatBox ContentType={productCode} /> 

    </Konto>
  );
}



const DataKontainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
    width: 100%;
`
export const Konto = styled.div`
    margin-right: 20px;
`
