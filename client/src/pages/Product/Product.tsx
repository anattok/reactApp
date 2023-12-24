import { FC, Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import { ProductInterface } from '../../interfaces/product.interface';

export const Product: FC = () => {
  const data = useLoaderData() as { data: ProductInterface };

  return (
    <>
      <Suspense fallback={'Загружаю...'}>
        <Await resolve={data.data}>
          {({ data }) => <>Product - {data.name}</>}
        </Await>
      </Suspense>
    </>
  );
};
