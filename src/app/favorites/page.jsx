"use client";
import Link from 'next/link';
import { useProducts } from '../hooks/useProducts';
import Card from '../../components/Card/Card';
import { useShop } from '../../context/ShopContext.jsx';
import PageLoader from '../../components/PageLoader/PageLoader.jsx';   
import './Favorites.scss';

const Favorites = () => {
  const { favorites, toggleFavorite } = useShop();
  const { products, isLoading, error } = useProducts();

  // Проверки на загрузку и ошибки — ПОСЛЕ хуков, ПЕРЕД фильтрацией
  if (isLoading) return <PageLoader />;

  if (error) {
    return <div className="container" style={{ padding: '60px 0' }}>Ошибка: {error}</div>;
  }

  const favoriteProducts = (products || []).filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <section className="favorites container">
      <h1 className="favorites__title">Избранное</h1>

      {favoriteProducts.length === 0 ? (
        <div className="favorites__empty">
          <p className="favorites__empty-text">
            В вашем списке избранного пока ничего нет
          </p>
          <Link href="/catalog/clothing" className="favorites__empty-link">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <ul className="favorites__list">
          {favoriteProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default Favorites;