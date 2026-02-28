export interface User {
  id: string;
  email: string;
  password: string; // В идеале тут должен быть хеш, но для лабы сойдет и так
  basket: string[]; // Массив ID товаров
}
