import React, { createContext, useReducer, useEffect } from "react";

// Identifikátor lokálního úložiště
const LOCAL_STORAGE_ID = "NMPHARMA_LEGENDS_BIGGEST_PENISES_IN_MALTA";

// Konstanty pro akce v reduceru
export const NOTES = "NOTE";
export const SIGNEDUSER = "SIGNED_USER";

// Výchozí stav pro globální kontext
const initialState = { messages: [], user: "", token: "", name: "", email: "", password: "" };

// Reduktor pro změnu stavu dat
const dataReducer = (state, action) => {
  switch (action.type) {

    case SIGNEDUSER: {
      // Update all user-related data in the state
      return { 
        ...state, 
        user: action.payload.user, 
        token: action.payload.token, 
        name: action.payload.name, 
        email: action.payload.email,
        password: action.payload.password 
      };
    }    
    
    case NOTES: {
      // Změna stavu zpráv na nový seznam zpráv z payload akce
      return { ...state, messages: action.payload.messages };
    }
    default: {
      // V případě jiných akcí vrátíme nezměněný stav
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

  // Získání seznamu zpráv ze stavu, nebo použití prázdného pole
  const messages = store.messages || [];

  // Efekt pro uložení aktuálního stavu do lokálního úložiště při změně stavu zpráv
  useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(store));
}, [store]);


  // Poskytnutí stavu a dispečera komponentám v hierarchii
  return (
    <Context.Provider value={[store, dispatch]}>
      {children}
    </Context.Provider>
  );
};
