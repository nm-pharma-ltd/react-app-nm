import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
 
  html {
    color: ${props => props.theme.text};
    background-color: ${props => props.theme.background};
  }

  /* body {
    background-image: ${props => props.theme.gradient};
    color: ${props => props.theme.textColor};
    } */

  ::-webkit-scrollbar {
    width: 10px; 
  }

  ::-webkit-scrollbar-track {
    background-color: ${props => props.theme.scrollbarTrack || '#f1f1f1'};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.scrollbarThumb || '#888'};
    border-radius: 4px; 
  }
`;
