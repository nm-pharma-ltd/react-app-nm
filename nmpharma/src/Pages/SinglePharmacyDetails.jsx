import {useState, useEffect, useContext} from "react";
import LineChart from "../Components/LineChart";
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";
import { useParams } from "react-router";
import Table from "../Components/Table";
import ApiService from "../api/ApiService";
import {Context} from "../providers/provider"
import Skeleton from "@mui/material/Skeleton";
import styled from "styled-components";
import { NutellaSkeleton, NutellaSkeletonTableContainer } from "./Pharmacies";
import { Switch, Checkbox, Slider  } from "./Appearance";
import { UnderlineH } from "./Stock";

export function SinglePharmacyDetails({selectedMonth, onMonthChange}) {
  const params = useParams();
  const [data, setData] = useState();
  const [store, dispatch] = useContext(Context);
  const [pharmacyName, setPharmacyName] = useState("");
  const [showAll, setShowAll] = useState(false);
  
  useEffect(() =>{
      const response = ApiService.get(`pharmacies/top/2023/${params.clientCode}`, {Authorization: "Bearer " + store.user.token}).then(response => {
        response.forEach((item) => {
          item.products.slice(0, 5);
          item.products.forEach((product) => {
            product.profit = product.profit.toFixed(0) + " €"
            product.salePrice = product.salePrice.toFixed(0) + " €"
            product.costPrice = product.costPrice.toFixed(0) + " €"
            product.yearlyTarget = product.quantity + " / " + (product.yearlyTarget /12).toFixed(0);
          })
        })
        setData(response);
        console.log(response);
      });
      const phName = store.clients.find(client => client.clientCode === params.clientCode);
      setPharmacyName(phName.clientName);
      
      
  }, [])


  return (
    <>
      
      <TitleWrapper>
        <Title>{pharmacyName}</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>
      <Wrapper>
        <UnderlineH>Show all products:</UnderlineH>
        <Switch style={{marginBottom: "0.5em", marginLeft: "1em"}}>
          <Checkbox type="checkbox" checked={showAll} onChange={() => setShowAll((prev) => !prev)} />
          <Slider />
        </Switch>
      </Wrapper>
      {data !== undefined ? ( 
      <Table
        title="Product Profit & Quantity"
        subtitle= {showAll ? "ALL" : "TOP 5"}
        viewDetailsLink="/pharmacies/productdetails"
        width="auto"
        columns={[
          { label: 'NAME', field: 'productName', align: 'left' },
          { label: 'SALE PRICE', field: `salePrice`, align: 'center',},
          { label: 'COST PRICE', field: `costPrice`, align: 'center',},
          { label: 'PROFIT', field: `profit`, align: 'center', },
          { label: 'QUANTITY/TARGET', field: `yearlyTarget`, align: 'center',},
        ]}
        data={showAll ? data.find(item => item.month == selectedMonth).products : data.find(item => item.month == selectedMonth).products.slice(0, 5)}
        selectedMonth={selectedMonth}
        onMonthChange={onMonthChange}
      />
      ) : (
        <NutellaSkeletonTableContainer style={{width: "97%", height: "auto"}}>
            {/* Table Rows */}
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
      ) 
      }
    </>
  );
  	
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  `;

