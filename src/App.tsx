import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact></Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp}>
              <SignUp></SignUp>
            </Route>
          ) : null}
          <Route></Route>
        </Switch>
        <Login></Login>
      </Router>
    </ThemeProvider>
  );
}

export default App;
