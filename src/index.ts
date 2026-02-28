import express, {Request, Response} from 'express';
import {Product} from "./interfaces";
import productsData from './data/products.json'

const app = express();
const PORT = 5000;

//Внешнее хранилище корзины в оперативной памяти
let basket: Product[] = [];
// Приводим данные к типу Product[]
const products: Product[] = productsData as Product[];

app.use(express.json()); // Позволяет серверу понимать JSON в теле запроса

app.get('/products', (req: Request, res: Response) => {

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

app.get('/basket', (req: Request, res: Response) => {
    console.log("Запрос в корзину");
    res.json(basket);
});
app.post('/basket', (req: Request, res: Response) => {
    const { productId } = req.body; // Достаем ID из тела, которое "распознал" express.json()

    // Поиск товар в общем списке продуктов по ID
    const product = products.find(p => p.id === Number(productId));

    if (!product) {
        // Если такого ID нет в базе — возвращается ошибку 404
        return res.status(404).json({ message: "Товар не найден" });
    }

    basket.push(product); // Добавляем найденный объект товара в массив корзины
    res.status(201).json({ message: "Добавлено", basket });
});

app.delete('/basket/:id', (req: Request, res: Response) => {
    const idToDelete = Number(req.params.id); // Берем ID из самой ссылки (параметр пути)
    
    basket = basket.filter(p => p.id !== idToDelete);

    res.json({ message: "Удалено", basket });
});

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
})