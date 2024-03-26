import { useEffect, useState } from "react";
import { Hero } from "../components/Hero";
import BookService from "../shared/book.service";
import BookList from "../components/BookList";
import { Book } from "../shared/book.model";

function Home() {
  const [bookList, setBookList] = useState<Book[]>([]);
  useEffect(() => {
    BookService.getAllBooks().then((response) => {
      console.log(response);
      setBookList(response.data.books);
    });
  }, []);

  return (
    <>
      <Hero />
      <BookList bookList={bookList} />
    </>
  );
}

export default Home;
