"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Order.scss';

const Orders = () => {
    const [phone, setPhone] = useState('');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [searched, setSearched] = useState(false);

    // При монтировании — читаем телефон из localStorage
    useEffect(() => {
        const savedPhone = localStorage.getItem('ordersPhone');
        if (savedPhone) {
            setPhone(savedPhone);
            // Автоматически ищем заказы
            fetchOrders(savedPhone);
        }
    }, []);

    const fetchOrders = async (phoneValue) => {
        setError('');
        setIsLoading(true);
        setSearched(true);

        try {
            // Нормализация — та же логика
            let cleanPhone = phoneValue.replace(/[^\d]/g, '');
            if (cleanPhone.startsWith('8')) {
                cleanPhone = '7' + cleanPhone.slice(1);
            }
            if (cleanPhone && !cleanPhone.startsWith('7')) {
                cleanPhone = '7' + cleanPhone;
            }

            const res = await fetch(`/api/orders?phone=${cleanPhone}`);
            
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
            setOrders(data);
        } catch (err) {
            setError(err.message);
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        // Нормализация телефона: только цифры
        let cleanPhone = phone.replace(/[^\d]/g, '');

        // Если начинается с 8 — заменяем на 7
        if (cleanPhone.startsWith('8')) {
            cleanPhone = '7' + cleanPhone.slice(1);
        }

        // Если начинается не с 7 и не пусто — добавляем 7 в начало (на случай если ввели 900...)
        if (cleanPhone && !cleanPhone.startsWith('7')) {
            cleanPhone = '7' + cleanPhone;
        }

        // Сохраняем в localStorage нормализованный телефон
        localStorage.setItem('ordersPhone', cleanPhone);

        // Обновляем поле (показываем пользователю приведённый номер)
        setPhone(cleanPhone);

        await fetchOrders(cleanPhone);
    };

    const handleClearPhone = () => {
        localStorage.removeItem('ordersPhone');
        setPhone('');
        setOrders([]);
        setSearched(false);
        setError('');
    };

    return (
        <section className="orders container">
            <div className="orders__inner">
                <div className="orders__body">
                    <h1 className="orders__title">Мои заказы</h1>
                    {phone && (
                        <button
                            className="orders__clear-btn"
                            onClick={handleClearPhone}
                            type="button"
                        >
                            Сменить номер
                        </button>
                    )}
                </div>

                <p className="orders__subtitle">
                    Введите номер телефона, который указывали при оформлении
                </p>

                <form className="orders__form" onSubmit={handleSearch}>
                    <input
                        type="tel"
                        className="orders__input"
                        placeholder="+7 (999) 999-99-99"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        maxlength="11"
                    />
                    <button type="submit" className="orders__btn" disabled={isLoading}>
                        {isLoading ? 'Поиск...' : 'Найти'}
                    </button>
                </form>

                {error && <p className="orders__error">{error}</p>}

                {searched && !isLoading && orders.length === 0 && !error && (
                    <div className="orders__empty">
                        <p>Заказов с таким номером не найдено</p>
                        <Link href="/catalog/clothing" className="orders__empty-link">
                            Перейти в каталог
                        </Link>
                    </div>
                )}

                {orders.length > 0 && (
                    <div className="orders__list">
                        {orders.map((order) => (
                            <div key={order.id} className="orders__item">
                                <div className="orders__item-header">
                                    <span className="orders__item-number">Заказ №{order.id}</span>
                                    <span className="orders__item-date">
                                        {new Date(order.created_at).toLocaleDateString('ru-RU')}
                                    </span>
                                </div>

                                <div className="orders__item-status">
                                    Статус: <strong>{order.status}</strong>
                                </div>

                                <div className="orders__item-products">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="orders__item-product">
                                            <img src={item.imgSrc} alt={item.description} />
                                            <div className="orders__item-info">
                                                <p className="orders__item-brand">{item.brand}</p>
                                                <p className="orders__item-desc">{item.description}</p>
                                                <p className="orders__item-size">
                                                    Размер: {item.size} · {item.quantity} шт.
                                                </p>
                                            </div>
                                            <p className="orders__item-price">{item.price}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="orders__item-total">
                                    Итого: <strong>{order.total_price.toLocaleString('ru-RU')} ₽</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </section>
    );
};

export default Orders;