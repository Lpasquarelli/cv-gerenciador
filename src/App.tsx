import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ApplicationLayout from "./layouts/ApplicationLayout/ApplicationLayout";
import Home from "./pages/Home/Home";
import ListaClientes from "./pages/Clientes/ListaClientes/ListaClientes";
import TestComponents from "./pages/TestComponents/TestComponents";
import LoginLayout from "./layouts/LoginLayout/LoginLayout";
import Login from "./pages/Login/Login";
import { selectAuthAttributs } from "./redux/features/generalData/generalDataSelectors";
import { useSelector } from "react-redux";
import Defaultlayout from "./layouts/DefaultLayout/Defaultlayout";
import ClienteLayout from "./layouts/ClienteLayout/ClienteLayout";
import Account from "./pages/Account/Account";
// import { useThemeSelectorContext } from "./providers/ThemeProvider/ThemeSelectorProvider";
import { ThemeProvider } from "styled-components";
import UsuarioLayout from "./layouts/UsuarioLayout/UsuarioLayout";
import { Light, useThemeSelectorContext } from "ui-gds";
const App: React.FunctionComponent = (): JSX.Element => {
    const auth = useSelector(selectAuthAttributs);
    const { selectedTheme } = useThemeSelectorContext();
    return (
        <BrowserRouter>
            <ThemeProvider theme={selectedTheme}>
                <Routes>
                    <Route path="/" element={<Defaultlayout />}>
                        {auth === "LoggedOut" && (
                            <Route path="/" element={<Defaultlayout />}>
                                <Route path="*" element={<Navigate to="/" />} />
                                <Route path="/" element={<LoginLayout />} />
                            </Route>
                        )}
                        {auth === "LoggedIn" && (
                            <Route path="/" element={<ApplicationLayout />}>
                                <Route index element={<Navigate to="home" />} />
                                <Route path="home" element={<Home />} />

                                <Route
                                    path="MyAccount"
                                    element={<Defaultlayout />}
                                >
                                    <Route index element={<Account />} />
                                </Route>
                                <Route
                                    path="clientes"
                                    element={<ClienteLayout />}
                                />
                                <Route
                                    path="usuarios"
                                    element={<UsuarioLayout />}
                                />
                                <Route
                                    path="components"
                                    element={<TestComponents />}
                                />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Route>
                        )}
                    </Route>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
