import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import BookService from "../shared/book.service";
import { ICartItem } from "../shared/book.model";
import { IconMoodLookDown, IconTrash } from "@tabler/icons-react";
import useNotificationHook from "../shared/useNotificationHook";
import { useCartCountContext } from "../core/CartCountContext";

function Cart() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { notify } = useNotificationHook();
  const { setTotalCartItems } = useCartCountContext();

  const placeOrder = () => {
    BookService.placeOrder().then((res) => {
      if (res.status === "success") {
        notify({
          id: "order_placed",
          title: "Success",
          message: res.message,
          errorType: "success",
        });
        setTotalPrice(0);
        setCartItems([]);
        setTotalCartItems(0);
      }
    });
  };

  const deleteItem = (cartItemId: string) => {
    BookService.deleteCartItem(cartItemId).then((res) => {
      if (res.status === "success") {
        notify({
          id: "order_placed",
          title: "Success",
          message: res.message,
          errorType: "success",
        });
        setCartItems(res.data);
        const totalPriceCalculate = [...res.data].reduce((total, item) => {
          return total + item.book.price * item.quantity;
        }, 0);
        setTotalPrice(totalPriceCalculate);
      }
    });
  };

  useEffect(() => {
    BookService.getCartDetailByUser().then((resCart) => {
      if (resCart.status === "success") {
        setCartItems(resCart.data);
        const totalPriceCalculate = [...resCart.data].reduce((total, item) => {
          return total + item.book.price * item.quantity;
        }, 0);
        setTotalPrice(totalPriceCalculate);
      }
    });
  }, []);
  return (
    <Box style={{ borderTop: "8px solid #78A083" }} bg={"#DDE6ED"}>
      <Container maw={"1536px"}>
        {cartItems.length === 0 && (
          <Flex
            justify={"center"}
            direction={"column"}
            align={"center"}
            h={"100vh"}
          >
            <Group>
              <Text fz={48} fw={700} style={{ textAlign: "center" }}>
                Your cart is empty.
              </Text>
              <IconMoodLookDown size={64} stroke={2} color={"#78A083"} />
            </Group>
          </Flex>
        )}

        {cartItems.length > 0 && (
          <Flex
            justify={"space-between"}
            direction={"column"}
            align={"center"}
            h={"100%"}
            mt={70}
            pb={70}
            gap={48}
          >
            <Flex
              style={{ flexGrow: 1 }}
              gap={10}
              direction={"column"}
              w={"100%"}
              h={"100%"}
            >
              {cartItems.map((cartItem) => (
                <Flex
                  key={cartItem._id}
                  gap={20}
                  justify={"space-between"}
                  align={"center"}
                  style={{
                    width: "100%",
                    border: "1px solid #78A083",
                    padding: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Flex gap={20} align={"center"} maw={500}>
                    <Image
                      src={cartItem.book.thumbnail}
                      alt={cartItem.book.title}
                      h={50}
                      w={30}
                    />
                    <Tooltip
                      multiline
                      w={220}
                      withArrow
                      transitionProps={{ duration: 200 }}
                      label={cartItem.book.title}
                      color="gray"
                    >
                      <Text fz={16} fw={500} truncate="end">
                        {cartItem.book.title}
                      </Text>
                    </Tooltip>
                  </Flex>
                  <Box style={{ alignSelf: "flex-end" }}>
                    <Text>{cartItem.book.price}</Text>
                  </Box>
                  <Box>
                    <IconTrash
                      size={24}
                      stroke={2}
                      color={"red"}
                      onClick={() => deleteItem(cartItem._id)}
                    />
                  </Box>
                </Flex>
              ))}
            </Flex>

            <Flex gap={20} align={"center"} w={"100%"} direction={"column"}>
              <Text fw={700}>Total: {totalPrice}</Text>
              <Button
                variant="filled"
                w={200}
                radius={0}
                bg={"#2d2d2d"}
                onClick={() => {
                  placeOrder();
                }}
              >
                Place order
              </Button>
            </Flex>
          </Flex>
        )}
      </Container>
    </Box>
  );
}

export default Cart;
