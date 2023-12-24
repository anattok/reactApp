import { FC, useEffect, useState } from 'react';
import { Heading } from '../../components/Heading/Heading';
import { Search } from '../../components/Search/Search';
import s from './Menu.module.css';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductInterface as Product } from '../../interfaces/product.interface';
import axios from 'axios';
import { Loader } from '../../components/Loader/Loader';

export const Menu: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getMenu = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get<Product[]>(
        'http://localhost:3000/products',
      );
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <>
      <div className={s['header']}>
        <Heading>Меню</Heading>
        <Search placeholder={'Введите блюдо или состав'} />
      </div>
      <div className={s['products']}>
        {!isLoading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.description.join(', ')}
              rating={product.rating}
              price={product.price}
              img={product.img}
            />
          ))}
        {isLoading && <Loader />}
      </div>
    </>
  );
};
