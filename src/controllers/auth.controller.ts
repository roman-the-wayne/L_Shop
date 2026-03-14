import { Request, Response } from "express";
import { FileService } from "../services/file.service";
import { User } from "../types/index";
import { v4 as uuidv4 } from "uuid"; // Нужно установить: npm install uuid @types/uuid

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Простая валидация
    if (!email || !password) {
      return res.status(400).json({ message: "Заполни все поля" });
    }

    // 2. Читаем базу пользователей
    const users = await FileService.read<User>("users.json");

    // 3. Проверяем, нет ли уже такого
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "Такой юзер уже есть" });
    }

    // 4. Создаем нового юзера
    const newUser: User = {
      id: uuidv4(),
      email,
      password,
      basket: [],
    };

    // 5. Сохраняем
    users.push(newUser);
    await FileService.write("users.json", users);

    // 6. Выдаем куку на 10 минут (как в ТЗ)
    res.cookie("userId", newUser.id, {
      maxAge: 10 * 60 * 1000, // 10 минут
      httpOnly: true, // Невидима для JS на фронте
      sameSite: "lax",
    });

    res
      .status(201)
      .json({ message: "Регистрация успешна", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = await FileService.read<User>("users.json");

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Неверный логин или пароль" });
  }

  // Снова выдаем куку
  res.cookie("userId", user.id, {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });

  res.json({ message: "Вход выполнен", userId: user.id });
};
