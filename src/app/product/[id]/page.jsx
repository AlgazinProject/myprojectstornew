"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProducts } from '../../hooks/useProducts';
import Toast from '../../../components/Toast/Toast';
import { useShop } from '../../../context/ShopContext.jsx';
import './ProductPage.scss';
import PageLoader from '@/components/PageLoader/PageLoader';

const Product = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const { products, isLoading, error } = useProducts();  // ← ДОБАВИЛИ useProducts

  const [selectedSize, setSelectedSize] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);

  const { addToCart } = useShop();

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000);
  };

  // Проверки на загрузку и ошибки
  if (isLoading) return <PageLoader />;

  if (error) {
    return <div className="container" style={{ padding: '60px 0' }}>Ошибка: {error}</div>;
  }

  const currentProduct = products.find(item => item.id === Number(id));

  if (!currentProduct) {
    return (
      <div className="container product-page-error">
        <h2>Товар не найден</h2>
        <Link href="/" className="product-page-error__link">Вернуться на главную</Link>
      </div>
    );
  }

  const handleAddToCartClick = () => {
    if (!selectedSize) {
      showToast('Пожалуйста, выберите размер перед добавлением в корзину!', 'error');
      return;
    }

    addToCart(currentProduct, selectedSize);
    showToast('Товар успешно добавлен в корзину!', 'success');
    setSelectedSize('');
  };

  return (
    <section className="product-page container">
      <button onClick={() => router.back()} className="product-page__back-link">
        ← Назад
      </button>

      <div className="product-detail">
        <div className="product-detail__image-box">
          <img
            src={currentProduct.imgSrc}
            alt={currentProduct.brand}
            className="product-detail__img"
          />
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__title">{currentProduct.description}</h1>
          <span className="product-detail__brand">{currentProduct.brand}</span>
          <div className="product-detail__description">
            <h3 className="product-detail__subtitle">Описание товара:</h3>
            <p className="product-detail__text">
              {currentProduct.fullDescription || currentProduct.description}
            </p>
            {currentProduct.features && currentProduct.features.length > 0 && (
              <>
                <ul className={`product-detail__features ${isFeaturesOpen ? 'product-detail__features--open' : ''}`}>
                  {currentProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                {currentProduct.features.length > 4 && (
                  <button
                    className="product-detail__features-toggle"
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  >
                    {isFeaturesOpen ? 'Свернуть' : 'Показать все характеристики'}
                  </button>
                )}
              </>
            )}
          </div>

          <p className="product-detail__price">{currentProduct.price}</p>

          <div className="product-detail__size">
            <p className="product-detail__size-title">Доступные размеры:</p>
            <div className="product-detail__size-list">
              {currentProduct.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`product-detail__size-btn ${selectedSize === size ? 'product-detail__size-btn--active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="product-detail__btn" onClick={handleAddToCartClick}>
            Добавить в корзину
          </button>
        </div>
      </div>

      <Toast message={toastMessage} type={toastType} />
    </section>
  );
};

export default Product;