import React from "react";
import StockCard from "../Components/StockCard";
import { Kontainer } from "./Stock";
import { FaBox, FaCalendarAlt, FaTruck } from "react-icons/fa";
import DataCard from "../Components/DataCard";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";



export default function ForecastSingleProduct() {

    return (
        <Kontainer>
            <TitleWrapper>
              <h2>Forecast details - Voltaren </h2>
              <GoBackButton to={'/stock'}>Back</GoBackButton>
            </TitleWrapper>
            <DataKontainer>
                <DataCard title="INCOMING" amount="+100" pluspercentage={'+12% '} timewhen={' than last month'} icon={FaBox} iconBackgroundColor="#bdd9ff"  />
                <DataCard title="ON ORDER" amount="+200"  pluspercentage={'+4% '} timewhen={' then last week'} icon={FaTruck} iconBackgroundColor="#d5d5d5"  />
                <DataCard title="TOTAL IN STOCK" amount="680"  pluspercentage={'+4% '} timewhen={' then last year'}  icon={FaBox} iconBackgroundColor="#a4da05 " />
                <DataCard title="MONTHS OF STOCK" amount="9"   pluspercentage={'+23% '} timewhen={' then last year'}  icon={FaCalendarAlt} iconBackgroundColor="#ff9933" />
            </DataKontainer>
            <StockCard />
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
