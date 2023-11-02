import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token || false;
};

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <BrowserRouter>
          <Switch>
            {getToken() ? (
              <>
                <Route path={`/admin`} component={AdminLayout} />
                <Route path={`/rtl`} component={RtlLayout} />
                <Redirect from="/" to="/admin" />
              </>
            ) : (
              <>
                <Route path={`/auth`} component={AuthLayout} />
                <Redirect from="/" to="/auth/sign-in" />
              </>
            )}
          </Switch>
        </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
