import express, {Request, Response} from 'express';
import {Product} from "./interfaces";
import productsData from './data/products.json'

const app = express();
const PORT = 5000;

// Приводим данные к типу Product[]
const products: Product[] = productsData as Product[];

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

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
})