import React from "react";
import ForecastTable from "../Components/ForecastTable";
import { Kontainer } from "./Stock";
import { FaBox, FaCalendarAlt, FaTruck } from "react-icons/fa";
import DataCard from "../Components/DataCard";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import ChatBox from "../Components/ChatBox";



export default function ForecastSingleProduct() {

  const testData = [
    {
      name: 'Produkt 1',
      price: 100,
      profit: 20,
      July: 50,
      August: 30,
      September: 70,
      October: 80,
      November: 40,
      December: 60,
      January: 45,
      February: 55,
      March: 65,
      April: 75,
      May: 85,
      June: 95
    }
  ];

  return (
    <Kontainer>
      <TitleWrapper>
        <h2>Forecast details - AMLODIPINE TEVA 10 MG </h2>
        <GoBackButton to={'/stock'}>Back</GoBackButton>
      </TitleWrapper>
      <DataKontainer>
        <DataCard title="INCOMING" amount="+100" pluspercentage={'+12% '} timewhen={' than last month'} icon={FaBox} iconBackgroundColor="#bdd9ff" />
        <DataCard title="ON ORDER" amount="+200" pluspercentage={'+4% '} timewhen={' then last week'} icon={FaTruck} iconBackgroundColor="#d5d5d5" />
        <DataCard title="TOTAL IN STOCK" amount="680" pluspercentage={'+4% '} timewhen={' then last year'} icon={FaBox} iconBackgroundColor="#a4da05 " />
        <DataCard title="MONTHS OF STOCK" amount="9" pluspercentage={'+23% '} timewhen={' then last year'} icon={FaCalendarAlt} iconBackgroundColor="#ff9933" />
      </DataKontainer>

      <ForecastTable
        title="THE001 "
        subcode="NMP019"
        subtitle=" AMLODIPINE TEVA 10 MG"
        width="100%"
        columns={[
          { label: 'Price', field: 'price', align: 'left' },
          { label: 'Profit', field: 'profit', align: 'left' },
          { label: 'Jul', field: 'July', align: 'center' },
          { label: 'Aug', field: 'August', align: 'center' },
          { label: 'Sep', field: 'September', align: 'center' },
          { label: 'Oct', field: 'October', align: 'center' },
          { label: 'Nov', field: 'November', align: 'center' },
          { label: 'Dec', field: 'December', align: 'center' },

          { label: 'Jan', field: 'January', align: 'center' },
          { label: 'Feb', field: 'February', align: 'center' },
          { label: 'Mar', field: 'March', align: 'center' },
          { label: 'Apr', field: 'April', align: 'center' },
          { label: 'May', field: 'May', align: 'center' },
          { label: 'Jun', field: 'June', align: 'center' }
        ]}
        data={testData}
      />
      <h2>Chat</h2>
      <ChatBox />
    </Kontainer>
  );
}



const DataKontainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    flex-wrap: wrap;
`
