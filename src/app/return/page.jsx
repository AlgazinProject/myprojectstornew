import React from 'react';
import './Return.scss';

const Return = () => {
  return (
    <section className="return container">
      <div className="return__inner">
      <h1 className="return__title">Возврат товара</h1>

      <div className="return__body">
        <h2 className="return__subtitle">Условия возврата</h2>
        <p className="return__text">
          Вы можете вернуть товар в течение 14 дней с момента получения, если он
          не был в употреблении, сохранены его фабричные ярлыки, бирки и упаковка.
        </p>

        <h2 className="return__subtitle">Как оформить возврат</h2>
        <p className="return__text">
          Напишите на support@stone-store.ru, указав номер заказа и причину возврата.
          Мы вышлем форму возврата и адрес склада. Стоимость обратной доставки
          оплачивает покупатель, если товар не бракованный.
        </p>

        <h2 className="return__subtitle">Возврат денег</h2>
        <p className="return__text">
          Деньги возвращаются на ту же карту, с которой была произведена оплата,
          в течение 5–10 рабочих дней после получения товара нашим складом.
        </p>
      </div>
      </div>
    </section>
  );
};

export default Return;