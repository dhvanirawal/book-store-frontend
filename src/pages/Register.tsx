import { Box, Button, Flex, Text, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import AuthService from "../core/Auth.service";
import useNotificationHook from "../shared/useNotificationHook";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useEffect } from "react";
interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
function Register() {
  const navigate = useNavigate();
  const { notify } = useNotificationHook();
  const yourInformationValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),

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
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Passwords must match")
      .required("Password confirmation is required"),
  });

  const registerForm = useForm<IRegisterForm>({
    validate: yupResolver(yourInformationValidationSchema),
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
    },
  });
  const userRegister = () => {
    registerForm.validate();
    if (registerForm.isValid()) {
      AuthService.userSignup({
        name: registerForm.values.name,
        email: registerForm.values.email,
        password: registerForm.values.password,
        passwordConfirm: registerForm.values.passwordConfirm,
      })
        .then((res) => {
          if (res.status === "success") {
            notify({
              id: "register",
              title: "Success",
              message: res.message,
              errorType: "success",
            });
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log("ERROR at component", error);

          notify({
            id: "register",
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
    <>
      <Flex
        justify={"center"}
        direction={"column"}
        align={"center"}
        h={"100vh"}
        style={{ borderTop: "8px solid #bd2c1c" }}
      >
        <Box
          p={{ base: 20, md: 40 }}
          w={{ base: "100%", md: 500 }}
          bg={"#FFFFFF"}
          style={{
            border: "1px solid #202010",
            boxShadow: "-10px 10px #bd2c1c",
          }}
        >
          <form autoComplete="off">
            <Flex
              direction={"column"}
              justify={"space-between"}
              align={"center"}
              h={"100%"}
            >
              <Box
                w={"100%"}
                maw={"300px"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
                mb={20}
              >
                <TextInput
                  radius={0}
                  w={"100%"}
                  placeholder="Name"
                  {...registerForm.getInputProps("name")}
                />
                <TextInput
                  radius={0}
                  w={"100%"}
                  placeholder="Email"
                  {...registerForm.getInputProps("email")}
                />
                <TextInput
                  radius={0}
                  w={"100%"}
                  placeholder="Password"
                  type={"password"}
                  {...registerForm.getInputProps("password")}
                />
                <TextInput
                  radius={0}
                  w={"100%"}
                  placeholder="Confirm Password"
                  type={"password"}
                  {...registerForm.getInputProps("passwordConfirm")}
                />
              </Box>
              <Button
                bg={"#020101"}
                radius={0}
                color={"#f6f0e6"}
                tt={"uppercase"}
                onClick={() => {
                  userRegister();
                }}
              >
                Sign up
              </Button>

              <Text>or</Text>
              <Text
                style={{ color: "#bd2c1c", cursor: "pointer" }}
                tt={"uppercase"}
                lts={4}
                fw={700}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Log in
              </Text>
            </Flex>
          </form>
        </Box>
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
    </>
  );
}

export default Register;
