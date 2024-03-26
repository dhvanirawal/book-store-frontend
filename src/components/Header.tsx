import { Flex, Group, Indicator, Menu, rem, Text } from "@mantine/core";
import {
  IconBrandBooking,
  IconLogout2,
  IconMessageCircle,
  IconShoppingBag,
} from "@tabler/icons-react";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../core/AuthContext";
import { useEffect } from "react";
import AuthService from "../core/Auth.service";
import { useCartCountContext } from "../core/CartCountContext";

export function Header() {
  const navigate = useNavigate();

  const { authData, setAuthData } = useAuthContext();
  const { totalCartItems } = useCartCountContext();

  useEffect(() => {
    if (!authData) {
      setAuthData(AuthService.getAuthData());
    }
  }, [authData, setAuthData]);
  return (
    <Flex justify={"space-between"} align={"center"} px={4} h={120}>
      <Group onClick={() => navigate("/")}>
        <IconBrandBooking stroke={2} size={64} />

        <Text fz={24} fw={700} lts={2} lh={1.1} c={"#020101"}>
          Bookshelf <br />
          Bash
        </Text>
      </Group>
      {authData ? (
        <Group>
          <Indicator
            size={22}
            withBorder
            label={
              <Text fz={8} style={{ textAlign: "center" }} p={2}>
                {totalCartItems}
              </Text>
            }
            onClick={() => navigate("/cart")}
          >
            <IconShoppingBag stroke={2} />
          </Indicator>

          <Menu shadow="md" withArrow width={200} position={"bottom-end"}>
            <Menu.Target>
              <Text style={{ cursor: "pointer" }}>{authData.name}</Text>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconShoppingBag
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
                onClick={() => navigate("/cart")}
              >
                Cart
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessageCircle
                    style={{ width: rem(14), height: rem(14) }}
                  />
                }
                onClick={() => navigate("/orders")}
              >
                Orders
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout2 style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {
                  localStorage.removeItem("auth_data");
                  setAuthData(null);
                  navigate("/");
                }}
              >
                Log out
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <Text
          tt={"uppercase"}
          fw={700}
          lts={2}
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </Text>
      )}
    </Flex>
  );
}
