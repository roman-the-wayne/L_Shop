import express, { type Request, type Response } from "express";

const app = express();
const PORT = 5000;

// Мидлвар для того, чтобы сервер понимал JSON в запросах
app.use(express.json());

// Твой первый роут (маршрут)
app.get("/", (req: Request, res: Response) => {
  res.send("Сервер L_Shop работает!");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на http://localhost:${PORT}`);
});
