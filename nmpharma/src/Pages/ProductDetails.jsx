import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Table from "../Components/Table";
import { GoBackButton } from "./ClientsDetails";
import ApiService from "../api/ApiService";
import { Skeleton } from "@mui/material";
import { FiSearch } from 'react-icons/fi';
import { Input } from "./Register";


export default function ProductDetails() {
  const [products, setProducts] = useState([]); // State pro ukládání dat
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await ApiService.get("products/sales/2023/1");

        // Ensure data is sorted by rank
        const sortedData = productsData.sort((a, b) => a.rank - b.rank);

        const processedData = sortedData.map(product => ({
          ...product,
          soldTarget: `${product.quantitySold} / ${product.quantityTarget}`,
          monthlyProfit: parseFloat(product.monthlyProfit).toFixed(0),
        }));

        // Set only the top 10 products
        setProducts(processedData.slice(0, 82));
        setFilteredProducts(processedData.slice(0, 82));
        setLoading(false);  // Set loading to false once data is fetched


      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false once data is fetched

      }
    }

    fetchData();
  }, []);

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
            <SkeletonTableContainer style={{ width: "98%" }}>
              {/* Title & Subtitle */}
              <Skeleton variant="text" width="60%" height="24px" />
              <Skeleton variant="text" width="30%" height="20px" marginBottom="16px" />

              {/* Table Headers */}
              <div style={{ display: 'flex', marginBottom: "10px" }}>
                <Skeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
                <Skeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
                <Skeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
                <Skeleton variant="rectangular" width="25%" height="20px" />
              </div>

              {/* Table Rows */}
              {Array(15).fill().map((_, i) => (
                <div key={i} style={{ display: 'flex', marginBottom: "10px" }}>
                  <Skeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
                  <Skeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
                  <Skeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
                  <Skeleton variant="rectangular" width="25%" height="20px" />
                </div>
              ))}
            </SkeletonTableContainer>
          ) : (
            <Table
              title="Product Profit & Quantity"
              subtitle="TOP 82"
              viewDetailsLink="/pharmacies/productdetails"
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
  background-color: #d54529;  
  color: black; 
`;
export const InputSeacrh = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  background: #f7f8ff;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus {
    background: #eff0f7;

  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 20px;

  svg {
    color: #888;
    font-size: 18px;
    margin-right: 4px;
  }
`;

const SkeletonTableContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${props => props.width || '48%'};
  min-width: 500px;
  height: 800px;

  @media (max-width: 1320px) {
    width: 100%;
  }
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
