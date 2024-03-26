import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AuthService from "../core/Auth.service";
import useNotificationHook from "../shared/useNotificationHook";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useAuthContext } from "../core/AuthContext";
import { useEffect } from "react";
import BookService from "../shared/book.service";
import { useCartCountContext } from "../core/CartCountContext";

interface ILoginForm {
  email: string;
  password: string;
}
function Login() {
  const navigate = useNavigate();

  const { setAuthData } = useAuthContext();
  const { setTotalCartItems } = useCartCountContext();
  const { notify } = useNotificationHook();
  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .test("Email", "Please enter valid email", (value) => {
        if (!value || value.length === 0) {
          return true;
        }
        return /^[A-Za-z0-9]+(?:[._%+-][A-Za-z0-9]+)*@[A-Za-z0-9]+[-.]*[A-Za-z0-9]+\.[A-Za-z]{2,}$/i.test(
          value
        );
      })
      .required("Email is required"),

    password: Yup.string().required("Password is required"),
  });

  const loginForm = useForm<ILoginForm>({
    validate: yupResolver(loginValidationSchema),
    initialValues: {
      email: "",
      password: "",
    },
  });
  const userLogin = () => {
    loginForm.validate();
    if (loginForm.isValid()) {
      AuthService.userLogin({
        email: loginForm.values.email,
        password: loginForm.values.password,
      })
        .then((res) => {
          if (res.status === "success") {
            setAuthData(res.data);
            AuthService.setAuthData(res.data);
            BookService.getCartDetailByUser().then((resCart) => {
              if (resCart.status === "success") {
                setTotalCartItems(resCart.data.length);
              }
            });
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("ERROR AT C", error);

          notify({
            id: "login_error",
            title: "Error",
            message: error.message,
            errorType: "error",
          });
        });
    }
  };

  useEffect(() => {
    if (AuthService.getAuthData() !== null) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <Flex
      justify={"center"}
      direction={"column"}
      align={"center"}
      h={"100vh"}
      style={{ borderTop: "8px solid #bd2c1c" }}
    >
      <form autoComplete="off">
        <Box
          p={{ base: 20, md: 40 }}
          w={{ base: "100%", md: 500 }}
          h={300}
          bg={"#FFFFFF"}
          style={{
            border: "1px solid #202010",
            boxShadow: "-10px 10px #bd2c1c",
          }}
        >
          <Flex
            direction={"column"}
            justify={"space-between"}
            align={"center"}
            h={"100%"}
          >
            <Box
              w={"100%"}
              maw={"300px"}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
              mb={20}
            >
              <TextInput
                radius={0}
                w={"100%"}
                placeholder="Email"
                {...loginForm.getInputProps("email")}
              />
              <TextInput
                radius={0}
                placeholder="Password"
                type={"password"}
                {...loginForm.getInputProps("password")}
              />
            </Box>
            <Button
              bg={"#020101"}
              radius={0}
              color={"#f6f0e6"}
              tt={"uppercase"}
              onClick={() => {
                userLogin();
              }}
            >
              Login
            </Button>

            <Text>or</Text>
            <Text
              style={{ color: "#bd2c1c", cursor: "pointer" }}
              tt={"uppercase"}
              lts={4}
              fw={700}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </Text>
          </Flex>
        </Box>
      </form>
      <Text
        style={{ cursor: "pointer" }}
        td={"underline"}
        onClick={() => {
          navigate("/");
        }}
        mt={48}
      >
        Go to home page
      </Text>
    </Flex>
  );
}

export default Login;
