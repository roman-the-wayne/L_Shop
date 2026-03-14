import fs from 'fs'
import path from 'path';
import express, {Request, Response} from 'express';
import {Product} from "./interfaces";
import {BasketItem} from "./interfaces";
import productsData from './data/products.json'

const app = express();
const PORT = 5000;

//Внешнее хранилище корзины в оперативной памяти
let basket: Product[] = [];
//Приводим данные к типу Product[]
const products: Product[] = productsData as Product[];

//Путь к файлу корзины пользователей
const BASKET_PATH = path.join(__dirname, 'data', 'userBaskets.json');
//Функция для сохранения данных козрин пользователей
const saveBasketsToFile = () => {
    try {
        fs.writeFileSync(BASKET_PATH, JSON.stringify(userBaskets, null, 2), 'utf-8');
    } catch (error) {
        console.error("Ошибка при сохранении корзины:", error);
    }
};

//Корзина как объект
let userBaskets: Record<string, BasketItem[]> = {};
if (fs.existsSync(BASKET_PATH)) {
    const fileData = fs.readFileSync(BASKET_PATH, 'utf-8');
    userBaskets = JSON.parse(fileData);
    console.log("Данные корзин успешно загружены из файла");
} else {
    console.log("Файл корзин не найден");
}

const checkAuth = (req: Request, res: Response, next: Function) => {
    const userId = req.headers['authorization']; // Ожидаем ID юзера в заголовках

    if (!userId) {
        return res.status(401).json({ message: "Вы не авторизованы" });
    }

    // Сохранение userId в объекте запроса, чтобы использовать его дальше
    (req as any).userId = userId;
    next();
};



app.use(express.json()); // Позволяет серверу понимать JSON в теле запроса

app.get('/products', checkAuth, (req: Request, res: Response) => {

  let result = [...products];

  const search = req.query.search?.toString().toLowerCase();
  const category = req.query.category?.toString();
  const sort = req.query.sort?.toString();
  const sizeParam = req.query.size ? parseInt(req.query.size.toString()) : NaN;

  // поиск по названию
  if(search){
    result = result.filter(p => p.title.toLowerCase().includes(search));
  }
  // фильтрация по размеру
  if (!isNaN(sizeParam)) {
        if (sizeParam >= 3 && sizeParam <= 7) {
            result = result.filter(p => p.size === sizeParam);
        } else {
            result = []; 
        }
    }
  // фильтрация по категории
  if(category){
    result = result.filter(p => p.category === category);
  }
  // сортировка по цене
  if(sort){
    if(sort === 'price_asc'){
      result.sort((a,b) => a.price - b.price);
    } else if (sort === 'price_desc'){
      result.sort((a,b) => b.price - a.price);
    }
  }
  //ответ
  res.json(result);
});

app.get('/basket', checkAuth, (req: Request, res: Response) => { 
    console.log("Запрос в корзину");
    const userId = (req as any).userId;
    const basket = userBaskets[userId] || [];
    res.json(basket);
});
app.post('/basket', checkAuth, (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { productId } = req.body; // Достаем ID из тела, которое "распознал" express.json()

    // Поиск товар в общем списке продуктов по ID
    const product = products.find(p => p.id === Number(productId));
    if (!product) { 
        // Если такого ID нет в базе — возвращается ошибку 404
        return res.status(404).json({ message: "Товар не найден" });
    }

    // Если у пользователя еще нет корзины, создаеться пустуя
    if (!userBaskets[userId]) {
        userBaskets[userId] = [];
    }
    const userBasket = userBaskets[userId];
    const existingItem = userBasket.find(item => item.id === product.id);

    if (existingItem) {
        //Если товар уже есть, увеличивается количество
        existingItem.count += 1;
    } else {
        // Если товара нет, добавляется, с count = 1
        userBasket.push({ ...product, count: 1 });
    }

    saveBasketsToFile();

    res.status(201).json({ message: "Добавлено", userBasket });
});

app.delete('/basket/:id', checkAuth, (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const productId = Number(req.params.id);
    const userBasket = userBaskets[userId] || [];
    
    const itemIndex = userBasket.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        if (userBasket[itemIndex].count > 1) {
            userBasket[itemIndex].count -= 1; // Уменьшается счетчик
        } else {
            userBasket.splice(itemIndex, 1); // Удаляется совсем, если был 1
        }
    }

    saveBasketsToFile();

    res.json({ message: "Удалено", userBasket });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
})