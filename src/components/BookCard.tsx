import { Image, Text, Badge, Button, Box, Flex, Tooltip } from "@mantine/core";
import { Book } from "../shared/book.model";
import { useAuthContext } from "../core/AuthContext";
import useNotificationHook from "../shared/useNotificationHook";
import BookService from "../shared/book.service";
import { useCartCountContext } from "../core/CartCountContext";

interface IBookCardProps {
  book: Book;
}

export function BookCardView(props: IBookCardProps) {
  const { book } = props;
  const { _id, title, thumbnail, language, pageCount } = book;
  const { authData } = useAuthContext();
  const { setTotalCartItems } = useCartCountContext();
  const { notify } = useNotificationHook();
  const addToCart = (bookId: string) => {
    if (!authData) {
      notify({
        id: "login_error",
        errorType: "error",
        message: "Please login to add to cart",
      });
      return;
    }

    BookService.addToCart({ bookId }).then((response) => {
      console.log(response);

      BookService.getCartDetailByUser().then((resCart) => {
        if (resCart.status === "success") {
          setTotalCartItems(resCart.data.length);
        }
      });
    });
  };

  return (
    <Box style={{ boxShadow: "-2px 2px 1px #bd2c1c" }} p={8} bg={"#f6f0e6"}>
      <Flex gap={20} direction={"column"} h={"100%"}>
        <Box
          style={{ alignSelf: "center", border: "3px solid #202010" }}
          w={150}
          h={200}
        >
          <Image w={"100%"} h={"100%"} src={thumbnail} alt={title} />
        </Box>
        <Flex
          direction={"column"}
          justify={"space-between"}
          style={{ flexGrow: 1 }}
        >
          <Box>
            <Tooltip
              multiline
              w={220}
              withArrow
              transitionProps={{ duration: 200 }}
              label={title}
              color="gray"
            >
              <Text fz={16} fw={500} truncate="end">
                {title}
              </Text>
            </Tooltip>

            <Flex justify={"space-between"} mt={15}>
              <Text fz={12} fw={500}>
                Language <Badge variant="light">{language}</Badge>
              </Text>

              <Text fz={12} fw={500}>
                Pages <Badge variant="outline">{pageCount}</Badge>
              </Text>
            </Flex>
          </Box>
          {/* buttons */}
          <Flex justify={"space-between"} align={"center"} mt={20}>
            <Button
              variant="outline"
              radius={0}
              // rightSection={<IconFileDots />}
              color={"#946434"}
            >
              Read more
            </Button>
            <Button
              radius={0}
              variant="filled"
              color={"#202010"}
              onClick={() => {
                addToCart(_id);
              }}
            >
              Add to Cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
