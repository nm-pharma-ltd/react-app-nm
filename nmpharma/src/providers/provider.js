import React, { createContext, useReducer, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { GlobalStyles } from "../GlobalStyles";

const LOCAL_STORAGE_ID = "NMPHARMA_LEGENDS_BIGGEST_PENISES_IN_MALTA";

export const NOTES = "NOTE";
export const SIGNEDUSER = "SIGNED_USER";
export const LOGOUT = "LOGOUT";
export const TOGGLE_THEME = "TOGGLE_THEME";
export const TOGGLE_HIDE_TEAMS = "TOGGLE_HIDE_TEAMS";
export const TOGGLE_ROUNDED_NAV = "TOGGLE_ROUNDED_NAV";
export const TEAMS = "TEAMS";

const initialState = { messages: [], user: "", theme: "light", hideTeams: false, roundedNav: true, teams: [], };

const dataReducer = (state, action) => {
  switch (action.type) {
    case SIGNEDUSER:
      return {
        ...state,
        user: action.payload.response,
      };
    case LOGOUT:
      const { theme, hideTeams, roundedNav } = state;
      return {
        ...initialState,
        theme,
        hideTeams,
        roundedNav
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
          teams: action.payload.response,
        };
      }

    case TOGGLE_ROUNDED_NAV:
      return {
        ...state,
        roundedNav: !state.roundedNav,
      };

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
    if (!store.user) return;
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
