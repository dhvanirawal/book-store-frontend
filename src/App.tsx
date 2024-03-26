/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container } from "@mantine/core";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AuthContextProvider, { useAuthContext } from "./core/AuthContext";
import Interceptor from "./core/Interceptor";
import Register from "./pages/Register";
import { Header } from "./components/Header";
import AuthService from "./core/Auth.service";
import { useEffect } from "react";
import CartCountContextProvider from "./core/CartCountContext";
import Cart from "./pages/Cart";

function App() {
  const { setAuthData } = useAuthContext();

  const location = useLocation();

  useEffect(() => {
    const authDataLocal = AuthService.getAuthData();
    if (authDataLocal) {
      setAuthData(authDataLocal);
    }
  }, []);
  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: "#f6f0e6",
      }}
    >
      <AuthContextProvider>
        <CartCountContextProvider>
          <Interceptor />
          {location.pathname !== "/signup" &&
            location.pathname !== "/login" && (
              <Box
                bg={"#ffc5b7"}
                style={{ position: "sticky", top: 0, zIndex: 10 }}
              >
                <Container maw={"1536px"}>
                  <Header />
                </Container>
              </Box>
            )}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </CartCountContextProvider>
      </AuthContextProvider>
    </Box>
  );
}

export default App;
