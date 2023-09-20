import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaChevronDown } from "react-icons/fa";
import { RedBox, TableCell, ViewDetailsLink } from "./Table";
import { TiMediaRecord } from "react-icons/ti";
import { Link, NavLink } from "react-router-dom";
import { FaInfinity } from "react-icons/fa6";
import { Context, FORECAST_UPDATE } from "../providers/provider";
import ApiService from "../api/ApiService";

const StockCard = ({ data = { productsForecast: [] } }) => {
  const cardRef = useRef(null);
  const [store, dispatch] = useContext(Context);
  const [expanded, setExpanded] = useState(false);
  const [cardWidth, setCardWidth] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [monthsOfStock, setMonthsOfStock] = useState({});
  const [editingProductCode, setEditingProductCode] = useState(null);
  const [editingIncomingValues, setEditingIncomingValues] = useState({});

  const hasOnOrder = data.productsForecast?.some(
    (product) => product.quantityOrdered > 0
  );
  
  const hasIncoming = data.productsForecast?.some(
    (product) => product.incoming > 0
  );

  const calculateToOrder = (productCode) => {
    const productData = data.productsForecast.find(
      (prod) => prod.productCode === productCode
    );

    if (!productData) return 0;

    const sixmonth = productData.averageQuantitySold;

    const currentOnOrder = productData.quantityOrdered;
    const currentIncoming = productData.incoming;
    const currentTotalInStock = productData.inStock;

    const requiredForSixMonths = sixmonth * 6;
    const currentTotal = currentOnOrder + currentIncoming + currentTotalInStock;

    return requiredForSixMonths - currentTotal > 0
      ? requiredForSixMonths - currentTotal
      : 0;
  };

  const handleCalculation = (productCode) => {
    const toOrder = inputValues[productCode]
      ? parseInt(inputValues[productCode], 10)
      : 0;
    const productData = data.productsForecast.find(
      (prod) => prod.productCode === productCode
    );

    if (!productData) return; // exit the function if the product data is not found

    const sixmonth = productData.averageQuantitySold;

    // Using product-specific values
    const currentOnOrder = productData.quantityOrdered;
    const currentIncoming = productData.incoming;
    const currentTotalInStock = productData.inStock;

    const calculatedMonths =
      (currentOnOrder + currentIncoming + currentTotalInStock + toOrder) /
      sixmonth;
    const months =
      sixmonth !== 0 && Number.isFinite(calculatedMonths)
        ? calculatedMonths
        : "--";

    if (productCode == "NMP002") {
      console.log(
        currentOnOrder,
        currentIncoming,
        currentTotalInStock,
        calculatedMonths,
        sixmonth
      );
    }

    setMonthsOfStock((prevState) => ({ ...prevState, [productCode]: months }));
  };

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    if (!expanded) {
      data.productsForecast.forEach((product) => {
        handleCalculation(product.productCode);
      });
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isExpiryInSixMonths = (expiryDate) => {
    if (!expiryDate || expiryDate === "") return false; // Exclude no expiry and infinity products

    const currentDate = new Date();
    const expiry = new Date(expiryDate);
    const differenceInMonths =
      (expiry.getFullYear() - currentDate.getFullYear()) * 12 +
      (expiry.getMonth() - currentDate.getMonth());
    return differenceInMonths < 6;
  };

  const hasExpiry = data.productsForecast.some(
    (product) =>
      isExpiryInSixMonths(product.productExpire) &&
      product.productExpire !== "" &&
      !!product.productExpire
  );

  const handleExpiryColorChange = (productExpire) => {
    if (!productExpire) return "green";
    return isExpiryInSixMonths(productExpire) ? "red" : "green";
  };

  const handleInputChange = (productCode, value) => {
    setInputValues((prevValues) => ({ ...prevValues, [productCode]: value }));
  };

  const handleIncomingInputChange = (productCode, value) => {
    setEditingIncomingValues((prevValues) => ({
      ...prevValues,
      [productCode]: value,
    }));
  };

  const handleColorChange = (productCode) => {
    if (monthsOfStock[productCode] < 6) {
      return "red";
    } else if (monthsOfStock[productCode] >= 18) {
      return "#b89d00";
    } else {
      return "green";
    }
  };

  const getBackgroundColor = (averageType) => {
    switch (averageType) {
      case 0:
        return "#0d5d0d";
      case 1:
        return "#2c287d";
      case 2:
        return "#921e1e";
      case 3:
        return "#5b5b5b";
      default:
        return "transparent";
    }
  };
  const toggleEditMode = (productCode) => {
    if (editingProductCode === productCode) {
      setEditingProductCode(null);
    } else {
      setEditingProductCode(productCode);
    }
  };

  // INCOMING PUT
  const handleSubmit = async (e, productCode) => {
    e.preventDefault();

    const newIncomingValue = editingIncomingValues[productCode];

    const payload = {
      productCode: productCode,
      supplierCode: data.supplierCode,
      incoming: newIncomingValue !== undefined ? newIncomingValue : 0,
    };

    try {

      console.log(payload);

      const response = await ApiService.put("suppliers/incoming", payload, {
        Authorization: "Bearer " + store.user.token,
      });

      // dispatch({ type: FORECAST_UPDATE, payload: { payload } });  NEDOKONCENO JE TO FEATURE NENI TO BUG

      if (response.status === undefined) {
        console.log("Aktualizace byla úspěšná.");
      } else if (response.status !== 200) {
        console.error(`Chyba při aktualizaci: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error(`Chyba při provádění PUT metody: ${error}`);
    }
  };

  return (
    <>
      <CardContainer ref={cardRef} expanded={expanded ? 1 : 0}>
        <CardHeaderContainer onClick={handleExpand}>
          <CardTitlee>
            {!data.supplierCode && !data.supplierName ? (
              "All products"
            ) : (
              <>
                <CodeTitle>{data.supplierCode}</CodeTitle>
                {data.supplierName}
              </>
            )}
          </CardTitlee>
          <RightKontainer>
            {hasExpiry && (
              <ExpiryBadge>
                <TiMediaRecord />
                Expiring
              </ExpiryBadge>
            )}
            {hasIncoming && (
              <IncomingBadge>
                <TeamBulletI />
                Incoming
              </IncomingBadge>
            )}
            {hasOnOrder && (
              <OnOrderBadge>
                <TeamBulletO />
                On-Order
              </OnOrderBadge>
            )}
            <ForeButton
              as={Link}
              to={{
                pathname: `/stock/supplier/${data.supplierCode}`,
                state: { supplierData: data, monthsOfStock: monthsOfStock },
              }}
            >
              Forecast all
            </ForeButton>
            <ExpandIcon expanded={expanded ? 1 : 0} />
          </RightKontainer>
        </CardHeaderContainer>
      </CardContainer>
      {expanded && (
        <ExpandedCard
          expanded={expanded ? 1 : 0}
          notopradius={expanded.toString()}
          width={cardWidth}
        >
          <ExpandedCardContent>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableHeaderCell align="center">STOCK CODE</TableHeaderCell>
                  <TableHeaderCell align="center">PRODUCT NAME</TableHeaderCell>
                  <TableHeaderCell align="center">
                    TOTAL IN STOCK
                  </TableHeaderCell>
                  <TableHeaderCell align="center">ON ORDER</TableHeaderCell>
                  <TableHeaderCell align="center">INCOMING</TableHeaderCell>
                  <TableHeaderCell align="center">
                    MONTHS OF STOCK
                  </TableHeaderCell>
                  <TableHeaderCell align="center">EXPIRY</TableHeaderCell>
                  <TableHeaderCell align="center">TO ORDER</TableHeaderCell>
                  <TableHeaderCell align="center">ACTIONS</TableHeaderCell>
                </TableRow>
              </TableHead>
              <tbody>
                {data.productsForecast &&
                  data.productsForecast.map((product, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCellCode align="center">
                          <StyledProductCode
                            bgcolor={getBackgroundColor(product.averageType)}
                          >
                            {product.productCode}
                          </StyledProductCode>
                        </TableCellCode>
                        <TableCell align="center">
                          {product.productDescription}
                        </TableCell>
                        <TableCellTotal align="center">
                          {product.inStock}
                        </TableCellTotal>
                        <TableCellOrder align="center">
                          + {product.quantityOrdered}
                        </TableCellOrder>

                        <TableCellInc align="center">
                          {product.productCode === editingProductCode ? (
                            <UniInput>
                              <InputStock
                                type="number"
                                value={
                                  editingIncomingValues[product.productCode] ||
                                  ""
                                }
                                onChange={(e) =>
                                  handleIncomingInputChange(
                                    product.productCode,
                                    e.target.value
                                  )
                                }
                                onBlur={() => setEditingProductCode(null)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleSubmit(e, product.productCode);
                                    toggleEditMode(product.productCode); // Přidáno: Zde se volá toggleEditMode
                                  }
                                }}
                              />
                            </UniInput>
                          ) : (
                            <span
                              onClick={() =>
                                toggleEditMode(product.productCode)
                              }
                            >
                              {editingIncomingValues[product.productCode] !==
                              undefined
                                ? `+ ${
                                    editingIncomingValues[product.productCode]
                                  }`
                                : `+${product.incoming}`}{" "}
                            </span>
                          )}
                        </TableCellInc>

                        <TableCellTotal
                          color={handleColorChange(product.productCode)}
                          align="center"
                        >
                          {typeof monthsOfStock[product.productCode] ===
                          "number"
                            ? monthsOfStock[product.productCode].toFixed(2)
                            : monthsOfStock[product.productCode] || "--"}
                        </TableCellTotal>
                        <TableCellTotal
                          color={handleExpiryColorChange(product.productExpire)}
                          align="center"
                        >
                          {product.productExpire === "" ? (
                            <FaInfinity />
                          ) : !product.productExpire ? (
                            "--"
                          ) : (
                            product.productExpire
                          )}
                        </TableCellTotal>
                        <TableCell align="center">
                          <UniInput>
                            <InputStock
                              placeholder={calculateToOrder(
                                product.productCode
                              ).toString()}
                              type="number"
                              name="productsInput"
                              value={inputValues[product.productCode] || ""}
                              onChange={(e) =>
                                handleInputChange(
                                  product.productCode,
                                  e.target.value
                                )
                              }
                            />
                            <CalcButton
                              onClick={() =>
                                handleCalculation(product.productCode)
                              }
                            >
                              =
                            </CalcButton>
                          </UniInput>
                        </TableCell>
                        <TableCell>
                          <ForeButton to={`/stock/${product.productCode}`}>
                            More
                          </ForeButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </tbody>
            </TableContainer>
          </ExpandedCardContent>
        </ExpandedCard>
      )}
    </>
  );
};

const StyledProductCode = styled.div`
  padding: 5px;
  background-color: ${(props) => props.bgcolor || "transparent"};
  border-radius: 5px;
  color: #fff;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
  color: #909090;
  font-weight: 500;
  text-wrap: nowrap;
  background: ${(props) => props.theme.componentBackground};
  span {
    display: block;
    text-align: inherit;
  }
`;

const RightKontainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TableCellCode = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.line};
  font-weight: 600;
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
`;
export const TableCellOrder = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.line};
  color: ${(props) => props.theme.menuHeading};
  font-weight: 700;
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
`;
export const TableCellInc = styled.td`
  padding: 10px;
  color: ${(props) => props.theme.inc};
  border-bottom: 1px solid ${(props) => props.theme.line};
  font-weight: 700;
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
`;

export const TableCellTotal = styled.td`
  padding: 10px;
  font-weight: 600;
  border-bottom: 1px solid ${(props) => props.theme.line};
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
  color: ${(props) => props.color || ""};
`;

const UniInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
`;
export const InputStock = styled.input`
    border: 1px solid ${(props) => props.theme.nav};
    border-radius: 4px;
    font-size: 14px;
    color:  ${(props) => props.theme.text};
    background: ${(props) => props.theme.InputText};
    outline: none;
    transition: border-color 0.3s ease;
    height: 40px;
    width: 55px;
    text-align: center;
    onChange={(e) => setInputValue(e.target.value)};
`;

const UniInput2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
`;
export const InputStock2 = styled.input`
    border: 1px solid ${(props) => props.theme.nav};
    border-radius: 4px;
    font-size: 14px;
    color:  ${(props) => props.theme.text};
    background: ${(props) => props.theme.InputText};
    outline: none;
    transition: border-color 0.3s ease;
    height: 40px;
    width: 55px;
    text-align: center;
    onChange={(e) => setInputValue(e.target.value)};
`;

export const CardContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.nav};
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-bottom-left-radius: ${(props) => (props.expanded ? "0" : "10px")};
  border-bottom-right-radius: ${(props) => (props.expanded ? "0" : "10px")};
`;

const CardHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const CardTitlee = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CodeTitle = styled.h3`
  margin-left: 5px;
  margin-right: 15px;
  font-size: 16px;
  color: ${(props) => props.theme.textCard};
  font-weight: 500;
`;

const ExpandIcon = styled(FaChevronDown)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.expanded ? "rotate(180deg)" : "rotate(0deg)")};
`;

const ExpandedCard = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: ${(props) => (props.notopradius ? "0" : "10px")}
    ${(props) => (props.notopradius ? "0" : "10px")} 10px 10px;
  padding: 20px;
  //max-height: ${(props) => (props.expanded ? "1000px" : "0")};
  overflow: hidden;
  animation: ${(props) => (props.expanded ? slideDown : slideUp)} 0.3s
    ease-in-out;
  overflow-x: auto;
  width: ${(props) => (props.expanded ? props.width + "px" : "fit-content")};
  min-width: ${(props) => (props.expanded ? props.width + "px" : "100%")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ExpandedCardContent = styled.div`
  /* Limit the width of the expanded content to the card's width */
  max-width: 100%;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* Remove fixed width from the table */
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableRow = styled.tr``;

// const MoreButton = styled.button`
//   background-color: #d54529;
//   color: #fff;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: 500;
// `;

const CalcButton = styled.button`
  background-color: #575757;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
`;

export const ForeButton = styled(NavLink)`
  background-color: ${(props) => props.theme.componentBackground};
  color: ${(props) => props.theme.text};
  padding: 5px 10px;
  border: 3px solid #575757;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  text-wrap: nowrap;

  &:hover {
    background-color: #575757;
    color: #fff;
  }
`;

export const TeamBulletI = styled(TiMediaRecord)`
  color: #1c3a57;
  font-size: 14px;
`;

export const TeamBulletO = styled(TiMediaRecord)`
  color: #484c51;
  font-size: 14px;
`;

export const IncomingBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #1c3a57;
  margin: 0 0 0 20px;
  background-color: #bdd9ff;
  min-width: fit-content;
  width: 90px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const OnOrderBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #484c51;
  margin: 0 0 0 20px;
  background-color: #d5d5d5;
  min-width: fit-content;
  width: 90px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ExpiryBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #a72e39;
  background-color: #efcbcb;
  margin: 0 0 0 20px;
  min-width: fit-content;
  width: 90px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;

export default StockCard;
