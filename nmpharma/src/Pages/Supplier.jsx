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

  async function fetchData() {
    try {
      const response = await ApiService.get(`suppliers/products/${supplierCode}`, {
        Authorization: "Bearer " + store.user.token,
      });
      setSupplierProducts(response.products)
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();  
  }, []);


  return (
    <MamRadVelkyZadky2>
      <TitleWrapper>
        <h2>Supplier - {supplierCode}</h2>
        <GoBackButton to='/stock'>Back</GoBackButton>
      </TitleWrapper>

      <ForecastTable
      title={supplierCode}
      subcode={null}
      subtitle="List of products"
      width="100%"
      columns={[
        { label: 'Product name', field: 'description', align: 'left' },
        { label: 'July', field: 'July', align: 'left' },
        { label: 'August', field: 'August', align: 'left' },
        { label: 'September', field: 'September', align: 'left' },
        { label: 'October', field: 'October', align: 'left' },
        { label: 'November', field: 'November', align: 'left' },
        { label: 'December', field: 'December', align: 'left' },
      ]}
      data={supplierProducts}
    />


    </MamRadVelkyZadky2>
  );
}

export default Supplier;


