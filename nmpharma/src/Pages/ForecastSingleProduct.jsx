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
import { FaInfinity } from "react-icons/fa6";

export default function ForecastSingleProduct() {

  const [store] = useContext(Context);
  const { productCode } = useParams();
  const [productInfo, setProductInfo] = useState(null);


  function getData() {
    let newData;
    store.processedForecast.forEach((supplier) => {
      supplier.productsForecast.forEach((product) => {
        if (product.productCode == productCode) {
          // Assuming averageQuantitySold is the average quantity sold in 6 months
          const sixmonth = product.averageQuantitySold;

          const currentOnOrder = product.quantityOrdered;
          const currentIncoming = product.incoming;
          const currentTotalInStock = product.inStock;

          let monthsOfStock = "--"; // Default to '--' if calculation doesn't succeed
          if (sixmonth && sixmonth !== 0) {
            const calculatedMonths = (currentOnOrder + currentIncoming + currentTotalInStock) / sixmonth;
            monthsOfStock = Number.isFinite(calculatedMonths) ? calculatedMonths : "--";
          }

          newData = {
            ...product,
            expiry: product.productExpire ? product.productExpire : <FaInfinity />,
            monthsOfStock: monthsOfStock,
          }
          return;
        }
      });
      setProductInfo({ ...newData, supplierCode: supplier.supplierCode })
    });
  }


  useEffect(() => {
    getData();
  }, []);

  const handleColorChange = () => {
    if (!productInfo) return 'black'; // Default color if productInfo hasn't been set

    const stock = productInfo.monthsOfStock;
    if (stock < 6) {
      return 'red';
    } else if (stock >= 18) {
      return '#b89d00';
    } else {
      return 'green';
    }
  };

  const expiryColor = () => {
    if (!productInfo || !productInfo.expiry) return 'black';

    const currentDate = new Date();
    const expiryDate = new Date(productInfo.expiry);
    const differenceInMonths = (expiryDate.getFullYear() - currentDate.getFullYear()) * 12 + (expiryDate.getMonth() - currentDate.getMonth());

    return differenceInMonths < 6 ? 'red' : 'green';
  };

  return (
    <Konto>
      <TitleWrapper>
        <h2>Forecast details -  {productInfo?.productDescription}</h2>
        <GoBackButton to={'/stock'}>Back</GoBackButton>
      </TitleWrapper>
      <DataKontainer>
        <DataCard title="INCOMING" amount={productInfo?.incoming} pluspercentage={'+12% '} timewhen={' than last month'} icon={FaBox} iconBackgroundColor="#bdd9ff" />
        <DataCard title="ON ORDER" amount={productInfo?.quantityOrdered} pluspercentage={'+4% '} timewhen={' then last week'} icon={FaTruck} iconBackgroundColor="#d5d5d5" />
        <DataCard title="TOTAL IN STOCK" amount={productInfo?.inStock} pluspercentage={'+4% '} timewhen={' then last year'} icon={FaBox} iconBackgroundColor="#a4da05 " />
        <DataCard
          title="MONTHS OF STOCK"
          amount={productInfo?.monthsOfStock.toFixed(2)}
          icon={FaCalendarAlt}
          textColor={handleColorChange()}
          iconBackgroundColor={'#ff9933'} />
        <DataCardLarge
          supplier={productInfo?.supplierCode}
          code={productCode}
          name={productInfo?.productDescription}
          expiry={
            <ExpiryBox bgColor={expiryColor()}>
              {productInfo?.expiry ? productInfo.expiry : <FaInfinity />}
            </ExpiryBox>
          }
        />
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

const ExpiryBox = styled.div`
    background-color: ${props => props.bgColor || 'black'};
    color: white;
    padding: 4px 8px;
    font-size: 18px;
    border-radius: 8px;
    display: inline-block;
    margin: 5px;
`;


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
