import { IBase } from "./global.model";

export interface Book {
  categories: string[];
  authors: string[];
  _id: string;
  title: string;
  subTitle?: string;
  description: string;
  publisher?: string;
  publishedDate: string;
  language: string;
  pageCount: number;
  thumbnail: string;
  previewLink: string;
  price: number;
}
export interface IBooks {
  books: Book[];
}
export interface IBookResponse extends IBase<IBooks> {}
export interface IAddToCart {
  cart: Cart;
}

export interface Cart {
  _id: string;
  user: string;
  items: Item[];
  __v: number;
}

export interface Item {
  quantity: number;
  _id: string;
  book: string;
}

export interface IAddToCartResponse extends IBase<IAddToCart> {}

export interface ICartItem {
  quantity: number;
  _id: string;
  book: ICartBook;
}

export interface ICartBook {
  _id: string;
  title: string;
  thumbnail: string;
  previewLink: string;
  price: number;
}

export interface ICartResponse extends IBase<ICartItem[]> {}
export interface ICreateOrderResponse extends IBase<null> {}
