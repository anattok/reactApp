import { Link } from 'react-router-dom';
import s from './ProductCard.module.css';
import { ProductCardProps } from './ProductCard.props';
import { FC } from 'react';

export const ProductCard: FC<ProductCardProps> = ({
  price,
  rating,
  description,
  title,
  img,
  id,
}) => {
  return (
    <Link to={`/product/${id}`} className={s['link']}>
      <div className={s['card']}>
        <div className={s['head']} style={{ backgroundImage: `url('${img}')` }}>
          <div className={s['price']}>
            {price}&nbsp;
            <span className={s['price-currency']}>₽</span>
          </div>
          <button className={s['add']}>
            <img src="/shopping-cart-white.svg" alt="cart" />
          </button>
          <div className={s['rating']}>
            {rating}&nbsp;
            <img src="/star.svg" alt="" />
          </div>
        </div>
        <div className={s['footer']}>
          <div className={s['title']}>{title}</div>
          <div className={s['description']}>{description}</div>
        </div>
      </div>
    </Link>
  );
};
