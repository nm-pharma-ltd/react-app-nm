import React, { createContext, useReducer, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./themes";
import { GlobalStyles } from "../GlobalStyles";

// Identifikátor lokálního úložiště
const LOCAL_STORAGE_ID = "NMPHARMA_LEGENDS_BIGGEST_PENISES_IN_MALTA";

// Konstanty pro akce v reduceru
export const NOTES = "NOTE";
export const SIGNEDUSER = "SIGNED_USER";
export const LOGOUT = "LOGOUT";
export const USER_ID = "USER_ID"
export const TOGGLE_THEME = "TOGGLE_THEME";
export const TOGGLE_HIDE_TEAMS = "TOGGLE_HIDE_TEAMS";
export const TOGGLE_ROUNDED_NAV = "TOGGLE_ROUNDED_NAV";

// Výchozí stav pro globální kontext
const initialState = { messages: [], user: "", theme: "light", hideTeams: false, roundedNav: true };
// Reduktor pro změnu stavu dat
const dataReducer = (state, action) => {
  switch (action.type) {
    case SIGNEDUSER: {
      return {
        ...state,
        user: action.payload.response,
      };
    }
    case NOTES: {
      return {
        ...state,
        messages: action.payload.messages
      };
    }
    case LOGOUT: {
        return initialState;
    }
    case TOGGLE_THEME: {
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light", // Toggle the theme
      };
    }
    case TOGGLE_HIDE_TEAMS:
      return {
        ...state,
        hideTeams: !state.hideTeams,
      };
    case TOGGLE_ROUNDED_NAV:
      return {
        ...state,
        roundedNav: !state.roundedNav,
      };
    default: {
      // In the case of other actions, we return the unchanged state
      return state;
    }
  }
};


// Vytvoření kontextu pro globální stav
export const Context = createContext();

// Komponenta Provider poskytující globální stav
export const Provider = ({ children }) => {
  // Načtení dat z lokálního úložiště, nebo použití výchozího stavu
  // Initial data from local storage
  let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID)) || initialState;

  // Použití reduktoru pro správu stavu a získání stavu a dispečera
  const [store, dispatch] = useReducer(dataReducer, storedData);

  const theme = store.theme === "light" ? lightTheme : darkTheme;

  // Efekt pro uložení aktuálního stavu do lokálního úložiště při změně stavu zpráv
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
    console.log(store.roundedNav);
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