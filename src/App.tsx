import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div>
        <Router></Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
