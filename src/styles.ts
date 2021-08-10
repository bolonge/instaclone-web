import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from 'styled-reset'

export const lightTheme: DefaultTheme = {
    fontColor: "#2c2c2c",
    bgColor: "lightgray",
};

export const darkTheme: DefaultTheme = {
    fontColor: "white",
    bgColor: "#2c2c2c",
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
`