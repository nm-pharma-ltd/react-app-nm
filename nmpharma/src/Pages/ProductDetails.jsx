import React, { useEffect, useState, useContext } from "react";
import { styled } from "styled-components";
import Table from "../Components/Table";
import { GoBackButton, InputSeacrh, SearchBarWrapper } from "./ClientsDetails";
import ApiService from "../api/ApiService";
import { Skeleton } from "@mui/material";
import { FiSearch } from 'react-icons/fi';
import { Input } from "./Register";
import { Context, SIGNEDUSER, PRODUCTS,  } from '../providers/provider';


export default function ProductDetails({ loading }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [store, dispatch] = useContext(Context);

  // Initialize products state after store is defined
  const [products, setProducts] = useState(store.products.slice(0, 82));

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.productDescription.toLowerCase().startsWith(searchTerm.toLowerCase()));
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  function HighlightedText({ text, highlight }) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? <Highlight0 key={index}>{part}</Highlight0> : part
        )}
      </span>
    );
  }

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>Sales activity details</Title>
          <GoBackButton to="/pharmacies">Back</GoBackButton>
          <SearchBarWrapper>
            <FiSearch />
            <InputSeacrh
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBarWrapper>
        </TitleWrapper>
        <MamRadVelkyZadky>
          {loading ? (
            <NutellaTableContainer style={{ width: "98%" }}>
              {/* Title & Subtitle */}
              <NutellaSkeleton variant="text" width="60%" height="24px" />
              <NutellaSkeleton variant="text" width="30%" height="20px" marginBottom="16px" />

              {/* Table Headers */}
              <div style={{ display: 'flex', marginBottom: "10px" }}>
                <NutellaSkeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="25%" height="20px" />
              </div>

              {/* Table Rows */}
              {Array(15).fill().map((_, i) => (
                <div key={i} style={{ display: 'flex', marginBottom: "10px" }}>
                  <NutellaSkeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
                  <NutellaSkeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
                  <NutellaSkeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
                  <NutellaSkeleton variant="rectangular" width="25%" height="20px" />
                </div>
              ))}
            </NutellaTableContainer>
          ) : (
            <Table
              title="Product Profit & Quantity"
              subtitle="TOP 82"
              viewDetailsLink={false}
              width="98%"
              columns={[
                { label: 'RANK', field: 'rank', align: 'left' },
                { label: 'NAME', field: 'productDescription', align: 'left' },
                { label: 'PROFIT', field: 'monthlyProfit', align: 'center' },
                { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
              ]}
              data={filteredProducts.map(product => ({
                ...product,
                productDescription: <HighlightedText text={product.productDescription} highlight={searchTerm} />
              }))}
            />
          )}
        </MamRadVelkyZadky>
      </Container>
    </>
  );
}

const Highlight0 = styled.mark`
  background-color: #edcd84;  
  color: black; 
`;

const NutellaTableContainer = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${(props) => props.width || "98%"};
  min-width: 500px;
  height: 600px;

  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const NutellaSkeleton = styled(Skeleton)`
  color: ${(props) => props.theme.lightdark};
`;

const Container = styled.div`
      margin-bottom: 20px;
      `;

const TitleWrapper = styled.div`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      `;

const Title = styled.h2`
      margin: 0;
      display: flex;
      `;



const MamRadVelkyZadky = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 20px;
      width: 100%;
      `;
