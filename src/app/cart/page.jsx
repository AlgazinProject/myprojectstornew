"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useShop } from '../../context/ShopContext.jsx';
import Toast from '../../components/Toast/Toast';
import OrderModal from '../../components/OrderModal/OrderModal.jsx';
import PageLoader from '../../components/PageLoader/PageLoader.jsx';
import './Cart.scss';

const Cart = () => {
  const { cart, changeQuantity, removeFromCart, clearCart } = useShop();

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 3000);
  };

  const getCleanPrice = (priceValue) => {
    if (typeof priceValue === 'number') return priceValue;
    if (!priceValue) return 0;
    const cleanStr = String(priceValue).replace(/[^\d]/g, '');
    return Number(cleanStr) || 0;
  };

  const totalPrice = cart.reduce((total, item) => {
    const price = getCleanPrice(item.price);
    return total + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const handleOrderSuccess = (customerName, orderNumber) => {
    showToast(
      `${customerName}, заказ №${orderNumber} успешно оформлен! Спасибо за покупку.`,
      'success'
    );
    setTimeout(() => {
      clearCart();
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <>
        <div className="container cart__page-empty">
          <h1 className="cart__page-title">Корзина покупок</h1>
          <p className="cart__page-empty-text">Ваша корзина пока пуста</p>
          <Link href="/catalog/clothing" className="cart__page-empty-btn">
            Перейти к покупкам
          </Link>
        </div>
        <Toast message={toastMessage} type={toastType} />
      </>
    );
  }

  return (
    <section className="cart__page container">
      <h1 className="cart__page-title">Корзина покупок</h1>

      <div className="cart__body">
        <div className="cart__list">
          {cart.map((item) => {
            const numericPrice = getCleanPrice(item.price);

            return (
              <div key={`${item.id}-${item.size}`} className="cart__item">
                <button
                  className="cart__item-remove-btn"
                  onClick={() => removeFromCart(item.id, item.size)}
                >
                  &times;
                </button>

                <img
                  src={item.imgSrc}
                  alt={item.brand}
                  className="cart__item-img"
                />

                <div className="cart__item-info">
                  <span className="cart__item-brand">{item.brand}</span>
                  <h3 className="cart__item-desc">{item.description}</h3>
                  <p className="cart__item-size">
                    Размер: <span>{item.size}</span>
                  </p>
                </div>

                <div className="cart__item-quantity">
                  <button
                    className="cart__item-qty-btn"
                    onClick={() => changeQuantity(item.id, item.size, 'minus')}
                  >
                    -
                  </button>
                  <span className="cart__item-qty-num">{item.quantity}</span>
                  <button
                    className="cart__item-qty-btn"
                    onClick={() => changeQuantity(item.id, item.size, 'plus')}
                  >
                    +
                  </button>
                </div>

                <p className="cart__item-price">
                  {(numericPrice * item.quantity).toLocaleString('ru-RU')} ₽
                </p>
              </div>
            );
          })}
        </div>

        <div className="cart__total">
          <h2 className="cart__total-title">Итого</h2>

          <div className="cart__total-item">
            <span>Всего товаров:</span>
            <span>
              {cart.reduce((total, item) => total + item.quantity, 0)} шт.
            </span>
          </div>

          <div className="cart__total-final-price">
            <span>Сумма к оплате:</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>

          <button className="cart__total-btn" onClick={handleCheckoutClick}>
            Оформить заказ
          </button>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      <Toast message={toastMessage} type={toastType} />
    </section>
  );
};

export default Cart;