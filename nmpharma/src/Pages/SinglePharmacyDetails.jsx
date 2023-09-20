import { useState, useEffect, useContext } from "react";
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";
import { useParams } from "react-router";
import ApiService from "../api/ApiService";
import { Context } from "../providers/provider";
import styled from "styled-components";
import { MamRadVelkyZadky, NutellaSkeleton, NutellaSkeletonTableContainer } from "./Pharmacies";
import { ModeButtonL, ModeButtonR } from "./Stock";
import BreakdownTable from "../Components/BreakdownTable";
import Table from "../Components/Table";
import RankTable from "../Components/RankTable";

export function SinglePharmacyDetails({ loading, selectedMonth, onMonthChange, selectedYear, onYearChange }) {
  const params = useParams();
  const [data, setData] = useState();
  const [store, dispatch] = useContext(Context);
  const [pharmacyName, setPharmacyName] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [phBreakdownData, setPhBreakdownData] = useState();
  const [top5, setTop5] = useState();

  useEffect(() => {
    const year = new Date().getFullYear();
    const response = ApiService.get(
      `pharmacies/breakdown/top/${year}/${params.clientCode}`,
      { Authorization: "Bearer " + store.user.token }
    ).then((response) => {
      response.forEach((item) => {
        item.products.slice(0, 5);
        item.products.forEach((product) => {
          product.profit = product.profit.toFixed(0);
          product.salePrice = product.salePrice.toFixed(0) + " €";
          product.costPrice = product.costPrice.toFixed(0) + " €";
        });
      });
      setData(response);
      const response2 = ApiService.get(
        `pharmacies/breakdown/${year}/${params.clientCode}`,
        { Authorization: "Bearer " + store.user.token }
      ).then((response) => {
        setPhBreakdownData(response);
      });
    });
    const phName = store.clients.find(
      (client) => client.clientCode === params.clientCode
    );
    setPharmacyName(phName.clientName);
    const response3 = ApiService.get(
      `pharmacies/breakdown/top5/${year}/${params.clientCode}`,
      { Authorization: "Bearer " + store.user.token }
    ).then((response) => {
      setTop5(response);
    });
  }, []);

  const renderSkeleton = () => (
    <NutellaSkeletonTableContainer style={{ width: "100%", height: "auto" }}>
      {Array(5)
        .fill()
        .map((_, i) => (
          <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
            <NutellaSkeleton
              variant="rectangular"
              height="3em"
              width="100%"
            />
          </div>
        ))}
    </NutellaSkeletonTableContainer>
  );

  return (
    <MamRadVelkyZadky3>
      <TitleWrapper>
        <Title>{loading ? "Loading..." : pharmacyName}</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>

      {loading || (!data && !top5) ? renderSkeleton() : (
        <>
          <Wrapper>
            <ModeButtonL
              active={!showAll}
              onClick={() => setShowAll((prev) => !prev)}>
              TOP 5
            </ModeButtonL>
            <ModeButtonR
              active={showAll}
              onClick={() => setShowAll((prev) => !prev)}>
              ALL
            </ModeButtonR>
          </Wrapper>
          <Table
            title={pharmacyName + " - Top selling products"}
            subtitle={showAll ? "ALL" : "TOP 5"}
            viewDetailsLink="/pharmacies/productdetails"
            width="100%"
            columns={[
              { label: "NAME", field: "productName", align: "left" },
              { label: "SALE PRICE", field: `salePrice`, align: "center" },
              { label: "COST PRICE", field: `costPrice`, align: "center" },
              { label: "PROFIT", field: `profit`, align: "center" },
              { label: "QUANTITY", field: `quantity`, align: "center" },
            ]}
            data={
              showAll
                ? data.find((item) => item.month == selectedMonth)?.products
                : data
                  .find((item) => item.month == selectedMonth)
                  ?.products.slice(0, 5)
            }
            selectedMonth={selectedMonth}
            onMonthChange={onMonthChange}
            selectedYear={selectedYear}
            onYearChange={onYearChange}
            content={"products"}
          />
          <RankTable title="Top products per month" width="100%" data={top5} />
        </>
      )} 
        {loading || !phBreakdownData ? renderSkeleton() : (
        <BreakdownTable
          title="Pharmacy breakdown"
          subtitle="Breakdown of all product sold in a year"
          viewDetailsLink="/pharmacies/productdetails"
          width="100%"
          data={phBreakdownData}
          content={"products"}
        />
      )}
    </MamRadVelkyZadky3>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1em;
`;

const MamRadVelkyZadky3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  margin-right: 20px;
  margin-bottom: 20px;
`;