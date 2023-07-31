import React from "react";
import StockCard from "../Components/StockCard";
import { Kontainer } from "./Stock";
import { FaBox, FaCalendarAlt, FaTruck } from "react-icons/fa";
import DataCard from "../Components/DataCard";
import { styled } from "styled-components";



export default function ForecastSingleProduct() {

    return (
        <Kontainer>
            <h2>Product detail - Voltaren </h2>
            <DataKontainer>
                <DataCard title="INCOMING" amount="100" icon={FaBox} iconBackgroundColor="#bdd9ff" textColor={"#1b53a2"} />
                <DataCard title="ON ORDER" amount="200" icon={FaTruck} iconBackgroundColor="#d5d5d5" textColor={"#4f4f4f"} />
                <DataCard title="TOTAL IN STOCK" amount="300" icon={FaBox} iconBackgroundColor="#a4da05 " textColor={"#336814 "} />
                <DataCard title="MONTHS OF STOCK" amount="400" icon={FaCalendarAlt} iconBackgroundColor="#ff9933" textColor={"#875625"} />
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
