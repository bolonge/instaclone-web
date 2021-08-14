import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from 'styled-reset'

export const lightTheme: DefaultTheme = {
    accent: "#0096f6",
    borderColor: "rgb(219,219,219)"
};

export const darkTheme: DefaultTheme = {
    accent: "",
    borderColor: ""
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
        all:unset;
    }
    * {
        box-sizing:border-box;
    }
    body {
        background-color: #FAFAFA;
        font-size:14px;
        font-family:'Open Sans', sans-serif;
    }
    a {
      text-decoration: none;
    }
`