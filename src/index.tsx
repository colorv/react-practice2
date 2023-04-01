import React from "react";
import ReactDOM from "react-dom/client";
import reset from "styled-reset";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { createGlobalStyle } from "styled-components";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const GlobalStyle = createGlobalStyle`
  ${reset}  
  body {
    background-color: ${({ theme }) => theme.black.bgColor};
    color: ${({ theme }) => theme.white.darker};
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  a{
    color: inherit;
    text-decoration: none;
    &:visited{
      color: inherit;
    }
  }
  @media screen and (min-width: 1400px) {
    .slider-item {
      width: 16.2%;
    }
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    .slider-item {
      width: 19.55%;
    }
    
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    .slider-item {
      width: 24.5%;
    }
  }
  @media screen and (min-width: 500px) and (max-width: 799px) {
    .slider-item {
      width: 32.9%;
    }
    .overView{
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
    .header-title{
      font-size: 12px;
    }
    .info-btn {
      padding: 0.8vw 2.3vw 0.8vw 2vw;
    }
  }
`;

const client = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
