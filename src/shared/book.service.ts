import axios from "axios";
import environment from "../environments/environment";
import {
  IAddToCartResponse,
  IBookResponse,
  ICartResponse,
  ICreateOrderResponse,
} from "./book.model";

const { baseUrl } = environment;

const getAllBooks = (): Promise<IBookResponse> => {
  return axios.get(`${baseUrl}/api/v1/books`);
};
const addToCart = (value: { bookId: string }): Promise<IAddToCartResponse> => {
  return axios.post(`${baseUrl}/api/v1/cart/add`, value);
};
const getCartDetailByUser = (): Promise<ICartResponse> => {
  return axios.get(`${baseUrl}/api/v1/cart`);
};
const placeOrder = (): Promise<ICreateOrderResponse> => {
  return axios.post(`${baseUrl}/api/v1/order/create`);
};
const deleteCartItem = (itemId: string): Promise<ICartResponse> => {
  return axios.delete(`${baseUrl}/api/v1/cart/${itemId}`);
};

const BookService = {
  getAllBooks,
  addToCart,
  getCartDetailByUser,
  placeOrder,
  deleteCartItem,
};

export default BookService;
