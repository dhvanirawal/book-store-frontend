import {
  Box,
  Button,
  Container,
  Flex,
  Group,
  Image,
  Text,
} from "@mantine/core";

export function Hero() {
  return (
    <Box bg={"#e1755e"} style={{ borderTop: "8px solid #bd2c1c" }}>
      <Container maw={"1536px"}>
        <Flex justify={"space-around"} align={"center"} h={650}>
          <Box
            p={40}
            w={500}
            h={450}
            bg={"#f6f0e6"}
            style={{
              boxShadow: "-10px 10px #bd2c1c",
            }}
          >
            <Flex direction={"column"} gap={4}>
              <Text>Book shop one stop solution...!!!</Text>

              <Group align={"baseline"} gap={38}>
                <Text fz={60} fw={700}>
                  New B<span style={{ color: "#bd2c1c" }}>oo</span>ks{" "}
                </Text>
                <Text fz={22} fw={600}>
                  for{" "}
                </Text>
              </Group>
              <Text mt={-32} fz={60} fw={700}>
                Nerd Crooks{" "}
              </Text>
            </Flex>

            <Text mb={48} lts={1.7}>
              Be one of the first to touch and review the early publications of
              new books before it is available elsewhere.
            </Text>
            <Flex gap={24}>
              <Button
                bg={"#020101"}
                radius={0}
                color={"#f6f0e6"}
                tt={"uppercase"}
              >
                Browse books
              </Button>
              <Button color="#020101" radius={0} variant="outline">
                Publish books
              </Button>
            </Flex>
          </Box>
          <Box
            p={30}
            w={350}
            h={500}
            style={{
              transform: "rotate(15deg)",
              boxShadow:
                "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            }}
            bg={"#ece0cc"}
          >
            <Box>
              <Flex justify={"space-between"} mb={60}>
                <Text fz={14} fw={700}>
                  2**
                </Text>
                <Text fz={14} tt={"uppercase"} fw={700}>
                  J.J Johnson{" "}
                </Text>
              </Flex>

              <Flex justify={"center"}>
                <Image h={150} w={150} src={"/book_cover.svg"} />
              </Flex>

              <Box>
                <Text tt={"uppercase"} fz={66} fw={700} mb={-24}>
                  rules
                </Text>
                <Text
                  tt={"uppercase"}
                  fz={60}
                  fw={600}
                  style={{
                    transform: "rotate(-15deg)",
                    display: "inline-block",
                  }}
                >
                  of{" "}
                </Text>
                <Text mt={-30} tt={"uppercase"} fz={66} fw={700}>
                  passion
                </Text>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
