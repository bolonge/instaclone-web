import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Login from "./screens/Login";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import routes from "./routes";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import { HelmetProvider } from "react-helmet-async";
import Home from "./screens/Home";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SignUp />
                </Route>
              ) : null}
              <Route path={`/users/:username`}>
                <Layout>
                  <Profile></Profile>
                </Layout>
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
