import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from 'styled-reset'

export const lightTheme: DefaultTheme = {
    accent: "#0096f6",
    borderColor: "rgb(219,219,219)",
    bgColor: "#FAFAFA",
    fontColor: "rgb(38,38,38)"
};

export const darkTheme: DefaultTheme = {
    accent: "",
    borderColor: "",
    bgColor: "#000",
    fontColor: "#fff"
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
        background-color: ${props => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${props => props.theme.fontColor}
    }
    a {
      text-decoration: none;
    }
`