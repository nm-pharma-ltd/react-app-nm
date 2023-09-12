import React, { createContext, useReducer, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { GlobalStyles } from "../GlobalStyles";

const LOCAL_STORAGE_ID = "NMPHARMA_LEGENDS_BIGGEST_PENISES_IN_MALTA";

export const NOTES = "NOTE";
export const SIGNEDUSER = "SIGNED_USER";
export const PRODUCTS = "PRODUCTS";
export const CLIENTS = "CLIENTS";
export const LOGOUT = "LOGOUT";
export const TOGGLE_THEME = "TOGGLE_THEME";
export const TOGGLE_HIDE_TEAMS = "TOGGLE_HIDE_TEAMS";
export const TOGGLE_ROUNDED_NAV = "TOGGLE_ROUNDED_NAV";
export const TEAMS = "TEAMS";
export const TEAM_COLORS = "TEAM_COLORS";
export const CLEAR_USER = "CLEAR_USER";


const initialState = { messages: [], products: [], clients: [], user: "", token: "", theme: "light", hideTeams: false, roundednav: true, teams: [], team_colors : [
  "linear-gradient(to bottom right, #a48300, #ffcf40, #9f7700)", //Gold
  "linear-gradient(to bottom right,  #646464,#c0c0c0 , #868585)",//Silver
  "linear-gradient(to bottom right, #742700, #ff7f50, #cc6849)", //Bronze
  'linear-gradient(to bottom right, #366784, #305451, #35576d)', // Red-Green-Blue
  'linear-gradient(to bottom right, #ff5733, #ff33fc, #3366ff)', // Pink-Purple-Blue
  'linear-gradient(to bottom right, #ff9900, #ffff33, #66ff66)', // Orange-Yellow-Green
  'linear-gradient(to bottom right, #9966ff, #ff66cc, #ff6666)', // Purple-Pink-Red
], };

const dataReducer = (state, action) => {
  switch (action.type) {
    case SIGNEDUSER:
      return {
        ...state,
        user: action.payload.response,
      };
      case LOGOUT:
        const { theme, hideTeams, roundednav } = state;
        return {
          ...initialState,
          theme,
          hideTeams,
          roundednav,
          user: "",
          token: ""
        };  
      case PRODUCTS:
        return{
          ...state, 
          products: action.payload.processedData
        };
        case CLIENTS:
        return{
          ...state, 
          clients: action.payload.processedPharmacies
        };
    case NOTES:
      return {
        ...state,
        messages: action.payload.messages
      };
    case TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case TOGGLE_HIDE_TEAMS:
      return {
        ...state,
        hideTeams: !state.hideTeams,
      };
      
      case TEAMS: {
        return {
          ...state,
          teams: action.payload.response.sort(
            (a, b) => b.salesThisYear - a.salesThisYear
          ),
        };
      }

      case TEAM_COLORS: {
        return {
          ...state,
          team_colors: action.payload.response,
        };
      }

    case TOGGLE_ROUNDED_NAV:
      return {
        ...state,
        roundednav: !state.roundednav,
      };
    case CLEAR_USER:
      return{ ...state, user: ""}
    

    default:
      return state;
  }
};

export const Context = createContext();

export const Provider = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID)) || initialState;
  const [store, dispatch] = useReducer(dataReducer, storedData);
  const theme = store.theme === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
  }, [store]);
  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Context.Provider value={[store, dispatch]}>
        {children}
      </Context.Provider>
    </ThemeProvider>
  );
};
