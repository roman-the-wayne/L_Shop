import fs from "fs/promises";
import path from "path";

const DATA_PATH = path.resolve("src/data");

export class FileService {
  // Читаем любой JSON файл
  static async read<T>(fileName: string): Promise<T[]> {
    try {
      const filePath = path.join(DATA_PATH, fileName);
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  // Записываем данные в JSON файл
  static async write<T>(fileName: string, data: T[]): Promise<void> {
    const filePath = path.join(DATA_PATH, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }
}
