import React from "react";
import { MamRadVelkyZadky2 } from "./Pharmacies";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import ForecastTable from "../Components/ForecastTable";


const testData = [
  { name: 'Produkt 1', expiry: '07/2025' ,July: 50, August: 30, September: 70, October: 80, November: 40, December: 60 },
  { name: 'Produkt 2',  expiry: '07/2025' ,July: 45, August: 25, September: 55, October: 75, November: 35, December: 50 },
  { name: 'Produkt 3',  expiry: '07/2025' ,July: 30, August: 40, September: 60, October: 70, November: 50, December: 55 },
  { name: 'Produkt 4', expiry: '07/2025' ,July: 30, August: 40, September: 60, October: 70, November: 50, December: 55 },
];

function Tabulky() {
  return (
    <MamRadVelkyZadky2>
      <TitleWrapper>
        <h2>Supplier - THE001</h2>
        <GoBackButton to='/stock'>Back</GoBackButton>
      </TitleWrapper>

      <ForecastTable
      title="THE001"
      subcode={null}
      subtitle="List of products"
      width="100%"
      columns={[
        { label: 'Product name', field: 'name', align: 'left' },
        { label: 'Expiry date', field: 'expiry', align: 'center' },
        { label: 'July', field: 'July', align: 'center' },
        { label: 'August', field: 'August', align: 'center' },
        { label: 'September', field: 'September', align: 'center' },
        { label: 'October', field: 'October', align: 'center' },
        { label: 'November', field: 'November', align: 'center' },
        { label: 'December', field: 'December', align: 'center' },
      ]}
      data={testData}
    />
    </MamRadVelkyZadky2>
  );
}

export default Tabulky;


