import { Box, Container, SimpleGrid, Text } from "@mantine/core";
import { BookCardView } from "./BookCard";
import { Book } from "../shared/book.model";

interface IBookListProps {
  bookList: Book[];
}

function BookList(props: IBookListProps) {
  const { bookList } = props;
  return (
    <Box bg={"#f0cd71"} pb={72}>
      <Container maw={"1536px"}>
        <Text>All Books</Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={20} mt={20}>
          {bookList.map((book) => (
            <BookCardView key={book._id} book={book} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default BookList;
