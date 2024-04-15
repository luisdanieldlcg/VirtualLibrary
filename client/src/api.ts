import axios from "axios";

export const CYBERBOOK_SERVER_BASE_URL = "http://localhost:5251";
export const CYBERBOOK_API_URL = CYBERBOOK_SERVER_BASE_URL + "/api";

const api = axios.create({
  baseURL: CYBERBOOK_API_URL,
  validateStatus: () => true,
});

interface SignupDTO {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarImage: File | undefined;
}

export interface User {
  idUser: string;
  fullName: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface Book {
  idBook: string;
  title: string;
  synopsis: string;
  authorName: string;
  publicationYear: Date;
  linkPDF: string;
  categoryName: string;
  genres: string[];
  coverUrl: string;
}

export const signup = async (
  dto: SignupDTO,
  onSuccess: (user: User) => void,
  onFail: (error: string) => void
) => {
  var form = new FormData();
  form.append("fullName", dto.fullName);
  form.append("username", dto.username);
  form.append("email", dto.email);
  form.append("password", dto.password);
  form.append("confirmPassword", dto.confirmPassword);
  if (dto.avatarImage) {
    form.append("avatarImage", dto.avatarImage);
  }
  try {
    let response = await api.post("/auth/signup", form);
    if (response.data.status === "success") {
      let user: User = response.data.data;
      onSuccess(user);
    } else {
      let errors = response.data.errors;
      onFail(errors[Object.keys(errors)[0]][0]);
    }
  } catch (error) {
    onFail("Error de conexión, inténtelo de nuevo o contacte al soporte");
  }
};

export const getAllBooks = async () => {
  try {
    let response = await api.get("/books");
    if (response.data.status === "success") {
      let books: Book[] = response.data.data;
      return books;
    }
  } catch (error) {
    console.error("Error fetching books", error);
  }
  return [];
};
