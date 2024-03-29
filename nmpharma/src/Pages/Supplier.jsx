import React from "react";
import { useState, useEffect, useContext } from "react";
import { MamRadVelkyZadky2 } from "./Pharmacies";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import ForecastTable from "../Components/ForecastTable";
import { useParams } from 'react-router-dom';
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER, } from "../providers/provider";


const testData = [
  { name: 'Produkt 1', expiry: '07/2025' ,July: 50, August: 30, September: 70, October: 80, November: 40, December: 60 },
  { name: 'Produkt 2',  expiry: '07/2025' ,July: 45, August: 25, September: 55, October: 75, November: 35, December: 50 },
  { name: 'Produkt 3',  expiry: '07/2025' ,July: 30, August: 40, September: 60, October: 70, November: 50, December: 55 },
  { name: 'Produkt 4', expiry: '07/2025' ,July: 30, August: 40, September: 60, October: 70, November: 50, December: 55 },
];


function Supplier() {

  const { supplierCode } = useParams();
  const [store, dispatch] = useContext(Context);
  const [supplierProducts, setSupplierProducts] = useState([]);

  // Get data needed for calculating the months of stock left from context
  // Basically get all products from current supplier
  async function getData() {
    store.processedForecast.forEach(supplier =>
    {
      if (supplier.supplierCode == supplierCode)
      {
        setSupplierProducts(supplier.productsForecast);
      }
    });
  }

  useEffect(() => {
    getData();  
  }, []);

  return (
    <MamRadVelkyZadky2>
      <TitleWrapper>
        <h2>Supplier - {supplierCode}</h2>
        <GoBackButton to='/stock'>Back</GoBackButton>
      </TitleWrapper>

      <ForecastTable
        title="Half year forecast of products"
        subcode={null}
        subtitle=""
        width="100%"
        columns={[
          { label: 'Product name', field: 'productName', align: 'left' },
          { label: 'July', field: 'July', align: 'center' },
          { label: 'August', field: 'August', align: 'center' },
          { label: 'September', field: 'September', align: 'center' },
          { label: 'October', field: 'October', align: 'center' },
          { label: 'November', field: 'November', align: 'center' },
          { label: 'December', field: 'December', align: 'center' },
        ]}
        data={supplierProducts}
    />


    </MamRadVelkyZadky2>
  );
}

export default Supplier;


